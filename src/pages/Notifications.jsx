import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import NotificationFilters from "../components/NotificationFilters";
import NotificationCard from "../components/NotificatonCard";
import {
  deleteNotificationApi,
  getNotificationsApi,
  markNotificationReadApi,
} from "../libs/notifications.api";
import { AuthContext } from "../provider/AuthContext";
import toast from "react-hot-toast";

export default function Notifications() {
  /* ================= CONTEXT ================= */
  const { getActiveStoreId } = useContext(AuthContext);

  // Default store fallback
  const storeId = getActiveStoreId() || 1;

  /* ================= STATE ================= */
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const firstLoadRef = useRef(true);

  /* ================= FETCH ================= */
  const fetchNotifications = async (showToast = false) => {
    try {
      setLoading(true);

      const params = {
        store: storeId,
        status: "all",
      };

      // 🔹 Status filter
      if (activeFilter === "read" || activeFilter === "unread") {
        params.status = activeFilter;
      }

      // 🔹 Category filter
      if (
        activeFilter !== "all" &&
        activeFilter !== "read" &&
        activeFilter !== "unread"
      ) {
        params.category = activeFilter.toUpperCase();
        params.status = "all";
      }

      const { data } = await getNotificationsApi(params);

      const formatted = Array.isArray(data)
        ? data.map((n) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            category: n.category,
            unread: !n.is_read,
            time: n.created_at
              ? new Date(n.created_at).toLocaleString()
              : "",
          }))
        : [];

      setNotifications(formatted);

      if (showToast) {
        toast.success("Notifications updated", {
          id: "notifications-refetch",
        });
      }
    } catch (error) {
      console.error(
        "Notification fetch failed",
        error?.response?.data || error
      );
      toast.error("Failed to load notifications", {
        id: "notifications-error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER CHANGE ================= */
  useEffect(() => {
    fetchNotifications(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  /* ================= STORE CHANGE ================= */
  useEffect(() => {
    setNotifications([]);
    fetchNotifications(!firstLoadRef.current);
    firstLoadRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

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
      toast.error("Failed to mark as read");
    }
  };

  const handleDismiss = async (id) => {
  try {
    await deleteNotificationApi(id);

    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  } catch (err) {
    toast.error("Delete failed");
  }
};


  /* ================= UI ================= */
  return (
    <div>
      <NotificationFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        notifications={notifications}
      />

      <div className="mt-8 space-y-3">
        {loading ? (
          <div className="text-center text-[#90A1B9] py-10">
            Loading notifications...
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              title={notification.title}
              message={notification.message}
              time={notification.time}
              unread={notification.unread}
              onMarkRead={() =>
                handleMarkRead(notification.id)
              }
              onDismiss={() =>
                handleDismiss(notification.id)
              }
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
