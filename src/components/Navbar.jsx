import { Icon } from "@iconify/react";
import { NavLink, useLocation } from "react-router-dom";
import NavBtn from "./NavBtn";

export default function Navbar() {
  const location = useLocation();
  const nabLinks = [
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
      activeI: "",
      activeI: "streamline-ultimate:data-transfer-circle-bold",
      path: "/call-transfer",
    },
    {
      title: "Pricing List",
      icon: "ph:currency-dollar-bold",
      activeI: "heroicons:currency-dollar-16-solid",
      path: "/pricing-list",
    },
    {
      title: "Appointments",
      icon: "hugeicons:appointment-01",
      activeI: "mingcute:schedule-fill",
      path: "/appointment",
    },
    {
      title: "Settings",
      icon: "qlementine-icons:settings-16",
      activeI: "clarity:settings-solid",
      path: "/setting",
    },
  ];
  return (
    <div className="w-full p-5 flex flex-col justify-between h-screen">
      <div className="flex items-center justify-center">
        <img src="/logo.png"></img>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 mt-16">
          <ul className="flex flex-col gap-6 ">
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

        <button className="flex items-center justify-center gap-4 bg-red-900 text-white text-2xl py-3 px-6 rounded-xl">
          <Icon icon={"heroicons-outline:logout"} width={28} height={28} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
