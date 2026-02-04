import React, { useEffect, useState, useRef, useContext } from "react";
import CallSearchFilter from "../components/CallSearchFilter";
import CallList from "../components/CallList";
import CallDetails from "../components/CallDetails";
import toast from "react-hot-toast";

import { getCallLogsApi } from "../libs/callLogs.api";
import { adaptCall } from "../utils/callAdapter";
import { AuthContext } from "../provider/AuthContext";

export default function CallLogs() {
  const { role, getActiveStoreId } = useContext(AuthContext);

  const storeId = getActiveStoreId(); // 🔥 GLOBAL STORE ID

  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const firstLoadRef = useRef(true);

  /* ================= FETCH CALLS ================= */
  const fetchCalls = async (params = {}) => {
    // ⛔ Super Admin must select store first
    if (role === "SUPER_ADMIN" && !storeId) return;
    if (!storeId) return;

    try {
      const res = await getCallLogsApi({
        store: storeId, // 🔥 STORE SCOPED
        ...params,
      });

      console.log("RAW API DATA:", res.data);

      const adaptedCalls = Array.isArray(res.data)
        ? res.data.map(adaptCall)
        : [];

      console.log("ADAPTED CALLS:", adaptedCalls);

      setCalls(adaptedCalls);

      // Auto-select only on first load
      if (firstLoadRef.current) {
        setSelectedCall(adaptedCalls[0] || null);
        firstLoadRef.current = false;
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load call logs");
    }
  };

  /* ================= INITIAL + STORE CHANGE ================= */
  useEffect(() => {
    // reset selection on store change
    firstLoadRef.current = true;
    setSelectedCall(null);
    setCalls([]);

    fetchCalls();
  }, [storeId]);

  /* ================= EMPTY STATE ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#90A1B9]">
        <p>Please select a store from the sidebar to view call logs.</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* ================= FILTER ================= */}
      <CallSearchFilter
        onSearch={(v) =>
          fetchCalls({ search: v || undefined })
        }
        onTypeChange={(v) =>
          fetchCalls({ call_type: v === "all" ? undefined : v })
        }
        onIssueChange={(v) =>
          fetchCalls({ issue: v === "all" ? undefined : v })
        }
        onDateChange={(v) =>
          fetchCalls({ date: v || undefined })
        }
      />

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col xl:flex-row gap-8 items-stretch">
        <div className="xl:w-[45%]">
          <CallList
            calls={calls}
            selectedId={selectedCall?.id}
            onSelect={setSelectedCall}
          />
        </div>

        <div className="xl:flex-1">
          <CallDetails call={selectedCall} />
        </div>
      </div>
    </div>
  );
}
