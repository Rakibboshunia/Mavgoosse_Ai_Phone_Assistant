import React from 'react';
import { Icon } from '@iconify/react';

const stores = [
    {
        id: 1,
        name: 'Downtown Manhattan',
        address: '123 Broadway, NY',
        status: 'online'
    },
    {
        id: 2,
        name: 'Brooklyn Heights',
        address: '456 Atlantic Ave, NY',
        status: 'online'
    },
    {
        id: 3,
        name: 'Queens Center',
        address: '789 Queens Blvd, NY',
        status: 'online'
    },
    {
        id: 4,
        name: 'Jersey City',
        address: '321 Newark Ave, NJ',
        status: 'offline'
    },
    {
        id: 5,
        name: 'Boston Downtown',
        address: '555 Boylston St, MA',
        status: 'online'
    }
];

export default function StoreSelector({ isOpen, onClose, selectedStore, onSelectStore }) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4">
                <div className="bg-[#0F172B] border-2 border-[#2B7FFF33] rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-6">Select Store Location</h2>

                    <div className="space-y-3 max-h-[60vh] overflow-y-auto hide-scrollbar">
                        {stores.map((store) => (
                            <div
                                key={store.id}
                                onClick={() => {
                                    onSelectStore(store);
                                    onClose();
                                }}
                                className={`p-4 rounded-xl cursor-pointer transition-all ${selectedStore?.id === store.id
                                        ? 'bg-[#2B7FFF20] border-2 border-[#2B7FFF]'
                                        : 'bg-[#1D293D80] border border-[#2B7FFF15] hover:bg-[#2B7FFF10] hover:border-[#2B7FFF33]'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <Icon icon="mdi:map-marker" className="text-[#90A1B9] mt-1" width={20} />

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-white font-medium">{store.name}</h3>
                                            {selectedStore?.id === store.id && (
                                                <Icon icon="mdi:check-circle" className="text-[#2B7FFF]" width={20} />
                                            )}
                                        </div>
                                        <p className="text-[#90A1B9] text-sm mb-2">{store.address}</p>
                                        <div className="flex items-center gap-1.5">
                                            <div className={`size-2 rounded-full ${store.status === 'online' ? 'bg-[#05DF72]' : 'bg-[#90A1B9]'}`}></div>
                                            <span className={`text-xs font-medium ${store.status === 'online' ? 'text-[#05DF72]' : 'text-[#90A1B9]'}`}>
                                                {store.status === 'online' ? 'Online' : 'Offline'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
