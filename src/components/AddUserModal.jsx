import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function AddUserModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "Staff",
        permissions: "",
    });

    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            alert("Please fill in all required fields");
            return;
        }

        // Generate initials from name
        const initials = formData.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

        onSave({
            ...formData,
            initials,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1D293D] border-2 border-[#2B7FFF33] rounded-2xl p-6 max-w-2xl w-full mx-4">
                <h3 className="text-xl font-bold text-white mb-6">Add New User</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter name"
                            className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white placeholder:text-[#90A1B9] focus:border-[#2B7FFF] focus:outline-none"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="email@ubreakifix.com"
                            className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white placeholder:text-[#90A1B9] focus:border-[#2B7FFF] focus:outline-none"
                        />
                    </div>

                    {/* Permission */}
                    <div>
                        <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                            Permission
                        </label>
                        <input
                            type="text"
                            value={formData.permissions}
                            onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                            placeholder="View Call Logs / View Pricing"
                            className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white placeholder:text-[#90A1B9] focus:border-[#2B7FFF] focus:outline-none"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                            Role
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
                        >
                            <option>Staff</option>
                            <option>Store Manager</option>
                            <option>Super Admin</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-[#0F172B60] border border-[#2B7FFF15] text-white px-4 py-3 rounded-xl hover:bg-[#2B7FFF15] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-[#05DF72] text-white px-4 py-3 rounded-xl hover:bg-[#05DF72CC] transition-all"
                    >
                        Create User
                    </button>
                </div>
            </div>
        </div>
    );
}
