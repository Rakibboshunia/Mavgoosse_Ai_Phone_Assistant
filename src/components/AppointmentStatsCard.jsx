import React from 'react';
import { Icon } from '@iconify/react';

export default function AppointmentStatsCard({ title, value, subtext, icon, color }) {
    return (
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-opacity-10`}>
                    <Icon icon={icon} className={color} width={24} />
                </div>
                <p className="text-[#90A1B9] text-sm font-medium">{title}</p>
            </div>
            <div>
                <h2 className="text-4xl text-white font-bold mb-1">{value}</h2>
                <p className={`text-[12px] font-medium ${subtext.includes('+') ? 'text-[#05DF72]' : 'text-[#90A1B9]'}`}>
                    {subtext}
                </p>
            </div>
        </div>
    );
}
