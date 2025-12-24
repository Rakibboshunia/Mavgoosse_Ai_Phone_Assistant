import React from 'react';

const filters = [
    { id: 'all', label: 'All', count: 10 },
    { id: 'unread', label: 'Unread', count: 4 },
    { id: 'calls', label: 'Calls', count: 2 },
    { id: 'appointments', label: 'Appointments', count: 2 },
    { id: 'system', label: 'System', count: 2 },
    { id: 'alerts', label: 'Alerts', count: 1 }
];

export default function NotificationFilters({ activeFilter, onFilterChange }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`px-6 py-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${activeFilter === filter.id
                            ? 'bg-[#2B7FFF10] border-[#2B7FFF] text-white shadow-[0_0_15px_#2B7FFF20]'
                            : 'bg-[#1D293D80] border-[#2B7FFF33] text-[#90A1B9] hover:border-[#2B7FFF66]'
                        }`}
                >
                    <span className="text-sm font-medium">{filter.label}</span>
                    <span className="text-xs opacity-70">{filter.count}</span>
                </button>
            ))}
        </div>
    );
}
