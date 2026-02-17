import React from "react";

export default function NotificationFilters({
  activeFilter,
  onFilterChange,
  notifications,
}) {
  const filters = [
    { id: "all", label: "All" },
    { id: "read", label: "Read" },
    { id: "unread", label: "Unread" },
  ];

  const getCount = (id) => {
    if (id === "all") {
      return notifications.length;
    }

    if (id === "unread") {
      return notifications.filter((n) => n.unread).length;
    }

    if (id === "read") {
      return notifications.filter((n) => !n.unread).length;
    }

    return 0;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 cursor-pointer ${
            activeFilter === filter.id
              ? "bg-[#2B7FFF10] border-[#2B7FFF] text-white"
              : "bg-[#1D293D80] border-[#2B7FFF33] text-[#90A1B9]"
          }`}
        >
          <span className="text-sm">{filter.label}</span>
          <span className="text-xs opacity-70">
            {getCount(filter.id)}
          </span>
        </button>
      ))}
    </div>
  );
}
