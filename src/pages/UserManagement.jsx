import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AddUserModal from "../components/AddUserModal";
import {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../libs/users.api";

/* ================= ROLE MAPPING ================= */
const ROLE_LABEL_MAP = {
  SUPER_ADMIN: "Super Admin",
  STORE_MANAGER: "Store Manager",
  STAFF: "Staff",
};

const ROLE_VALUE_MAP = {
  "Super Admin": "SUPER_ADMIN",
  "Store Manager": "STORE_MANAGER",
  Staff: "STAFF",
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRole, setSelectedRole] = useState("Store Manager");
  const [selectedUser, setSelectedUser] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsersApi();

      const formatted = res.data.map((u) => ({
        id: u.id,
        name: `${u.first_name} ${u.last_name}`,
        email: u.email,
        role: ROLE_LABEL_MAP[u.role],
        status: "active",
        lastActive: u.last_active,
        initials: `${u.first_name?.[0] ?? ""}${u.last_name?.[0] ?? ""}`,
        profile_image: u.profile_image,
      }));

      setUsers(formatted);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */
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

  /* ================= DELETE ================= */
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUserApi(selectedUser.id);
      setUsers(users.filter((u) => u.id !== selectedUser.id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  /* ================= EDIT ================= */
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateUserApi(selectedUser.id, {
        first_name: selectedUser.name.split(" ")[0],
        last_name: selectedUser.name.split(" ").slice(1).join(" "),
        email: selectedUser.email,
        role: ROLE_VALUE_MAP[selectedUser.role],
      });
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
  };

  /* ================= ADD ================= */
  const handleAddNewUser = async (userData) => {
  try {
    await createUserApi({
      first_name: userData.name.split(" ")[0],
      last_name: userData.name.split(" ").slice(1).join(" "),
      email: userData.email,
      role: ROLE_VALUE_MAP[userData.role],
      password: userData.password, // 👈 REQUIRED
    });

    fetchUsers();
  } catch (err) {
    console.error("Create user failed", err.response?.data);
    alert("User creation failed. Check console.");
  } finally {
    setIsAddUserModalOpen(false);
  }
};


  return (
    <div className="p-6">
      {/* ADD USER */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="bg-[#1D293D] border border-[#2B7FFF33] text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Icon icon="mdi:plus" width={20} />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* USERS LIST */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">All Users</h2>

          {loading && (
            <p className="text-center text-[#90A1B9]">Loading users...</p>
          )}

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-[#0F172B60] border border-[#2B7FFF15] rounded-xl p-4 flex justify-between"
              >
                <div className="flex items-center gap-4">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="size-12 bg-[#2B7FFF] rounded-full flex items-center justify-center text-white font-bold">
                      {user.initials}
                    </div>
                  )}

                  <div>
                    <h3 className="text-white">{user.name}</h3>
                    <p className="text-[#90A1B9] text-sm">{user.email}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full mt-2 inline-block ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[#90A1B9]">Last Active</p>
                    <p className="text-sm text-white">{user.lastActive}</p>
                  </div>

                  <button onClick={() => handleEditUser(user)}>
                    <Icon icon="mdi:pencil" className="text-[#2B7FFF]" />
                  </button>

                  <button onClick={() => handleDeleteUser(user)}>
                    <Icon icon="mdi:delete" className="text-[#FF2056]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROLE PERMISSIONS (UI ONLY) */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Role Permissions
          </h2>

          {["Super Admin", "Store Manager", "Staff"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`w-full mb-3 px-4 py-3 rounded-xl ${
                selectedRole === role
                  ? "bg-[#05DF72] text-white"
                  : "bg-[#0F172B60] text-white"
              }`}
            >
              {role}
            </button>
          ))}

          {/* <h3 className="text-white mt-6 mb-4">
            Permissions for {selectedRole}
          </h3>

          {Object.keys(permissions[selectedRole]).map((perm) => (
            <label key={perm} className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={permissions[selectedRole][perm]}
                onChange={() => handlePermissionChange(perm)}
              />
              <span className="text-white">{perm}</span>
            </label>
          ))} */}
          
        </div>
      </div>

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1D293D] p-6 rounded-xl w-100">
            <h3 className="text-white text-xl mb-4">Delete User?</h3>
            <p className="text-[#90A1B9] mb-6">
              Delete <b>{selectedUser?.name}</b> permanently?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-[#FF2056] text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <AddUserModal
          onClose={() => setIsAddUserModalOpen(false)}
          onSave={handleAddNewUser}
        />
      )}
    </div>
  );
}
