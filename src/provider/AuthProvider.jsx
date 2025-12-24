import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [selectedStore, setSelectedStore] = useState(() => {
    const savedStore = localStorage.getItem("selectedStore");
    return savedStore ? JSON.parse(savedStore) : { id: 2, name: 'Brooklyn Heights', address: '456 Atlantic Ave, NY', status: 'online' };
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const selectStore = (store) => {
    setSelectedStore(store);
    localStorage.setItem("selectedStore", JSON.stringify(store));
  };

  const authInfo = {
    user,
    login,
    logout,
    selectedStore,
    selectStore,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
