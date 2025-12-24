import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import DropDown from './DropDown';

export default function CallSearchFilter({ onSearch, onTypeChange, onIssueChange, onDateChange }) {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedIssue, setSelectedIssue] = useState('all');
    const [selectedDate, setSelectedDate] = useState('today');

    const typeOptions = [
        { label: 'All Type', value: 'all' },
        { label: 'AI Resolved', value: 'ai-resolved' },
        { label: 'Warm Transfer', value: 'warm-transfer' },
        { label: 'Dropped', value: 'dropped' },
    ];

    const issueOptions = [
        { label: 'All Issues', value: 'all' },
        { label: 'Screen', value: 'screen' },
        { label: 'Battery', value: 'battery' },
        { label: 'Software', value: 'software' },
    ];

    const dateOptions = [
        { label: 'Today', value: 'today' },
        { label: 'Past Week', value: 'week' },
        { label: 'Monthly', value: 'month' },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Icon
                    icon="mdi:magnify"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#90A1B9]"
                    width={20}
                />
                <input
                    type="text"
                    placeholder="Search by phone number, issue type..."
                    className="w-full bg-[#0F172B80] border-2 border-[#2B7FFF33] rounded-xl py-3 pl-12 pr-4 text-white placeholder-[#90A1B9] outline-none focus:border-[#2B7FFF]"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <div className="flex gap-4">
                <DropDown
                    options={typeOptions}
                    value={selectedType}
                    onChange={(v) => { setSelectedType(v); onTypeChange?.(v); }}
                />
                <DropDown
                    options={issueOptions}
                    value={selectedIssue}
                    onChange={(v) => { setSelectedIssue(v); onIssueChange?.(v); }}
                />
                <DropDown
                    options={dateOptions}
                    value={selectedDate}
                    onChange={(v) => { setSelectedDate(v); onDateChange?.(v); }}
                />
            </div>
        </div>
    );
}
