import React from "react";
import cn from "../libs/cn";

export default function NotificationCard({
  title,
  message,
  time,
  unread,
  onMarkRead,
  onDismiss,
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl p-4 flex gap-4 transition-all duration-200 group border border-[#2B7FFF55] cursor-pointer",
        unread ? "bg-[#1D293D80] border border-[#2B7FFF55]" : "bg-[#1D293D80]",
      )}
    >
      {/* Unread Dot */}
      {unread && <div className="w-3 h-3 bg-amber-400 rounded-full mt-2 "></div>}

      <div className="flex-1 ">
        {/* Title */}
        <h3
          className={cn(
            "text-sm",
            unread ? "text-white font-semibold" : "text-gray-300",
          )}
        >
          {title}
        </h3>

        {/* Message */}
        {message && (
          <p className="text-xs text-[#9FB2D4] mt-1 leading-relaxed">
            {message}
          </p>
        )}

        {/* Time */}
        <p className="text-[11px] text-[#7A8BA4] mt-2">{time}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {unread && (
          <button
            onClick={onMarkRead}
            className="text-xs text-[#2B7FFF] hover:text-green-600 cursor-pointer"
          >
            Mark read
          </button>
        )}

        <button
          onClick={onDismiss}
          className="text-xs text-red-400 hover:text-red-700 transition cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
