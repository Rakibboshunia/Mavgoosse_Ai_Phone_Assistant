import { useEffect, useState, useContext, useRef } from "react";
import toast from "react-hot-toast";

import DashboardStatus from "../components/DashboardStatus";
import DropDown from "../components/DropDown";
import Graph from "../components/Graph";

import {
  getCallTrendsApi,
  getStoreSummaryApi,
} from "../libs/callDashboard.api";

import { AuthContext } from "../provider/AuthContext";

export default function Dashboard() {
  const { getActiveStoreId, selectedStore } =
    useContext(AuthContext);

  // ✅ DEFAULT STORE ID = 1 (if none selected)
  const activeStoreId = getActiveStoreId() || 1;

  const [selectedTime, setSelectedTime] = useState("today");
  const [loading, setLoading] = useState(false);

  const [trendData, setTrendData] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [storeSummary, setStoreSummary] = useState(null);

  const prevStoreRef = useRef(null);

  // ✅ Backend supported range values
  const options = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "this-week" },
    { label: "This Month", value: "this-month" },
    { label: "This Year", value: "this-year" },
  ];

  /* ================= STORE CHANGE DETECT ================= */
  useEffect(() => {
    if (!activeStoreId) return;

    if (prevStoreRef.current && prevStoreRef.current !== activeStoreId) {
      toast.loading("Switching store...", { id: "store-change" });
    }

    prevStoreRef.current = activeStoreId;
  }, [activeStoreId]);

  /* ================= FETCH DASHBOARD ================= */
  useEffect(() => {
    if (!activeStoreId) return;

    fetchDashboardData(activeStoreId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStoreId, selectedTime]);

  const fetchDashboardData = async (storeId) => {
    try {
      setLoading(true);

      const [trendRes, summaryRes] = await Promise.all([
        getCallTrendsApi(storeId, { range: selectedTime }),
        getStoreSummaryApi(storeId, { range: selectedTime }),
      ]);

      // ✅ Backend trend structure
      setTrendData(trendRes?.data?.trend || []);
      setTotalCalls(trendRes?.data?.total_calls || 0);

      // Backend summary returns object OR array[0]
      const summaryData = Array.isArray(summaryRes?.data)
        ? summaryRes?.data[0]
        : summaryRes?.data;

      setStoreSummary(summaryData || null);

      toast.success(
        `Dashboard loaded for ${selectedStore?.name || "Store 1"}`,
        { id: "store-change" }
      );
    } catch (error) {
      console.error("Dashboard API Error:", error);
      toast.error("Failed to load dashboard data", {
        id: "store-change",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRangeLabel = () => {
    const found = options.find((opt) => opt.value === selectedTime);
    return found ? found.label : "Today";
  };

  return (
    <div>
      {/* ================= STATUS CARDS ================= */}
      <div className="grid grid-cols-3 gap-6 pb-4">
        <DashboardStatus
          title="Total Calls"
          value={storeSummary?.total_calls ?? 0}
          icone="line-md:phone"
          styls="from-[#00B8DB] to-[#2B7FFF]"
        />

        <DashboardStatus
          title="AI-Handled Calls"
          value={storeSummary?.ai_handled ?? 0}
          icone="bx:bot"
          styls="from-[#AD46FF] to-[#F6339A]"
        />

        <DashboardStatus
          title="Warm Transfers"
          value={storeSummary?.warm_transfers ?? 0}
          icone="fluent:arrow-wrap-20-filled"
          styls="from-[#FB2C36] to-[#FF6900]"
        />

        <DashboardStatus
          title="Appointments Booked"
          value={storeSummary?.appointments_booked ?? 0}
          icone="uil:schedule"
          styls="from-[#00BC7D] to-[#00C950]"
        />

        <DashboardStatus
          title="Missed Calls"
          value={storeSummary?.missed_calls ?? 0}
          icone="oui:cross-in-circle-empty"
          styls="from-[#FF2056] to-[#FB2C36]"
        />

        <DashboardStatus
          title="Avg Call Duration"
          value={storeSummary?.avg_call_duration ?? 0}
          icone="teenyicons:stopwatch-outline"
          styls="from-[#2B7FFF] to-[#615FFF]"
        />
      </div>

      {/* ================= CALL TREND GRAPH ================= */}
      <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] p-8 rounded-2xl">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h3 className="text-xl">
              Call Trends - {getRangeLabel()}
            </h3>
            <p className="text-sm text-[#90A1B9] pt-3">
              Total: {totalCalls} calls
            </p>
          </div>

          <DropDown
            options={options}
            value={selectedTime}
            onChange={setSelectedTime}
          />
        </div>

        <Graph data={trendData} loading={loading} />
      </div>
    </div>
  );
}
