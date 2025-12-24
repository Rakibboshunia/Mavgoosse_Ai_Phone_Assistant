import React from 'react';
import { Icon } from '@iconify/react';

const conditions = [
    "Software Issues",
    "Unknown Device",
    "Price Negotiation",
    "Warranty Questions",
    "Angry Customer Keywords Detected"
];

export default function TransferConditions() {
    const [selectedConditions, setSelectedConditions] = React.useState(new Set());

    const toggleCondition = (condition) => {
        const newSet = new Set(selectedConditions);
        if (newSet.has(condition)) {
            newSet.delete(condition);
        } else {
            newSet.add(condition);
        }
        setSelectedConditions(newSet);
    };

    return (
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-8">
            <h2 className="text-xl font-medium text-white mb-8">Transfer Conditions</h2>

            <div className="space-y-4">
                {conditions.map((condition) => (
                    <div
                        key={condition}
                        onClick={() => toggleCondition(condition)}
                        className="flex items-center justify-between p-5 bg-[#1D293D80] border border-[#2B7FFF10] rounded-xl cursor-pointer hover:border-[#2B7FFF40] transition-all"
                    >
                        <span className="text-white opacity-80">{condition}</span>
                        <div className={`size-5 rounded border-2 flex items-center justify-center transition-colors ${selectedConditions.has(condition)
                                ? 'bg-[#2B7FFF] border-[#2B7FFF]'
                                : 'border-[#2B7FFF33]'
                            }`}>
                            {selectedConditions.has(condition) && (
                                <Icon icon="mdi:check" className="text-white" width={16} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
