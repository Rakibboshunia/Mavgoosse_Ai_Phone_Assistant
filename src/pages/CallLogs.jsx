import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import toast from "react-hot-toast";

import CallSearchFilter from "../components/CallSearchFilter";
import CallList from "../components/CallList";
import CallDetails from "../components/CallDetails";

import { getCallLogsApi } from "../libs/callLogs.api";
import { adaptCall } from "../utils/callAdapter";
import { AuthContext } from "../provider/AuthContext";

export default function CallLogs() {
  const { role, getActiveStoreId, selectedStore } =
    useContext(AuthContext);

  // ✅ DEFAULT STORE ID = 1
  const activeStoreId = getActiveStoreId() || 1;

  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [loading, setLoading] = useState(false);

  const firstLoadRef = useRef(true);
  const prevStoreRef = useRef(null);

  /* ================= STORE CHANGE DETECT ================= */
  useEffect(() => {
    if (!activeStoreId) return;

    if (
      prevStoreRef.current &&
      prevStoreRef.current !== activeStoreId
    ) {
      toast.loading("Loading call logs for new store...", {
        id: "calllogs-store",
      });
    }

    prevStoreRef.current = activeStoreId;
  }, [activeStoreId]);

  /* ================= FETCH CALLS ================= */
  const fetchCalls = async (params = {}) => {
    if (!activeStoreId) return;

    try {
      setLoading(true);

      const res = await getCallLogsApi({
        store: activeStoreId, // 🔥 STORE SCOPED
        ...params,
      });

      const adaptedCalls = Array.isArray(res.data)
        ? res.data.map(adaptCall)
        : [];

      setCalls(adaptedCalls);

      // Auto-select first call on fresh load
      if (firstLoadRef.current) {
        setSelectedCall(adaptedCalls[0] || null);
        firstLoadRef.current = false;
      }

      toast.success(
        `Call logs loaded for ${selectedStore?.name || "Store 1"}`,
        { id: "calllogs-store" }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load call logs", {
        id: "calllogs-store",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL + STORE CHANGE ================= */
  useEffect(() => {
    if (!activeStoreId) return;

    // reset on store change
    firstLoadRef.current = true;
    setCalls([]);
    setSelectedCall(null);

    fetchCalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStoreId]);

  return (
    <div className="p-2">
      {/* ================= FILTER ================= */}
      <CallSearchFilter
        onSearch={(v) =>
          fetchCalls({ search: v || undefined })
        }
        onTypeChange={(v) =>
          fetchCalls({
            call_type: v === "all" ? undefined : v,
          })
        }
        onIssueChange={(v) =>
          fetchCalls({
            issue: v === "all" ? undefined : v,
          })
        }
        onDateChange={(v) =>
          fetchCalls({ date: v || undefined })
        }
      />

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center text-[#90A1B9] py-6">
          Loading call logs...
        </div>
      )}

      {/* ================= CONTENT ================= */}
      {!loading && (
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
      )}
    </div>
  );
}
