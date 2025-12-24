import React, { useState } from 'react';
import AppointmentStatsCard from '../components/AppointmentStatsCard';
import BookingLink from '../components/BookingLink';
import AppointmentCard from '../components/AppointmentCard';
import DropDown from '../components/DropDown';

const initialAppointments = [
  {
    id: 1,
    phone: '+1 (555) 123-4567',
    service: 'iPhone Trade-in',
    date: '2025-12-17',
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: 2,
    phone: '+1 (555) 234-5678',
    service: 'Console Repair',
    date: '2025-12-17',
    time: '02:30 PM',
    status: 'pending'
  },
  {
    id: 3,
    phone: '+1 (555) 234-5678',
    service: 'Console Repair',
    date: '2025-12-17',
    time: '02:30 PM',
    status: 'pending'
  },
  {
    id: 4,
    phone: '+1 (555) 123-4567',
    service: 'iPhone Trade-in',
    date: '2025-12-17',
    time: '10:00 AM',
    status: 'canceled'
  }
];

export default function Appointment() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState('all');

  const handleConfirm = (id) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'confirmed' } : app));
  };

  const handleCancel = (id) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'canceled' } : app));
  };

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const filterOptions = [
    { label: 'All Appointments', value: 'all' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Canceled', value: 'canceled' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AppointmentStatsCard
          title="Total Booked"
          value="34"
          subtext="+8 this week"
          icon="mdi:calendar-multiselect"
          color="text-[#2B7FFF]"
        />
        <AppointmentStatsCard
          title="AI Booked"
          value="28"
          subtext="82% of total"
          icon="mdi:check-decagram-outline"
          color="text-[#05DF72]"
        />
        <AppointmentStatsCard
          title="Pending"
          value="3"
          subtext="Awaiting confirmation"
          icon="mdi:alert-circle-outline"
          color="text-[#FF8904]"
        />
      </div>

      {/* Booking Link Section */}
      <BookingLink url="https://techstore.com/book?id=store123" />

      {/* List Header and Filter */}
      <div className="flex items-center justify-between pt-4">
        <DropDown
          options={filterOptions}
          value={filter}
          onChange={setFilter}
          className="w-64"
        />
      </div>

      {/* Appointment Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <div className="col-span-full bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-12 text-center text-[#90A1B9]">
            No appointments found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
