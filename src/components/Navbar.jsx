import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NavBtn from "./NavBtn";
import { AuthContext } from "../provider/AuthContext";


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

export default function Navbar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, selectedStore, selectStore } = useContext(AuthContext);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  const baseLinks = [
    {
      title: "Dashboard Overview",
      icon: "fluent:home-12-regular",
      activeI: "fluent:home-24-filled",
      path: "/dashboard",
    },
    {
      title: "Call Logs",
      icon: "proicons:call",
      activeI: "fluent:call-12-filled",
      path: "/call-logs",
    },
    {
      title: "Call Transfer",
      icon: "mingcute:transfer-3-line",
      activeI: "streamline-ultimate:data-transfer-circle-bold",
      path: "/call-transfer",
    },
    {
      title: "Appointments",
      icon: "hugeicons:appointment-01",
      activeI: "mingcute:schedule-fill",
      path: "/appointment",
    },
  ];

  const adminLinks = [
    {
      title: "Pricing Management",
      icon: "ph:currency-dollar-bold",
      activeI: "heroicons:currency-dollar-16-solid",
      path: "/pricing-management",
    },
    {
      title: "AI behavior Settings",
      icon: "ant-design:robot-outlined",
      activeI: "ant-design:robot-filled",
      path: "/ai-behavior-settings",
    },
    {
      title: "API Settings",
      icon: "solar:phone-calling-outline",
      activeI: "solar:phone-calling-bold",
      path: "/api-settings",
    },
    {
      title: "User Management",
      icon: "rivet-icons:user-group",
      activeI: "rivet-icons:user-group-solid",
      path: "/user-management",
    },
  ];
  const StoreLinks = [
    {
      title: "Pricing list",
      icon: "ph:currency-dollar-bold",
      activeI: "heroicons:currency-dollar-16-solid",
      path: "/pricing-list",
    }
  ]

  const bottomLinks = [
    {
      title: "Settings",
      icon: "qlementine-icons:settings-16",
      activeI: "clarity:settings-solid",
      path: "/setting",
    },
  ];

  const nabLinks = [
    ...baseLinks,
    ...(user?.role === "admin" ? adminLinks : StoreLinks),
    ...bottomLinks,
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full p-5 flex flex-col justify-between h-screen relative">
      {/* Close button for mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#2B7FFF15] rounded-lg transition-colors md:hidden"
        >
          <Icon icon="mdi:close" className="text-white" width={24} />
        </button>
      )}

      <div className="flex items-center justify-center mb-4">
        <img src="/logo.png"></img>
      </div>
      {/* Store Selector for Admin or Logo for Store */}
      {user?.role === "admin" && (
        <div
          onClick={() => setIsStoreModalOpen(true)}
          className="bg-[#1D293D80] border border-[#2B7FFF33] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#2B7FFF10] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 bg-[#2B7FFF15] rounded-lg flex items-center justify-center">
              <Icon icon="mdi:map-marker" className="text-[#2B7FFF]" width={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-medium text-sm">{selectedStore?.name || 'Brooklyn Heights'}</span>
              <span className="text-[#90A1B9] text-[10px]">{selectedStore?.address || '456 Atlantic Ave, NY'}</span>
            </div>
          </div>
          <Icon icon="mdi:chevron-down" className="text-[#90A1B9]" />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between my-3 overflow-auto hide-scrollbar">
        <div className="flex-1 mt-8">
          <ul className="flex flex-col gap-6">
            {nabLinks.map((itm, idx) => (
              <li key={idx}>
                {location.pathname === itm.path ? (
                  <NavBtn
                    icon={itm.activeI}
                    title={itm.title}
                    path={itm.path}
                  />
                ) : (
                  <NavLink
                    to={itm.path}
                    className={"flex items-center gap-4 p-3"}
                  >
                    <Icon icon={itm.icon} width={32} height={32} />
                    <span className="text-xl">{itm.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
      <button
        onClick={handleLogout}
        className="
  group
  flex items-center justify-center gap-4
  bg-red-900 text-white text-2xl
  py-3 px-6 rounded-xl
  transition-all duration-700 ease-in-out
"
      >
        <Icon
          icon="heroicons-outline:logout"
          width={28}
          height={28}
          className="
      transition-transform duration-700 ease-in-out
      group-hover:translate-x-18
    "
        />

        <span
          className="
      transition-transform duration-700 ease-in-out
      group-hover:-translate-x-15
    "
        >
          Logout
        </span>
      </button>

      {/* Store Selector Dropdown */}
      {isStoreModalOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsStoreModalOpen(false)}></div>
          <div className="absolute top-[180px] left-5 right-5 z-20 bg-[#0F172B] border-2 border-[#2B7FFF33] rounded-xl shadow-2xl overflow-hidden">
            <div className="max-h-[300px] overflow-y-auto hide-scrollbar">
              {stores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => {
                    selectStore(store);
                    setIsStoreModalOpen(false);
                  }}
                  className={`p-3 cursor-pointer transition-all border-b border-[#2B7FFF10] last:border-0 ${selectedStore?.id === store.id
                    ? 'bg-[#2B7FFF20]'
                    : 'hover:bg-[#2B7FFF10]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-[#2B7FFF15] rounded-lg flex items-center justify-center shrink-0">
                      <Icon icon="mdi:map-marker" className="text-[#2B7FFF]" width={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium text-sm truncate">{store.name}</h3>
                        {selectedStore?.id === store.id && (
                          <Icon icon="mdi:check" className="text-[#2B7FFF]" width={16} />
                        )}
                      </div>
                      <p className="text-[#90A1B9] text-[10px] truncate">{store.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
