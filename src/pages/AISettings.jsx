import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../provider/AuthContext";
import TimeSelector from "../components/TimeSelector";
import toast from "react-hot-toast";
import {
  getAIBehaviorApi,
  createAIBehaviorApi,
  updateAIBehaviorApi,
} from "../libs/aiBehavior.api";

/* ================= Helper Transformers ================= */

const dayMap = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

const reverseDayMap = Object.fromEntries(
  Object.entries(dayMap).map(([k, v]) => [v, k])
);

const toBusinessHoursArray = (businessHours) =>
  Object.entries(businessHours).map(([day, time]) => ({
    day: dayMap[day],
    is_open: time.start !== "---",
    open_time: time.start === "---" ? null : time.start,
    close_time: time.end === "---" ? null : time.end,
  }));

const fromBusinessHoursArray = (arr = []) => {
  const base = {
    monday: { start: "---", end: "---" },
    tuesday: { start: "---", end: "---" },
    wednesday: { start: "---", end: "---" },
    thursday: { start: "---", end: "---" },
    friday: { start: "---", end: "---" },
    saturday: { start: "---", end: "---" },
    sunday: { start: "---", end: "---" },
  };

  arr.forEach((b) => {
    const day = reverseDayMap[b.day];
    if (!day) return;

    base[day] = b.is_open
      ? { start: b.open_time, end: b.close_time }
      : { start: "---", end: "---" };
  });

  return base;
};

/* ================= Component ================= */

