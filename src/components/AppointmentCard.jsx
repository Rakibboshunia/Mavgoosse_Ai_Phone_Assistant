import React from 'react';
import { Icon } from '@iconify/react';

export default function AppointmentCard({ appointment, onConfirm, onCancel }) {
    const getStatusStyles = (status) => {
        switch (status) {
            case 'confirmed': return 'text-[#05DF72] bg-[#05DF7210] border-[#05DF7233]';
            case 'pending': return 'text-[#FF8904] bg-[#FF890410] border-[#FF890433]';
            case 'canceled': return 'text-[#FF2056] bg-[#FF205610] border-[#FF205633]';
            default: return 'text-[#90A1B9] bg-[#90A1B910] border-[#90A1B933]';
        }
    };

    return (
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6 group">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="size-12 bg-[#2B7FFF15] border border-[#2B7FFF33] rounded-xl flex items-center justify-center">
                        <Icon icon="mdi:account" className="text-[#2B7FFF]" width={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg">{appointment.phone}</h3>
                        <p className="text-[#90A1B9] text-sm">{appointment.service}</p>
                    </div>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md border ${getStatusStyles(appointment.status)}`}>
                    {appointment.status}
                </span>
            </div>

            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-[#90A1B9] text-sm font-medium">
                    <Icon icon="mdi:calendar-blank" width={18} />
                    <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-3 text-[#90A1B9] text-sm font-medium">
                    <Icon icon="mdi:clock-outline" width={18} />
                    <span>{appointment.time}</span>
                </div>
            </div>

            {appointment.status === 'pending' && (
                <div className="flex gap-4">
                    <button
                        onClick={() => onConfirm(appointment.id)}
                        className="flex-1 bg-[#05DF7220] hover:bg-[#05DF7230] text-[#05DF72] border border-[#05DF7233] py-3 rounded-xl font-medium transition-colors"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => onCancel(appointment.id)}
                        className="flex-1 bg-[#FF205620] hover:bg-[#FF205630] text-[#FF2056] border border-[#FF205633] py-3 rounded-xl font-medium transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
