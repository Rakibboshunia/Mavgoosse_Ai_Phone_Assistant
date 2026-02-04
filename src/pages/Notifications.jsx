import React, { useEffect, useState, useContext } from "react";
import NotificationFilters from "../components/NotificationFilters";
import DetailedNotificationCard from "../components/DetailedNotificationCard";
import {
  getNotificationsApi,
  markNotificationReadApi,
} from "../libs/notifications.api";
import { mapNotification } from "../utils/notificationMapper";
import { AuthContext } from "../provider/AuthContext";

export default function Notifications() {
  /* ================= STORE ================= */
  const { getActiveStoreId, role } = useContext(AuthContext);
  const storeId = getActiveStoreId(); // 🔥 GLOBAL STORE ID

  /* ================= STATE ================= */
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    if (!storeId) return;
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, storeId]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const params = {
        store: storeId, // 🔥 STORE SCOPED
      };

      if (activeFilter === "unread") {
        params.status = "unread";
      } else if (activeFilter !== "all") {
        params.category = activeFilter.toUpperCase(); // calls → CALLS
      }

      const { data } = await getNotificationsApi(params);

      setNotifications(
        Array.isArray(data) ? data.map(mapNotification) : []
      );
    } catch (error) {
      console.error("Notification fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */

  const handleMarkRead = async (id) => {
    try {
      await markNotificationReadApi(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, unread: false } : n
        )
      );
    } catch (error) {
      console.error("Mark read failed", error);
    }
  };

  const handleDismiss = (id) => {
    // ❌ backend delete নাই → UI only
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  /* ================= GUARD ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="p-10 text-center text-[#90A1B9]">
        <h2 className="text-xl font-bold mb-2">
          No store selected
        </h2>
        <p>Please select a store to view notifications.</p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div>
      <NotificationFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        notifications={notifications}
      />

      <div className="mt-8 space-y-1">
        {loading ? (
          <div className="text-center text-[#90A1B9] py-10">
            Loading notifications...
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <DetailedNotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
              onDismiss={handleDismiss}
            />
          ))
        ) : (
          <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-12 text-center text-[#90A1B9]">
            No notifications found.
          </div>
        )}
      </div>
    </div>
  );
}
