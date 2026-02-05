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

  const storeId = getActiveStoreId();

  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [loading, setLoading] = useState(false);

  const firstLoadRef = useRef(true);
  const prevStoreRef = useRef(null);

  /* ================= STORE CHANGE DETECT ================= */
  useEffect(() => {
    if (!storeId) return;

    if (
      prevStoreRef.current &&
      prevStoreRef.current !== storeId
    ) {
      toast.loading("Loading call logs for new store...", {
        id: "calllogs-store",
      });
    }

    prevStoreRef.current = storeId;
  }, [storeId]);

  /* ================= FETCH CALLS ================= */
  const fetchCalls = async (params = {}) => {
    if (role === "SUPER_ADMIN" && !storeId) return;
    if (!storeId) return;

    try {
      setLoading(true);

      const res = await getCallLogsApi({
        store: storeId, // 🔥 STORE SCOPED
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
        `Call logs loaded for ${selectedStore?.name || "store"}`,
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
    if (!storeId) return;

    // reset on store change
    firstLoadRef.current = true;
    setCalls([]);
    setSelectedCall(null);

    fetchCalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
