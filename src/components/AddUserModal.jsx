import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function AddUserModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  const handleSubmit = () => {
  if (!formData.name.trim() || !formData.email.trim()) {
    alert("Please fill in all required fields");
    return;
  }

  onSave({
    name: formData.name.trim(),
    email: formData.email.trim(),
    role: formData.role,
    password: "Temp@1234", // 👈 REQUIRED
  });
};


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1D293D] border-2 border-[#2B7FFF33] rounded-2xl p-6 max-w-2xl w-full mx-4">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="mdi:account-plus" className="text-[#05DF72]" width={28} />
          <h3 className="text-xl font-bold text-white">Add New User</h3>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
              First Name
            </label>
            <input
              type="text"
              value={formData.name.split(" ")[0] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: `${e.target.value} ${formData.name.split(" ").slice(1).join(" ")}`,
                })
              }
              placeholder="Enter first name"
              className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white placeholder:text-[#90A1B9] focus:border-[#2B7FFF] focus:outline-none"
            />
          </div>

        {/* Last Name */}
          <div>
            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
              Last Name
            </label>
            <input
              type="text"
              value={formData.name.split(" ").slice(1).join(" ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: `${formData.name.split(" ")[0] || ""} ${e.target.value}`,
                })
              }
              placeholder="Enter last name"
              className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white placeholder:text-[#90A1B9] focus:border-[#2B7FFF] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="email@example.com"
              className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white placeholder:text-[#90A1B9] focus:border-[#2B7FFF] focus:outline-none"
            />
          </div>

          {/* Role */}
          <div className="md:col-span-2">
            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
            >
              <option value="Staff">Staff</option>
              <option value="Store Manager">Store Manager</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-8">
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
