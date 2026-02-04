import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { removeAllTokens } from "../utils/cookies";
import { getProfileApi } from "../libs/auth.api";

const AuthProvider = ({ children }) => {
  /* ================= USER ================= */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : null;
  });

  /* ================= STORE ================= */
  const [selectedStore, setSelectedStore] = useState(() => {
    const savedStore = localStorage.getItem("selectedStore");
    return savedStore ? JSON.parse(savedStore) : null;
  });

  /* ================= LOGIN ================= */
  const login = (authData) => {
    setUser(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setUser(null);
    setSelectedStore(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("selectedStore");
    removeAllTokens();
  };

  /* ================= PROFILE SYNC ================= */
  const fetchProfile = async () => {
    try {
      const res = await getProfileApi();

      setUser((prev) => {
        if (!prev) return prev;

        const updatedUser = {
          ...prev,
          ...res.data, // first_name, last_name, profile_image, etc
        };

        localStorage.setItem("auth", JSON.stringify(updatedUser));
        return updatedUser;
      });
    } catch (err) {
      console.log("Profile sync failed", err);
    }
  };

  /* ================= ROLE ================= */
  const role = user?.role || user?.user?.role;

  /* ================= STORE SELECT ================= */
  const selectStore = (store) => {
    setSelectedStore(store);
    localStorage.setItem("selectedStore", JSON.stringify(store));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        fetchProfile,
        selectedStore,
        selectStore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
