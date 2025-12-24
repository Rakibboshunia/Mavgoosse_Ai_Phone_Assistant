import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TimeSelector from '../components/TimeSelector';

export default function AISettings() {
    const [greetings, setGreetings] = useState({
        opening: '',
        closed: ''
    });

    const [tone, setTone] = useState('friendly');

    const [businessHours, setBusinessHours] = useState({
        monday: { start: '09:00 AM', end: '06:00 PM' },
        tuesday: { start: '09:00 AM', end: '06:00 PM' },
        wednesday: { start: '09:00 AM', end: '06:00 PM' },
        thursday: { start: '09:00 AM', end: '06:00 PM' },
        friday: { start: '09:00 AM', end: '06:00 PM' },
        saturday: { start: '09:00 AM', end: '06:00 PM' },
        sunday: { start: '---', end: '---' }
    });

    const [escalation, setEscalation] = useState({
        retryAttempts: 3,
        fallbackResponse: "I'm not sure I understand. Let me connect you with a specialist.",
        keywords: ['angry', 'manager', 'complaint', 'lawsuit', 'refund', 'unacceptable']
    });

    const [newKeyword, setNewKeyword] = useState('');

    const handleSaveGreetings = () => {
        console.log('Saving greetings:', greetings);
    };

    const handleSaveSettings = () => {
        console.log('Saving escalation settings:', escalation);
    };

    const handleAddKeyword = () => {
        if (newKeyword.trim() && !escalation.keywords.includes(newKeyword.trim())) {
            setEscalation({ ...escalation, keywords: [...escalation.keywords, newKeyword.trim()] });
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (keyword) => {
        setEscalation({ ...escalation, keywords: escalation.keywords.filter(k => k !== keyword) });
    };

    return (
        <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Greeting Scripts */}
                <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Icon icon="mdi:message-text-outline" className="text-[#2B7FFF]" width={24} />
                        <h2 className="text-xl font-bold text-white">Greeting Scripts</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">Opening Hours Greeting</label>
                            <textarea
                                value={greetings.opening}
                                onChange={(e) => setGreetings({ ...greetings, opening: e.target.value })}
                                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl p-4 text-white text-sm focus:border-[#2B7FFF] focus:outline-none resize-none h-24"
                                placeholder="Enter greeting message for opening hours..."
                            />
                        </div>

                        <div>
                            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">Closed Hours Message</label>
                            <textarea
                                value={greetings.closed}
                                onChange={(e) => setGreetings({ ...greetings, closed: e.target.value })}
                                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl p-4 text-white text-sm focus:border-[#2B7FFF] focus:outline-none resize-none h-24"
                                placeholder="Enter message for closed hours..."
                            />
                        </div>

                        <button
                            onClick={handleSaveGreetings}
                            className="w-full bg-[#05DF72] hover:bg-[#05DF72CC] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Icon icon="mdi:content-save" width={20} />
                            Save Scripts
                        </button>
                    </div>
                </div>

                {/* Tone & Personality */}
                <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Icon icon="mdi:account-voice" className="text-[#2B7FFF]" width={24} />
                        <h2 className="text-xl font-bold text-white">Tone & Personality</h2>
                    </div>

                    <p className="text-[#90A1B9] text-sm mb-6">Communication Style</p>

                    <div className="space-y-3">
                        {[
                            { id: 'friendly', label: 'Friendly & Warm', desc: 'Conversational and welcoming' },
                            { id: 'professional', label: 'Professional', desc: 'Formal and business-like' },
                            { id: 'sales', label: 'Sales-Oriented', desc: 'Persuasive and promotional' }
                        ].map((option) => (
                            <div
                                key={option.id}
                                onClick={() => setTone(option.id)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${tone === option.id
                                    ? 'bg-[#2B7FFF15] border-[#2B7FFF]'
                                    : 'bg-[#0F172B60] border-[#2B7FFF15] hover:border-[#2B7FFF33]'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white font-medium mb-1">{option.label}</h3>
                                        <p className="text-[#90A1B9] text-xs">{option.desc}</p>
                                    </div>
                                    <div className={`size-5 rounded-full border-2 flex items-center justify-center ${tone === option.id ? 'border-[#2B7FFF] bg-[#2B7FFF]' : 'border-[#90A1B9]'
                                        }`}>
                                        {tone === option.id && <div className="size-2 bg-white rounded-full"></div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Business Hours */}
            <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Icon icon="mdi:clock-outline" className="text-[#05DF72]" width={24} />
                    <h2 className="text-xl font-bold text-white">Business Hours</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(businessHours).map(([day, times]) => (
                        <div key={day} className="bg-[#0F172B60] border border-[#2B7FFF15] rounded-xl p-4">
                            <h3 className="text-white font-medium mb-3 capitalize">{day}</h3>
                            <div className="flex gap-2">
                                <TimeSelector
                                    value={times.start}
                                    onChange={(newTime) => setBusinessHours({ ...businessHours, [day]: { ...times, start: newTime } })}
                                    disabled={day === 'sunday'}
                                />
                                <TimeSelector
                                    value={times.end}
                                    onChange={(newTime) => setBusinessHours({ ...businessHours, [day]: { ...times, end: newTime } })}
                                    disabled={day === 'sunday'}
                                />
                            </div>
                            {day === 'sunday' && (
                                <p className="text-[#FF2056] text-xs mt-2 font-medium">Closed</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Escalation Rules */}
            <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Icon icon="mdi:alert-circle-outline" className="text-[#FF8904]" width={24} />
                    <h2 className="text-xl font-bold text-white">Escalation Rules</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-[#90A1B9] text-sm font-medium mb-2 block">Retry Attempts Before Transfer</label>
                        <select
                            value={escalation.retryAttempts}
                            onChange={(e) => setEscalation({ ...escalation, retryAttempts: parseInt(e.target.value) })}
                            className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
                        >
                            <option value={1}>1 attempt</option>
                            <option value={2}>2 attempts</option>
                            <option value={3}>3 attempts</option>
                            <option value={4}>4 attempts</option>
                            <option value={5}>5 attempts</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-[#90A1B9] text-sm font-medium mb-2 block">Fallback Response</label>
                        <textarea
                            value={escalation.fallbackResponse}
                            onChange={(e) => setEscalation({ ...escalation, fallbackResponse: e.target.value })}
                            className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl p-4 text-white text-sm focus:border-[#2B7FFF] focus:outline-none resize-none h-24"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[#90A1B9] text-sm font-medium mb-2 block">Auto-Transfer Keywords</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {escalation.keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className="bg-[#FF2056] text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-2"
                            >
                                {keyword}
                                <button onClick={() => handleRemoveKeyword(keyword)} className="hover:opacity-70">
                                    <Icon icon="mdi:close" width={16} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                            placeholder="Add new keyword..."
                            className="flex-1 bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white text-sm focus:border-[#2B7FFF] focus:outline-none"
                        />
                        <button
                            onClick={handleAddKeyword}
                            className="bg-[#2B7FFF15] border border-[#2B7FFF33] text-[#2B7FFF] px-6 py-3 rounded-xl hover:bg-[#2B7FFF25] transition-all"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSaveSettings}
                    className="w-full bg-[#05DF72] hover:bg-[#05DF72CC] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
                >
                    <Icon icon="mdi:content-save" width={20} />
                    Save Settings
                </button>
            </div>
        </div>
    );
}
