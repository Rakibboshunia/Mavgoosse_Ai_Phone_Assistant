import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export default function BookingLink({ url }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-8">
            <h3 className="text-white font-medium mb-4">Booking Link</h3>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-[#0a1120] border border-[#2B7FFF10] rounded-xl px-6 py-4 flex items-center">
                    <span className="text-[#90A1B9] truncate text-sm">{url}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="bg-linear-to-r from-[#2B7FFF33] to-[#2B7FFF10] hover:from-[#2B7FFF50] border border-[#2B7FFF33] text-white px-8 py-4 rounded-xl flex items-center gap-3 font-medium transition-all shrink-0"
                >
                    <Icon icon={copied ? "mdi:check-all" : "mdi:content-copy"} width={20} />
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
            </div>
        </div>
    );
}
