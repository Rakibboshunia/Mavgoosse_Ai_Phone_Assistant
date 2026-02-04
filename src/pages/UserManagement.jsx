import React, { useEffect, useState, useContext } from "react";
import { Icon } from "@iconify/react";
import AddUserModal from "../components/AddUserModal";
import {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../libs/users.api";
import { AuthContext } from "../provider/AuthContext";

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

const BACKEND_URL = "http://172.252.13.97:8020";

export default function UserManagement() {
  const { role, getActiveStoreId } = useContext(AuthContext);
  const storeId = getActiveStoreId(); // 🔥 GLOBAL STORE ID

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRole, setSelectedRole] = useState("Store Manager");
  const [selectedUser, setSelectedUser] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    if (role === "SUPER_ADMIN" && !storeId) return;
    fetchUsers();
  }, [storeId]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsersApi({
        store: storeId, // 🔥 STORE SCOPED
      });

      const formatted = (res.data || []).map((u) => ({
        id: u.id,
        name: `${u.first_name} ${u.last_name}`,
        email: u.email,
        role: ROLE_LABEL_MAP[u.role],
        status: "active",
        lastActive: u.last_active || "—",
        initials: `${u.first_name?.[0] ?? ""}${u.last_name?.[0] ?? ""}`,
        profile_image: u.profile_image
          ? u.profile_image.startsWith("http")
            ? u.profile_image
            : `${BACKEND_URL}${u.profile_image}`
          : null,
      }));

      setUsers(formatted);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUserApi(selectedUser.id);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  /* ================= ADD ================= */
  const handleAddNewUser = async (userData) => {
    try {
      const parts = userData.name.trim().split(/\s+/);

      await createUserApi({
        first_name: parts[0],
        last_name: parts.length > 1 ? parts.slice(1).join(" ") : "User",
        email: userData.email,
        role: ROLE_VALUE_MAP[userData.role],
        password: userData.password,
        store: storeId, // 🔥 STORE ASSIGN
      });

      fetchUsers();
    } catch (err) {
      console.error("Create user failed", err?.response?.data);
      alert("User creation failed. Check console.");
    } finally {
      setIsAddUserModalOpen(false);
    }
  };

  /* ================= EMPTY STATE ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#90A1B9]">
        <p>Please select a store from the sidebar to manage users.</p>
      </div>
    );
  }

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
          <h2 className="text-xl font-bold text-white mb-6">
            Store Users
          </h2>

          {loading && (
            <p className="text-center text-[#90A1B9]">
              Loading users...
            </p>
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
                    <p className="text-[#90A1B9] text-sm">
                      {user.email}
                    </p>
                    <span className="text-xs px-3 py-1 rounded-full mt-2 inline-block bg-[#2B7FFF] text-white">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[#90A1B9]">
                      Last Active
                    </p>
                    <p className="text-sm text-white">
                      {user.lastActive}
                    </p>
                  </div>

                  <button onClick={() => handleDeleteUser(user)}>
                    <Icon
                      icon="mdi:delete"
                      className="text-[#FF2056]"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROLE PANEL (UI ONLY) */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Roles
          </h2>

          {["Super Admin", "Store Manager", "Staff"].map((r) => (
            <div
              key={r}
              className="mb-3 px-4 py-3 rounded-xl bg-[#0F172B60] text-white"
            >
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1D293D] p-6 rounded-xl w-100">
            <h3 className="text-white text-xl mb-4">
              Delete User?
            </h3>
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
