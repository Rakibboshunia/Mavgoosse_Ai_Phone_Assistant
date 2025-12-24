import React, { useState } from 'react';
import CallSearchFilter from '../components/CallSearchFilter';
import CallList from '../components/CallList';
import CallDetails from '../components/CallDetails';

const dummyCalls = [
    {
        id: 1,
        phoneNumber: '+1 (555) 345-6789',
        date: '2025-12-16',
        time: '09:42 AM',
        duration: '5:23',
        status: 'AI Resolved',
        outcome: 'Quote Provided',
        issueType: 'Screen',
        transcript: [
            { role: 'AI', content: 'Thank you for calling UBreakiFix! How can I help you today?' },
            { role: 'User', content: 'Hi, my iPhone 13 screen is cracked. How much would it cost to repair?' },
            { role: 'AI', content: 'I can help you with that! For an iPhone 13 screen repair, our price is $199. This includes parts, labor, and comes with a 90-day warranty. Would you like to book an appointment?' },
            { role: 'User', content: 'Yes, please! When are you available?' },
            { role: 'AI', content: 'Great! I have availability today at 2:00 PM or tomorrow at 10:00 AM. Which works better for you?' }
        ]
    },
    {
        id: 2,
        phoneNumber: '+1 (555) 345-6789',
        date: '2025-12-16',
        time: '09:42 AM',
        duration: '5:23',
        status: 'Warm Transfer',
        outcome: 'Escalated to technician',
        issueType: 'Software',
        transcript: [
            { role: 'AI', content: 'Thank you for calling UBreakiFix! How can I help you today?' },
            { role: 'User', content: 'My laptop won\'t turn on after a windows update.' },
            { role: 'AI', content: 'That sounds frustrating. Let me transfer you to one of our software specialists who can look into this for you.' }
        ]
    },
    {
        id: 3,
        phoneNumber: '+1 (555) 345-6789',
        date: '2025-12-16',
        time: '09:42 AM',
        duration: '5:23',
        status: 'Appointment',
        outcome: 'Appointment Booked',
        issueType: 'Battery',
        transcript: [
            { role: 'AI', content: 'Thank you for calling UBreakiFix! How can I help you today?' },
            { role: 'User', content: 'I need a new battery for my Samsung S21.' },
            { role: 'AI', content: 'We can definitely do that. I have scheduled you for 3:00 PM today.' }
        ]
    },
    {
        id: 4,
        phoneNumber: '+1 (555) 345-6789',
        date: '2025-12-16',
        time: '09:42 AM',
        duration: '0:20',
        status: 'Dropped',
        outcome: 'Call Dropped',
        issueType: 'Unknown',
        transcript: [
            { role: 'AI', content: 'Thank you for calling UBreakiFix! How can I help you today?' }
        ]
    },
    {
        id: 5,
        phoneNumber: '+1 (555) 345-6789',
        date: '2025-12-16',
        time: '09:42 AM',
        duration: '5:23',
        status: 'AI Resolved',
        outcome: 'Quote Provided',
        issueType: 'Screen',
        transcript: [
            { role: 'AI', content: 'Thank you for calling UBreakiFix! How can I help you today?' }
        ]
    }
];

export default function CallLogs() {
    const [calls, setCalls] = useState(dummyCalls);
    const [selectedCall, setSelectedCall] = useState(dummyCalls[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCalls = calls.filter(call =>
        call.phoneNumber.includes(searchQuery) ||
        call.issueType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-2">
            <CallSearchFilter
                onSearch={setSearchQuery}
                onTypeChange={(v) => console.log('Type:', v)}
                onIssueChange={(v) => console.log('Issue:', v)}
                onDateChange={(v) => console.log('Date:', v)}
            />

            <div className="flex flex-col xl:flex-row gap-8 items-stretch">
                <div className="xl:w-[45%]">
                    <CallList
                        calls={filteredCalls}
                        selectedId={selectedCall?.id}
                        onSelect={setSelectedCall}
                    />
                </div>

                <div className="xl:flex-1">
                    <CallDetails call={selectedCall} />
                </div>
            </div>
        </div>
    );
}
