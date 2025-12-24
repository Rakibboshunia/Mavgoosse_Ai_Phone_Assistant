import React, { useState } from 'react';
import NotificationFilters from '../components/NotificationFilters';
import DetailedNotificationCard from '../components/DetailedNotificationCard';

const initialNotifications = [
  {
    id: 1,
    type: 'appointment',
    title: 'New Appointment Booked',
    description: 'AI booked appointment for iPhone 13 screen repair - Tomorrow at 2:00 PM',
    time: '5 min ago',
    unread: true,
    category: 'appointments'
  },
  {
    id: 2,
    type: 'transfer',
    title: 'Warm Transfer Completed',
    description: 'Call successfully transferred to John Martinez - Customer inquiry about warranty',
    time: '18 min ago',
    unread: false,
    category: 'calls'
  },
  {
    id: 3,
    type: 'latency',
    title: 'API Latency Warning',
    description: 'VAPI response time increased to 340ms (threshold: 200ms). System performance degraded.',
    time: '1 hour ago',
    unread: false,
    highPriority: true,
    category: 'alerts'
  },
  {
    id: 4,
    type: 'appointment',
    title: 'Appointment Reminder',
    description: 'Upcoming appointment in 30 minutes - Samsung Galaxy S23 battery replacement',
    time: '1 hour ago',
    unread: false,
    category: 'appointments'
  },
  {
    id: 5,
    type: 'user',
    title: 'New User Added',
    description: 'Sarah Johnson has been added as Store Manager for Brooklyn Heights location',
    time: '2 hours ago',
    unread: false,
    category: 'system'
  },
  {
    id: 6,
    type: 'call',
    title: 'AI Resolution Success',
    description: '50 calls handled successfully by AI today without human intervention',
    time: '3 hours ago',
    unread: false,
    category: 'calls'
  },
  {
    id: 7,
    type: 'system',
    title: 'System Maintenance Scheduled',
    description: 'Scheduled maintenance on Dec 20, 2025 at 2:00 AM EST. Expected downtime: 30 minutes.',
    time: '5 hours ago',
    unread: false,
    category: 'system'
  }
];

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return n.unread;
    return n.category === activeFilter;
  });

  return (
    <div>
      <NotificationFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="mt-8 space-y-1">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <DetailedNotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
              onDismiss={handleDismiss}
            />
          ))
        ) : (
          <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-12 text-center text-[#90A1B9]">
            No notifications found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
