import React from 'react';
import { Icon } from '@iconify/react';

export default function CallList({ calls, selectedId, onSelect }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'AI Resolved': return 'text-[#00D1FF] bg-[#00D1FF10] border-[#00D1FF33]';
            case 'Warm Transfer': return 'text-[#FF8904] bg-[#FF890410] border-[#FF890433]';
            case 'Appointment': return 'text-[#2B7FFF] bg-[#2B7FFF10] border-[#2B7FFF33]';
            case 'Dropped': return 'text-[#FF2056] bg-[#FF205610] border-[#FF205633]';
            default: return 'text-[#90A1B9] bg-[#90A1B910] border-[#90A1B933]';
        }
    };

    return (
        <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#2B7FFF33]">
                <h2 className="text-xl font-medium text-white">Call List</h2>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                {calls.map((call) => (
                    <div
                        key={call.id}
                        onClick={() => onSelect(call)}
                        className={`p-6 border-b border-[#2B7FFF33] cursor-pointer transition-colors ${selectedId === call.id ? 'bg-[#2B7FFF10] border-l-4 border-l-[#2B7FFF]' : 'hover:bg-[#FFFFFF05]'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#2B7FFF20] rounded-lg">
                                    <Icon icon="mdi:phone" className="text-[#2B7FFF]" width={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">{call.phoneNumber}</h3>
                                    <p className="text-xs text-[#90A1B9]">{call.date} • {call.time}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] px-2 py-1 rounded-md border ${getStatusStyle(call.status)}`}>
                                {call.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1 text-xs text-[#90A1B9]">
                                <Icon icon="mdi:clock-outline" width={14} />
                                <span>{call.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-[#90A1B9]">
                                <Icon icon="mdi:check-circle-outline" width={14} />
                                <span>{call.outcome}</span>
                            </div>
                            <span className="text-[10px] bg-[#2B7FFF20] text-[#2B7FFF] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                                {call.issueType}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
