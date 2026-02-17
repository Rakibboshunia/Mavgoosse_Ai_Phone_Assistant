import React from "react";
import { Icon } from "@iconify/react";

export default function AppointmentCard({ appointment, onCancel }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed":
        return "text-[#05DF72] bg-[#05DF7210] border-[#05DF7233]";
      case "pending":
        return "text-[#FF8904] bg-[#FF890410] border-[#FF890433]";
      case "canceled":
        return "text-[#FF2056] bg-[#FF205610] border-[#FF205633]";
      default:
        return "text-[#90A1B9] bg-[#90A1B910] border-[#90A1B933]";
    }
  };

  return (
    <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-[#2B7FFF15] border border-[#2B7FFF33] rounded-xl flex items-center justify-center">
            <Icon icon="mdi:account" className="text-[#2B7FFF]" width={24} />
          </div>

          <div>
            <h3 className="text-white font-medium text-lg">
              {appointment.clientName || appointment.phone}
            </h3>

            {/* Optional store name */}
            {appointment.storeName && (
              <p className="text-[#90A1B9] text-sm">
                {appointment.storeName}
              </p>
            )}
          </div>
        </div>

        <span
          className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md border ${getStatusStyles(
            appointment.status
          )}`}
        >
          {appointment.status}
        </span>
      </div>

      {/* DATE & TIME */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-[#90A1B9] text-sm font-medium">
          <Icon icon="mdi:calendar-blank" width={18} />
          <span>{appointment.date}</span>
        </div>

        <div className="flex items-center gap-3 text-[#90A1B9] text-sm font-medium">
          <Icon icon="mdi:clock-outline" width={18} />
          <span>
            {appointment.startTime} – {appointment.endTime}
          </span>
        </div>
      </div>

      {/* ACTION */}
      {appointment.status === "pending" && (
        <button
          onClick={() => onCancel(appointment.id)}
          className="w-full bg-[#FF205620] hover:bg-[#FF205630] text-[#FF2056] border border-[#FF205633] py-3 rounded-xl font-medium transition-colors cursor-pointer"
        >
          Cancel Appointment
        </button>
      )}
    </div>
  );
}
