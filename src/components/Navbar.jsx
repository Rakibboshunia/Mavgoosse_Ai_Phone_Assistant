import { useContext, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import NavBtn from "./NavBtn";
import { AuthContext } from "../provider/AuthContext";
import { getStoresApi } from "../libs/stores.api";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, selectedStore, selectStore } =
    useContext(AuthContext);

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [stores, setStores] = useState([]);
  const [loadingStores, setLoadingStores] = useState(false);

  // ✅ STRICT MODE GUARD
  const hasFetchedStores = useRef(false);

  /* 🔹 ROLE NORMALIZER */
  const getUserRole = () => {
    const role = user?.role || user?.user?.role;
    if (!role) return null;
    const r = role.toUpperCase();
    if (r === "SUPER_ADMIN" || r === "SUPERADMIN") return "SuperAdmin";
    if (r === "STORE_MANAGER" || r === "STOREMANAGER") return "StoreManager";
    if (r === "STAFF") return "Staff";
    return null;
  };

  const userRole = getUserRole();

  useEffect(() => {
    if (userRole === "SuperAdmin" && !hasFetchedStores.current) {
      hasFetchedStores.current = true;
      fetchStores();
    }
  }, [userRole]);

  const fetchStores = async () => {
    try {
      setLoadingStores(true);
      const res = await getStoresApi();

      if (Array.isArray(res.data)) {
        setStores(res.data);

        // ✅ AUTO SELECT FIRST STORE (ONLY IF NONE SELECTED)
        if (!selectedStore && res.data.length > 0) {
          selectStore(res.data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch stores", error);
    } finally {
      setLoadingStores(false);
    }
  };

  /* 🔹 NAV LINKS */
  const links = [
    { title: "Dashboard Overview", icon: "fluent:home-12-regular", activeI: "fluent:home-24-filled", path: "/dashboard", roles: ["SuperAdmin", "StoreManager", "Staff"] },
    { title: "Call Logs", icon: "proicons:call", activeI: "fluent:call-12-filled", path: "/call-logs", roles: ["SuperAdmin", "StoreManager", "Staff"] },
    { title: "Call Transfer", icon: "mingcute:transfer-3-line", activeI: "streamline-ultimate:data-transfer-circle-bold", path: "/call-transfer", roles: ["SuperAdmin", "StoreManager", "Staff"] },
    { title: "Appointments", icon: "hugeicons:appointment-01", activeI: "mingcute:schedule-fill", path: "/appointment", roles: ["SuperAdmin", "StoreManager", "Staff"] },
    { title: "Pricing Management", icon: "ph:currency-dollar-bold", activeI: "heroicons:currency-dollar-16-solid", path: "/pricing-management", roles: ["SuperAdmin", "StoreManager", "Staff"] },
    { title: "AI Behavior Settings", icon: "ant-design:robot-outlined", activeI: "ant-design:robot-filled", path: "/ai-behavior-settings", roles: ["SuperAdmin", "StoreManager"] },
    { title: "User Management", icon: "rivet-icons:user-group", activeI: "rivet-icons:user-group-solid", path: "/user-management", roles: ["SuperAdmin"] },
    { title: "Settings", icon: "qlementine-icons:settings-16", activeI: "clarity:settings-solid", path: "/setting", roles: ["SuperAdmin", "StoreManager", "Staff"] },
  ];

  const navLinks = links.filter(
    (link) => userRole && link.roles.includes(userRole)
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full p-5 flex flex-col h-screen relative">
      {/* LOGO */}
      <div className="flex items-center justify-center mb-4">
        <Link to="/dashboard">
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>

      {/* STORE SELECTOR */}
      {userRole === "SuperAdmin" && (
        <>
          <div
            onClick={() => setIsStoreModalOpen(true)}
            className="bg-[#1D293D80] border border-[#2B7FFF33] rounded-xl p-4 flex justify-between cursor-pointer"
          >
            <span className="text-white text-sm">
              {selectedStore?.name || "Select Store"}
            </span>
            <Icon icon="mdi:chevron-down" />
          </div>

          {isStoreModalOpen && (
            <div className="absolute top-28 left-5 right-5 
                bg-[#0F172A] border border-[#2B7FFF33] 
                rounded-xl p-3 z-9999
                max-h-100 overflow-y-auto">
              {loadingStores && (
                <p className="text-center text-sm text-gray-400">
                  Loading stores...
                </p>
              )}

              {!loadingStores &&
                stores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => {
                      selectStore(store);
                      setIsStoreModalOpen(false);
                    }}
                    className="p-3 rounded-lg hover:bg-[#2B7FFF20] cursor-pointer"
                  >
                    <p className="text-white text-sm">{store.name}</p>
                    <p className="text-xs text-gray-400">{store.location}</p>
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      {/* NAV LINKS */}
      <ul className="flex flex-col gap-4 mt-8 flex-1">
        {navLinks.map((itm) => (
          <li key={itm.path}>
            {location.pathname === itm.path ? (
              <NavBtn icon={itm.activeI} title={itm.title} path={itm.path} />
            ) : (
              <NavLink to={itm.path} className="flex items-center gap-4 p-3">
                <Icon icon={itm.icon} width={28} />
                <span>{itm.title}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="bg-red-900 text-white py-3 rounded-xl hover:bg-red-600 transition-all cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
