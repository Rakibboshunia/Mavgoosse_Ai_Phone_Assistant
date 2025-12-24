import React, { useState } from "react";
import { Icon } from "@iconify/react";
import AddUserModal from "../components/AddUserModal";

export default function UserManagement() {
  const [selectedRole, setSelectedRole] = useState("Store Manager");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@ubreakifix.com",
      role: "Super Admin",
      status: "active",
      lastActive: "2 min ago",
      initials: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@ubreakifix.com",
      role: "Store Manager",
      status: "active",
      lastActive: "15 min ago",
      initials: "SJ",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@ubreakifix.com",
      role: "Staff",
      status: "active",
      lastActive: "1 hour ago",
      initials: "MD",
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily@ubreakifix.com",
      role: "Staff",
      status: "active",
      lastActive: "3 hours ago",
      initials: "EC",
    },
    {
      id: 5,
      name: "Emily Chen",
      email: "emily@ubreakifix.com",
      role: "Staff",
      status: "active",
      lastActive: "3 hours ago",
      initials: "EC",
    },
  ]);

  const [permissions, setPermissions] = useState({
    "Super Admin": {
      viewCallLogs: true,
      bookAppointments: true,
      viewPricing: true,
    },
    "Store Manager": {
      viewCallLogs: true,
      bookAppointments: true,
      viewPricing: true,
    },
    Staff: {
      viewCallLogs: false,
      bookAppointments: false,
      viewPricing: false,
    },
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-[#FF2056] text-white";
      case "Store Manager":
        return "bg-[#2B7FFF] text-white";
      case "Staff":
        return "bg-[#05DF72] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handlePermissionChange = (permission) => {
    setPermissions({
      ...permissions,
      [selectedRole]: {
        ...permissions[selectedRole],
        [permission]: !permissions[selectedRole][permission],
      },
    });
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Update user logic here
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddNewUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      status: "active",
      lastActive: "Just now",
    };
    setUsers([...users, newUser]);
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="bg-[#1D293D] border border-[#2B7FFF33] text-white px-6 py-3 rounded-xl hover:bg-[#2B7FFF15] transition-all flex items-center gap-2"
        >
          <Icon icon="mdi:plus" width={20} />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* All Users List */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">All Users</h2>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-[#0F172B60] border border-[#2B7FFF15] rounded-xl p-4 flex items-center justify-between hover:bg-[#2B7FFF10] transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="size-12 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.initials}
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="text-white font-medium">{user.name}</h3>
                    <p className="text-[#90A1B9] text-sm">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#05DF72] text-white">
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <div className="text-right mr-4">
                    <p className="text-[#90A1B9] text-xs">Last Active</p>
                    <p className="text-white text-sm">{user.lastActive}</p>
                  </div>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="p-2 hover:bg-[#2B7FFF15] rounded-lg transition-colors"
                  >
                    <Icon
                      icon="mdi:pencil"
                      className="text-[#2B7FFF]"
                      width={20}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="p-2 hover:bg-[#FF205615] rounded-lg transition-colors"
                  >
                    <Icon
                      icon="mdi:delete"
                      className="text-[#FF2056]"
                      width={20}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Permissions */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Icon icon="mdi:shield-account" className="text-[#2B7FFF]" width={24} />
              <h2 className="text-xl font-bold text-white">Role Permissions</h2>
            </div>
            <button className="p-2 hover:bg-[#2B7FFF15] rounded-lg transition-colors">
              <Icon icon="mdi:plus" className="text-[#2B7FFF]" width={20} />
            </button>
          </div>

          {/* Role Selector */}
          <div className="space-y-3 mb-6">
            {["Super Admin", "Store Manager", "Staff"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedRole === role
                  ? "bg-[#05DF72] text-white font-medium"
                  : "bg-[#0F172B60] border border-[#2B7FFF15] text-white hover:bg-[#2B7FFF10]"
                  }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-white font-medium mb-4">
              Permissions for {selectedRole}
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={permissions[selectedRole]?.viewCallLogs || false}
                    onChange={() => handlePermissionChange("viewCallLogs")}
                    className="size-5 bg-[#0F172B60] border-2 border-[#2B7FFF33] rounded checked:bg-[#05DF72] checked:border-[#05DF72] focus:outline-none cursor-pointer appearance-none"
                  />
                  {permissions[selectedRole]?.viewCallLogs && (
                    <Icon
                      icon="mdi:check"
                      className="absolute top-0 left-0 text-white pointer-events-none"
                      width={20}
                    />
                  )}
                </div>
                <span className="text-white">View Call Logs</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={
                      permissions[selectedRole]?.bookAppointments || false
                    }
                    onChange={() => handlePermissionChange("bookAppointments")}
                    className="size-5 bg-[#0F172B60] border-2 border-[#2B7FFF33] rounded checked:bg-[#05DF72] checked:border-[#05DF72] focus:outline-none cursor-pointer appearance-none"
                  />
                  {permissions[selectedRole]?.bookAppointments && (
                    <Icon
                      icon="mdi:check"
                      className="absolute top-0 left-0 text-white pointer-events-none"
                      width={20}
                    />
                  )}
                </div>
                <span className="text-white">Book Appointments</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={permissions[selectedRole]?.viewPricing || false}
                    onChange={() => handlePermissionChange("viewPricing")}
                    className="size-5 bg-[#0F172B60] border-2 border-[#2B7FFF33] rounded checked:bg-[#05DF72] checked:border-[#05DF72] focus:outline-none cursor-pointer appearance-none"
                  />
                  {permissions[selectedRole]?.viewPricing && (
                    <Icon
                      icon="mdi:check"
                      className="absolute top-0 left-0 text-white pointer-events-none"
                      width={20}
                    />
                  )}
                </div>
                <span className="text-white">View Pricing</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1D293D] border-2 border-[#2B7FFF33] rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon icon="mdi:alert-circle" className="text-[#FF2056]" width={32} />
              <h3 className="text-xl font-bold text-white">Delete User</h3>
            </div>
            <p className="text-[#90A1B9] mb-6">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">{selectedUser?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-[#0F172B60] border border-[#2B7FFF15] text-white px-4 py-3 rounded-xl hover:bg-[#2B7FFF15] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-[#FF2056] text-white px-4 py-3 rounded-xl hover:bg-[#FF2056CC] transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1D293D] border-2 border-[#2B7FFF33] rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-6">
              <Icon icon="mdi:pencil" className="text-[#2B7FFF]" width={32} />
              <h3 className="text-xl font-bold text-white">Edit User</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                  Role
                </label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
                >
                  <option>Super Admin</option>
                  <option>Store Manager</option>
                  <option>Staff</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 bg-[#0F172B60] border border-[#2B7FFF15] text-white px-4 py-3 rounded-xl hover:bg-[#2B7FFF15] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-[#2B7FFF] text-white px-4 py-3 rounded-xl hover:bg-[#2B7FFF]/80 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New User Modal */}
      {isAddUserModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} onSave={handleAddNewUser} />}
    </div>
  );
}
