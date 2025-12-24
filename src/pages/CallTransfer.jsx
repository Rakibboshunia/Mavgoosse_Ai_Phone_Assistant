import React from 'react';
import TechnicianCard from '../components/TechnicianCard';
import TransferConditions from '../components/TransferConditions';

export default function CallTransfer() {
  return (
    <div className="space-y-8">
      {/* Transfer Order Section */}
      <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-[#2B7FFF33]">
          <h1 className="text-2xl font-medium text-white mb-2">Call Transfer</h1>
          <p className="text-sm text-[#90A1B9]">Calls will be transferred in this order</p>
        </div>

        <div className="p-8">
          <TechnicianCard
            priority={1}
            name="John Martinez"
            phoneNumber="+1 (555) 100-1001"
            available={true}
          />
          {/* Add more technicians as needed */}
        </div>
      </div>

      {/* Conditions Section */}
      <TransferConditions />
    </div>
  );
}
