import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import InputField from '../components/InputField';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Jane D.',
    email: 'jane@gmail.com',
    storeName: 'Ubreakifix Store',
    storeAddress: '123 Main Street, New York, NY 10001'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

      {/* Tabs */}
      <div className="flex items-center gap-12 mb-12 border-b border-[#2B7FFF10] pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`text-sm font-medium transition-all relative pb-2 ${activeTab === 'profile' ? 'text-white' : 'text-[#90A1B9] hover:text-white'
            }`}
        >
          Profile
          {activeTab === 'profile' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2B7FFF]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`text-sm font-medium transition-all relative pb-2 ${activeTab === 'password' ? 'text-white' : 'text-[#90A1B9] hover:text-white'
            }`}
        >
          Password Settings
          {activeTab === 'password' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2B7FFF]"></div>
          )}
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-8">
            <p className="text-[#90A1B9] text-sm font-medium mb-4">Profile Image</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="size-20 rounded-full border-2 border-[#2B7FFF33] overflow-hidden bg-[#1D293D]">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 size-7 bg-[#2B7FFF] rounded-full flex items-center justify-center border-2 border-[#0F172B] shadow-lg text-white">
                    <Icon icon="mdi:camera" width={14} />
                  </button>
                )}
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 rounded-lg bg-[#2B7FFF15] border border-[#2B7FFF33] text-[#2B7FFF] text-xs font-semibold hover:bg-[#2B7FFF25] transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {isEditing ? (
                <>
                  <InputField
                    label="Full Name"
                    icon="mdi:account-outline"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                  <InputField
                    label="Email"
                    icon="mdi:email-outline"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                  <InputField
                    label="Store Name"
                    icon="mdi:store-outline"
                    value={profile.storeName}
                    onChange={(e) => setProfile({ ...profile, storeName: e.target.value })}
                  />
                  <InputField
                    label="Store Address"
                    icon="mdi:map-marker-outline"
                    value={profile.storeAddress}
                    onChange={(e) => setProfile({ ...profile, storeAddress: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <DataGrid label="Full Name" value={profile.fullName} />
                  <DataGrid label="Email" value={profile.email} />
                  <DataGrid label="Store Name" value={profile.storeName} />
                  <DataGrid label="Store Address" value={profile.storeAddress} />
                </>
              )}
            </div>

            {isEditing && (
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-[#05DF72] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#05DF72CC] transition-all shadow-[0_4px_15px_#05DF7220]"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <form onSubmit={handleSavePassword} className="space-y-8">
            <InputField
              label="New Password"
              icon="mdi:lock-outline"
              type="password"
              placeholder="••••••••"
            />
            <InputField
              label="Confirm New Password"
              icon="mdi:lock-check-outline"
              type="password"
              placeholder="••••••••"
            />
            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#05DF72] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#05DF72CC] transition-all shadow-[0_4px_15px_#05DF7220]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function DataGrid({ label, value }) {
  return (
    <div className="space-y-2">
      <p className="text-[#90A1B9] text-sm font-medium opacity-60 uppercase tracking-wider">{label}:</p>
      <p className="text-white text-lg font-medium">{value}</p>
    </div>
  );
}
