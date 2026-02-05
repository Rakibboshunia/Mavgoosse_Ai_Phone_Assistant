import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import toast from "react-hot-toast";

import AppointmentStatsCard from "../components/AppointmentStatsCard";
import BookingLink from "../components/BookingLink";
import AppointmentCard from "../components/AppointmentCard";

import { getAppointmentsApi } from "../libs/appointments.api";
import { adaptAppointment } from "../utils/appointmentsAdapter";
import { AuthContext } from "../provider/AuthContext";

export default function Appointment() {
  const { selectedStore, role } = useContext(AuthContext);
  const storeId = selectedStore?.id;

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const prevStoreRef = useRef(null);

  /* ================= STORE CHANGE DETECT ================= */
  useEffect(() => {
    if (!storeId) return;

    if (
      prevStoreRef.current &&
      prevStoreRef.current !== storeId
    ) {
      toast.loading("Loading appointments for new store...", {
        id: "appointments-store",
      });
    }

    prevStoreRef.current = storeId;
  }, [storeId]);

  /* ================= FETCH APPOINTMENTS ================= */
  const fetchAppointments = async () => {
    if (!storeId) return;

    try {
      setLoading(true);

      const res = await getAppointmentsApi({
        store: storeId, // 🔥 STORE SCOPED
      });

      const adapted = Array.isArray(res.data)
        ? res.data.map(adaptAppointment)
        : [];

      setAppointments(adapted);

      toast.success(
        `Appointments loaded for ${
          selectedStore?.name || "store"
        }`,
        { id: "appointments-store" }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load appointments", {
        id: "appointments-store",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL + STORE CHANGE ================= */
  useEffect(() => {
    if (!storeId) return;

    // reset on store change
    setAppointments([]);
    setFilter("all");

    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  /* ================= FILTER ================= */
  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  /* ================= GUARD ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="p-10 text-center text-[#90A1B9]">
        <h2 className="text-xl font-bold mb-2">
          No store selected
        </h2>
        <p>Please select a store to view appointments.</p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-8 pb-12">
      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AppointmentStatsCard
          title="Total Booked"
          value={appointments.length}
          subtext="All time"
          icon="mdi:calendar-multiselect"
          color="text-[#2B7FFF]"
        />

        <AppointmentStatsCard
          title="Pending"
          value={
            appointments.filter((a) => a.status === "pending")
              .length
          }
          subtext="Awaiting action"
          icon="mdi:alert-circle-outline"
          color="text-[#FF8904]"
        />

        <AppointmentStatsCard
          title="Completed"
          value={
            appointments.filter(
              (a) => a.status === "confirmed"
            ).length
          }
          subtext="Confirmed"
          icon="mdi:check-decagram-outline"
          color="text-[#05DF72]"
        />
      </div>

      {/* ================= BOOKING LINK ================= */}
      <BookingLink
        url={`https://techstore.com/book?store=${storeId}`}
      />

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-center text-[#90A1B9]">
          Loading appointments...
        </p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredAppointments.length ? (
            filteredAppointments.map((app) => (
              <AppointmentCard
                key={app.id}
                appointment={app}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-[#90A1B9]">
              No appointments found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
