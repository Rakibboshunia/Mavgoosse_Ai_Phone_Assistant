import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { useEffect } from "react";

export default function DashboardLayout() {
  const Navigate = useNavigate();

  useEffect(() => {
    Navigate("/dashboard");
  }, [Navigate]);
  return (
    <div className="grid grid-cols-[300px_1fr] grid-rows-[90px_1fr] h-screen">
      <aside className="row-span-4 h-screen bg-[#111B3C] border-r-2 border-[#2B7FFF33]">
        <Navbar />
      </aside>

      <header className="flex items-center px-6 py-8 bg-[#111B3C] ">
        <Topbar />
      </header>

      <main className="bg-[#162456] p-6 overflow-y-auto hide-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
