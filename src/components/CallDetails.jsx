import React from 'react';
import { Icon } from '@iconify/react';

export default function CallDetails({ call }) {
    if (!call) {
        return (
            <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] rounded-2xl p-8 flex flex-col items-center justify-center text-[#90A1B9] h-full min-h-[500px]">
                <Icon icon="mdi:phone-outline" width={48} className="mb-4 opacity-20" />
                <p>Select a call to view details</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-[#2B7FFF33]">
                <h2 className="text-xl font-medium text-white">Call Details</h2>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-y-8 mb-8">
                    <div>
                        <p className="text-xs text-[#90A1B9] mb-1">Phone Number</p>
                        <h3 className="text-lg text-white font-medium">{call.phoneNumber}</h3>
                    </div>
                    <div>
                        <p className="text-xs text-[#90A1B9] mb-1">Duration</p>
                        <h3 className="text-lg text-white font-medium">{call.duration}</h3>
                    </div>
                    <div>
                        <p className="text-xs text-[#90A1B9] mb-1">Date & Time</p>
                        <h3 className="text-lg text-white font-medium">{call.date} {call.time}</h3>
                    </div>
                    <div>
                        <p className="text-xs text-[#90A1B9] mb-1">Issue Type</p>
                        <h3 className="text-lg text-white font-medium">{call.issueType}</h3>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-xs text-[#90A1B9] mb-2">Call Type</p>
                    <span className={`text-xs px-3 py-1 rounded-md border ${call.status === 'AI Resolved' ? 'text-[#00D1FF] bg-[#00D1FF10] border-[#00D1FF33]' : 'text-[#FF8904] bg-[#FF890410] border-[#FF890433]'
                        }`}>
                        {call.status}
                    </span>
                </div>

                <div className="mb-8">
                    <p className="text-xs text-[#90A1B9] mb-2">Outcome</p>
                    <h3 className="text-lg text-white font-medium">{call.outcome}</h3>
                </div>

                <button className="w-full bg-[#3D2B56] hover:bg-[#4D3B66] text-[#D4ADFC] py-4 rounded-xl flex items-center justify-center gap-3 mb-10 transition-colors">
                    <Icon icon="mdi:play-circle" width={24} />
                    <span className="font-medium">Play Audio Recording</span>
                </button>

                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Icon icon="mdi:text-box-outline" width={20} className="text-[#2B7FFF]" />
                        <h3 className="text-white font-medium text-lg">Conversation Transcript</h3>
                    </div>

                    <div className="bg-[#0a1120] rounded-2xl p-6 space-y-6 border border-[#2B7FFF10]">
                        {call.transcript && call.transcript.map((msg, index) => (
                            <div key={index} className="space-y-1">
                                <p className={`text-sm font-bold ${msg.role === 'AI' ? 'text-[#00D1FF]' : 'text-[#2B7FFF]'}`}>
                                    {msg.role === 'AI' ? 'AI Assistant:' : 'Customer:'}
                                </p>
                                <p className="text-sm text-white opacity-90 leading-relaxed">
                                    {msg.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
