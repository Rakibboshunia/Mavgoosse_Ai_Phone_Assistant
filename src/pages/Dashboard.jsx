import { useState } from "react";
import DashboardStatus from "../components/DashboardStatus";
import DropDown from "../components/DropDown";
import Graph from "../components/Graph";
import NotificationCard from "../components/NotificatonCard"
import TopRepairRequests from "../components/TopRepairRequests";

export default function Dashboard() {
  const [selectedTime, setSelectedTime] = useState("today");
  const options = [
    { label: "Today", value: "today" },
    { label: "Past Week", value: "past-week" },
    { label: "Last Year", value: "last-year" },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 pb-4">
        <DashboardStatus
          title={"Total Calls Today"}
          value={127}
          icone={"line-md:phone"}
          parsent={12}
          styls="from-[#00B8DB] to-[#2B7FFF]"
        />
        <DashboardStatus
          title={"AI-Handled Calls"}
          value={99}
          icone={"bx:bot"}
          parsent={77}
          styls="from-[#AD46FF] to-[#F6339A]"
        />
        <DashboardStatus
          title={"Warm Transfer"}
          value={22}
          icone={"fluent:arrow-wrap-20-filled"}
          parsent={18}
          styls="from-[#FB2C36] to-[#FF6900]"
        />
        <DashboardStatus
          title={"Appointments Booked"}
          value={34}
          icone={"uil:schedule"}
          parsent={8}
          styls="from-[#00BC7D] to-[#00C950]"
        />
        <DashboardStatus
          title={"Missed/Failed Calls"}
          value={6}
          icone={"oui:cross-in-circle-empty"}
          parsent={3}
          styls="from-[#FF2056] to-[#FB2C36]"
        />
        <DashboardStatus
          title={"Avg Call Duration"}
          value={"3:42"}
          icone={"teenyicons:stopwatch-outline"}
          parsent={15}
          styls="from-[#2B7FFF] to-[#615FFF]"
        />
      </div>

      <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] p-8 rounded-2xl">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h3 className="text-xl">Call Trends - This Week</h3>
            <p className="text-sm text-[#90A1B9] pt-3">Total: 472 calls</p>
          </div>
          <DropDown
            options={options}
            value={selectedTime}
            onChange={setSelectedTime}
          />
        </div>

        <Graph />
      </div>

      <div className="flex items-stretch justify-center gap-x-8 mt-8">
        <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] p-8 rounded-2xl w-1/2">
          <h2 className="text-xl mb-4">Recent Activity</h2>

          <NotificationCard title={"AI booked appointment for iPhone 13 screen repair"} time={"2 min ago"} style={"bg-[#05DF72]"} />
          <NotificationCard title={"Warm transfer to technician - Software issue"} time={"5 min ago"} style={"bg-[#FF8904]"} />
          <NotificationCard title={"Quote provided for iPad battery replacement"} time={"8 min ago"} style={"bg-[#05DF72]"} />
          <NotificationCard title={"Call dropped after 12 seconds"} time={"15 min ago"} style={"bg-[#FF6467]"} />

        </div>


        <div className="w-1/2">
          <TopRepairRequests />
        </div>
      </div>
    </div>
  );
}
