import React from 'react';
import { Icon } from '@iconify/react';

export default function DetailedNotificationCard({ notification, onMarkRead, onDismiss }) {
    const getIcon = (type) => {
        switch (type) {
            case 'appointment': return { icon: 'mdi:calendar-check', color: 'text-[#05DF72]', bg: 'bg-[#05DF7215]' };
            case 'transfer': return { icon: 'mdi:phone-forward', color: 'text-[#FF8904]', bg: 'bg-[#FF890415]' };
            case 'latency': return { icon: 'mdi:alert-circle', color: 'text-[#FF2056]', bg: 'bg-[#FF205615]' };
            case 'user': return { icon: 'mdi:account-plus', color: 'text-[#AD46FF]', bg: 'bg-[#AD46FF15]' };
            case 'call': return { icon: 'mdi:phone-check', color: 'text-[#2B7FFF]', bg: 'bg-[#2B7FFF15]' };
            case 'system': return { icon: 'mdi:cog', color: 'text-[#90A1B9]', bg: 'bg-[#90A1B915]' };
            default: return { icon: 'mdi:bell', color: 'text-[#2B7FFF]', bg: 'bg-[#2B7FFF15]' };
        }
    };

    const { icon, color, bg } = getIcon(notification.type);

    return (
        <div className={`relative bg-[#1D293D80] border border-[#2B7FFF33] rounded-2xl p-6 mb-4 group transition-all hover:border-[#2B7FFF50] ${notification.unread ? 'border-l-4 border-l-[#2B7FFF]' : ''
            }`}>
            <div className="flex items-start gap-5">
                <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon icon={icon} className={color} width={24} />
                </div>

                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                        <h3 className="text-white font-medium text-lg leading-tight">
                            {notification.title}
                        </h3>
                        {notification.unread && (
                            <div className="size-2 bg-[#2B7FFF] rounded-full shadow-[0_0_8px_#2B7FFF]" />
                        )}
                        {notification.highPriority && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FF205620] text-[#FF2056] border border-[#FF205633]">
                                High Priority
                            </span>
                        )}
                    </div>

                    <p className="text-[#90A1B9] text-sm leading-relaxed max-w-3xl">
                        {notification.description}
                    </p>

                    <p className="text-[#7A8BA4] text-[12px] pt-1 uppercase">
                        {notification.time}
                    </p>

                    {notification.unread && (
                        <button
                            onClick={() => onMarkRead(notification.id)}
                            className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#2B7FFF20] text-[#2B7FFF] border border-[#2B7FFF33] text-xs font-medium hover:bg-[#2B7FFF30] transition-colors"
                        >
                            <Icon icon="mdi:check" />
                            Mark Read
                        </button>
                    )}
                </div>
            </div>

            <button
                onClick={() => onDismiss(notification.id)}
                className="absolute top-4 right-4 text-[#90A1B9] hover:text-[#FF2056] transition-colors p-1"
            >
                <Icon icon="mdi:close" width={18} />
            </button>
        </div>
    );
}
