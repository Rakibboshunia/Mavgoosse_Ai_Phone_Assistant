import React from 'react';
import { Icon } from '@iconify/react';

export default function TechnicianCard({ priority, name, phoneNumber, available }) {
    return (
        <div className="flex items-center justify-between p-6 bg-[#1D293D80] hover:bg-[#FFFFFF05] rounded-xl border border-[#2B7FFF10] transition-colors mb-4 last:mb-0">
            <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                    <Icon icon="mdi:chevron-up" className="text-[#90A1B9] cursor-pointer hover:text-white" width={16} />
                    <Icon icon="mdi:chevron-down" className="text-[#90A1B9] cursor-pointer hover:text-white" width={16} />
                </div>

                <div className="size-10 bg-[#00D1FF] rounded-lg flex items-center justify-center text-white font-bold">
                    {priority}
                </div>

                <div>
                    <h3 className="text-white font-medium">{name}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#90A1B9]">
                        <Icon icon="mdi:phone-outline" width={14} />
                        <span>{phoneNumber}</span>
                    </div>
                </div>
            </div>

            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${available
                    ? 'text-[#05DF72] bg-[#05DF7210] border-[#05DF7233]'
                    : 'text-[#FF2056] bg-[#FF205610] border-[#FF205633]'
                }`}>
                <Icon icon={available ? "mdi:check-circle" : "mdi:close-circle"} width={16} />
                <span className="text-xs font-medium uppercase tracking-wider">{available ? 'Available' : 'Unavailable'}</span>
            </div>
        </div>
    );
}
