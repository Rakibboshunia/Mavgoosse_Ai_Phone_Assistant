import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { Icon } from "@iconify/react";
import AddUserModal from "../components/AddUserModal";
import {
  getUsersApi,
  createUserApi,
  deleteUserApi,
} from "../libs/users.api";
import { AuthContext } from "../provider/AuthContext";
import toast from "react-hot-toast";

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
  const { role, getActiveStoreId } =
    useContext(AuthContext);
  const storeId = getActiveStoreId();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] =
    useState(false);

  const firstLoadRef = useRef(true);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async (showToast = false) => {
    if (role === "SUPER_ADMIN" && !storeId) return;
    if (!storeId) return;

    try {
      setLoading(true);

      const res = await getUsersApi({
        store: storeId,
      });

      const formatted = (res.data || []).map(
        (u) => ({
          id: u.id,
          name: `${u.first_name} ${u.last_name}`,
          email: u.email,
          role: ROLE_LABEL_MAP[u.role],
          lastActive: u.last_active || "—",
          initials: `${u.first_name?.[0] ?? ""}${
            u.last_name?.[0] ?? ""
          }`,
          profile_image: u.profile_image
            ? u.profile_image.startsWith("http")
              ? u.profile_image
              : `${BACKEND_URL}${u.profile_image}`
            : null,
        })
      );

      setUsers(formatted);

      if (showToast) {
        toast.success("Users updated for store", {
          id: "users-refetch",
        });
      }
    } catch (err) {
      console.error("Failed to load users", err);
      toast.error("Failed to load users", {
        id: "users-error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= STORE CHANGE ================= */
  useEffect(() => {
    if (role === "SUPER_ADMIN" && !storeId) return;

    setUsers([]);

    fetchUsers(!firstLoadRef.current);
    firstLoadRef.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  /* ================= ADD USER ================= */
  const handleAddNewUser = async (userData) => {
    try {
      const parts = userData.name.trim().split(/\s+/);

      await createUserApi({
        first_name: parts[0],
        last_name:
          parts.length > 1
            ? parts.slice(1).join(" ")
            : "User",
        email: userData.email,
        role: ROLE_VALUE_MAP[userData.role],
        password: userData.password,
        store: storeId,
      });

      toast.success("User created");
      fetchUsers(false);
    } catch (err) {
      console.error(
        "Create user failed",
        err?.response?.data
      );
      toast.error("User creation failed");
    } finally {
      setIsAddUserModalOpen(false);
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    try {
      await deleteUserApi(selectedUser.id);
      toast.success("User deleted");
      fetchUsers(false);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Delete failed");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  /* ================= GUARD ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#90A1B9]">
        <p>
          Please select a store from the sidebar to
          manage users.
        </p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6">
      {/* ADD USER */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() =>
            setIsAddUserModalOpen(true)
          }
          className="bg-[#1D293D] border border-[#2B7FFF33] text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Icon icon="mdi:plus" width={20} />
          Add New User
        </button>
      </div>

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
                  <h3 className="text-white">
                    {user.name}
                  </h3>
                  <p className="text-[#90A1B9] text-sm">
                    {user.email}
                  </p>
                  <span className="text-xs px-3 py-1 rounded-full mt-2 inline-block bg-[#2B7FFF] text-white">
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsDeleteModalOpen(true);
                }}
              >
                <Icon
                  icon="mdi:delete"
                  className="text-[#FF2056] cursor-pointer hover:text-[#FF2056CC] hover:scale-150 transition-transform"
                />
              </button>
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
              Delete{" "}
              <b>{selectedUser?.name}</b>{" "}
              permanently?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setIsDeleteModalOpen(false)
                }
                className="flex-1 bg-gray-600 text-white py-2 rounded cursor-pointer hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-[#FF2056] text-white py-2 rounded cursor-pointer hover:bg-[#FF2056CC]"
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
          onClose={() =>
            setIsAddUserModalOpen(false)
          }
          onSave={handleAddNewUser}
        />
      )}
    </div>
  );
}
