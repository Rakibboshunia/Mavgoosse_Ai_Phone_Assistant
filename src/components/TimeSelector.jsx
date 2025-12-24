import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export default function TimeSelector({ value, onChange, disabled = false }) {
    const [isOpen, setIsOpen] = useState(false);

    // Parse the time string (e.g., "09:00 AM")
    const parseTime = (timeStr) => {
        if (timeStr === '---') return { hour: '09', minute: '00', period: 'AM' };
        const [time, period] = timeStr.split(' ');
        const [hour, minute] = time.split(':');
        return { hour, minute, period };
    };

    const { hour, minute, period } = parseTime(value);
    const [selectedHour, setSelectedHour] = useState(hour);
    const [selectedMinute, setSelectedMinute] = useState(minute);
    const [selectedPeriod, setSelectedPeriod] = useState(period);

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = ['00', '15', '30', '45'];

    const handleApply = () => {
        if (disabled) return;
        onChange(`${selectedHour}:${selectedMinute} ${selectedPeriod}`);
        setIsOpen(false);
    };

    const handleCancel = () => {
        const current = parseTime(value);
        setSelectedHour(current.hour);
        setSelectedMinute(current.minute);
        setSelectedPeriod(current.period);
        setIsOpen(false);
    };

    if (disabled) {
        return (
            <div className="flex-1 bg-[#1D293D] border border-[#2B7FFF15] rounded-lg px-3 py-2 text-[#90A1B9] text-sm opacity-50 cursor-not-allowed">
                ---
            </div>
        );
    }

    return (
        <div className="flex-1 relative">
            {/* Display Input */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#1D293D] border border-[#2B7FFF15] rounded-lg px-3 py-2 text-white text-sm cursor-pointer hover:border-[#2B7FFF33] transition-all flex items-center justify-between"
            >
                <span>{value}</span>
                <Icon icon="mdi:chevron-down" className="text-[#90A1B9]" width={16} />
            </div>

            {/* Dropdown Panel */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={handleCancel}
                    ></div>
                    <div className="absolute top-full left-0 mt-2 bg-[#0F172B] border-2 border-[#2B7FFF33] rounded-xl p-4 shadow-2xl z-50 min-w-[200px]">
                        <div className="space-y-3">
                            <div>
                                <label className="text-[#90A1B9] text-xs mb-1 block">Hour</label>
                                <select
                                    value={selectedHour}
                                    onChange={(e) => setSelectedHour(e.target.value)}
                                    className="w-full bg-[#1D293D] border border-[#2B7FFF15] rounded-lg px-3 py-2 text-white text-sm focus:border-[#2B7FFF] focus:outline-none"
                                >
                                    {hours.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#90A1B9] text-xs mb-1 block">Minutes</label>
                                <select
                                    value={selectedMinute}
                                    onChange={(e) => setSelectedMinute(e.target.value)}
                                    className="w-full bg-[#1D293D] border border-[#2B7FFF15] rounded-lg px-3 py-2 text-white text-sm focus:border-[#2B7FFF] focus:outline-none"
                                >
                                    {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-[#90A1B9] text-xs mb-1 block">Period</label>
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="w-full bg-[#1D293D] border border-[#2B7FFF15] rounded-lg px-3 py-2 text-white text-sm focus:border-[#2B7FFF] focus:outline-none"
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 bg-[#1D293D] border border-[#2B7FFF15] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#2B7FFF15] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="flex-1 bg-[#2B7FFF] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#2B7FFF]/80 transition-all"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