export default function AISettings() {
  const { getActiveStoreId } = useContext(AuthContext);
  const storeId = getActiveStoreId() || 1;

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [tone, setTone] = useState("friendly");

  const [greetings, setGreetings] = useState({
    opening: "",
    closed: "",
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { start: "---", end: "---" },
    tuesday: { start: "---", end: "---" },
    wednesday: { start: "---", end: "---" },
    thursday: { start: "---", end: "---" },
    friday: { start: "---", end: "---" },
    saturday: { start: "---", end: "---" },
    sunday: { start: "---", end: "---" },
  });

  const [escalation, setEscalation] = useState({
    retryAttempts: 3,
    fallbackResponse: "",
    keywords: [],
  });

  const [newKeyword, setNewKeyword] = useState("");

  const firstLoadRef = useRef(true);

  /* ================= LOAD CONFIG ================= */

  useEffect(() => {
    if (!storeId) return;

    loadConfig(!firstLoadRef.current);
    firstLoadRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const loadConfig = async (showToast = false) => {
    try {
      setLoading(true);

      const res = await getAIBehaviorApi(storeId);
      const data = res.data;

      setNotFound(false);

      setTone(data.tone || "friendly");

      setGreetings({
        opening: data.greetings?.opening_hours_greeting || "",
        closed: data.greetings?.closed_hours_message || "",
      });

      setBusinessHours(
        fromBusinessHoursArray(data.business_hours || [])
      );

      setEscalation({
        retryAttempts:
          data.retry_attempts_before_transfer || 3,
        fallbackResponse: data.fallback_response || "",
        keywords:
          data.auto_transfer_keywords?.map((k) => k.keyword) ||
          [],
      });

      if (showToast) {
        toast.success("AI settings updated for selected store");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
        if (showToast) {
          toast("No AI settings found for this store");
        }
      } else {
        console.error("Failed to load AI behavior", err);
        toast.error("Failed to load AI settings");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */

  const handleSaveSettings = async () => {
    if (!storeId) {
      toast.error("Please select a store first");
      return;
    }

    setLoading(true);
    try {
      const payload = buildPayload();

      if (notFound) {
        await createAIBehaviorApi(storeId, payload);
        setNotFound(false);
        toast.success("AI Settings created successfully ✅");
      } else {
        await updateAIBehaviorApi(storeId, payload);
        toast.success("AI Settings saved successfully ✅");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to save AI Settings ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAYLOAD ================= */

  const buildPayload = () => ({
    tone,
    retry_attempts_before_transfer: escalation.retryAttempts,
    fallback_response: escalation.fallbackResponse,
    greetings: {
      opening_hours_greeting: greetings.opening,
      closed_hours_message: greetings.closed,
    },
    business_hours: toBusinessHoursArray(businessHours),
    auto_transfer_keywords: [...new Set(escalation.keywords)].map(
      (k) => ({ keyword: k })
    ),
  });

  /* ================= KEYWORDS ================= */

  const handleAddKeyword = () => {
    const kw = newKeyword.trim().toLowerCase();
    if (!kw || escalation.keywords.includes(kw)) return;

    setEscalation({
      ...escalation,
      keywords: [...escalation.keywords, kw],
    });
    setNewKeyword("");
  };

  const handleRemoveKeyword = (kw) => {
    setEscalation({
      ...escalation,
      keywords: escalation.keywords.filter((k) => k !== kw),
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* Greetings */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] p-6 rounded-2xl">
          <h2 className="text-white font-bold mb-4">
            Greeting Scripts
          </h2>
          <textarea
            value={greetings.opening}
            onChange={(e) =>
              setGreetings({
                ...greetings,
                opening: e.target.value,
              })
            }
            className="w-full mb-3 p-4 rounded-xl border border-[#2B7FFF33]"
            placeholder="Opening greeting"
          />
          <textarea
            value={greetings.closed}
            onChange={(e) =>
              setGreetings({
                ...greetings,
                closed: e.target.value,
              })
            }
            className="w-full p-4 rounded-xl border border-[#2B7FFF33]"
            placeholder="Closed message"
          />
        </div>

        {/* Tone */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] p-6 rounded-2xl">
          <h2 className="text-white font-bold mb-4">Tone</h2>
          {["friendly", "professional", "sales"].map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`block w-full mb-2 p-3 rounded-xl cursor-pointer hover:bg-[#2B7FFF33] border border-[#2B7FFF33] ${
                tone === t
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

      </div>

      {/* Business Hours */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] p-6 rounded-2xl">
        <h2 className="text-white font-bold mb-4">
          Business Hours
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(businessHours).map(([day, times]) => (
            <div key={day}>
              <p className="text-white capitalize mb-1">
                {day}
              </p>
              <div className="flex gap-2">
                <TimeSelector
                  value={times.start}
                  onChange={(v) =>
                    setBusinessHours({
                      ...businessHours,
                      [day]: { ...times, start: v },
                    })
                  }
                />
                <TimeSelector
                  value={times.end}
                  onChange={(v) =>
                    setBusinessHours({
                      ...businessHours,
                      [day]: { ...times, end: v },
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] p-6 rounded-2xl">
        <h2 className="text-white font-bold mb-4">
          Escalation Rules
        </h2>

        <select
          value={escalation.retryAttempts}
          onChange={(e) =>
            setEscalation({
              ...escalation,
              retryAttempts: Number(e.target.value),
            })
          }
          className="mb-4 p-2 rounded-xl text-white cursor-pointer hover:bg-[#2B7FFF33] border border-[#2B7FFF33]"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} attempts
            </option>
          ))}
        </select>

        <textarea
          value={escalation.fallbackResponse}
          onChange={(e) =>
            setEscalation({
              ...escalation,
              fallbackResponse: e.target.value,
            })
          }
          className="w-full mb-4 p-4 rounded-xl border border-[#2B7FFF33]"
          placeholder="Fallback response"
        />

        <div className="flex gap-2 mb-3">
          <input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-[#2B7FFF33]"
            placeholder="Add keyword"
          />
          <button
            onClick={handleAddKeyword}
            className="bg-blue-600 text-white px-4 rounded-xl cursor-pointer hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {escalation.keywords.map((k) => (
            <span
              key={k}
              onClick={() => handleRemoveKeyword(k)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer"
            >
              {k} ✕
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveSettings}
        disabled={loading}
        className="w-full bg-green-500 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-green-600 disabled:bg-green-400"
      >
        {loading
          ? "Saving..."
          : notFound
          ? "Create AI Settings"
          : "Save AI Settings"}
      </button>
    </div>
  );
}
