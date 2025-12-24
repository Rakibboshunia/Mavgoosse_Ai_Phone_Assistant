import React from 'react';

const repairData = [
    { name: 'Screen Repair', count: 156, percentage: 85 },
    { name: 'Battery Replacement', count: 89, percentage: 55 },
    { name: 'Back Glass Repair', count: 67, percentage: 40 },
    { name: 'Software Issues', count: 45, percentage: 25 },
];

export default function TopRepairRequests() {
    return (
        <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] p-8 rounded-2xl h-full">
            <h2 className="text-xl mb-6 text-white font-medium">Top Repair Requests</h2>

            <div className="space-y-6">
                {repairData.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white opacity-80">{item.name}</span>
                            <span className="text-[#90A1B9]">{item.count} requests</span>
                        </div>
                        <div className="w-full bg-[#1e293b] rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-linear-to-r from-[#00D1FF] to-[#2B7FFF] h-full rounded-full transition-all duration-500"
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
