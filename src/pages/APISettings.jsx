import React, { useEffect, useState, useContext, useRef } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthContext";
import {
  getApiConfig,
  updateApiConfig,
} from "../libs/apiConfig.api";

export default function APISettings() {
  const { getActiveStoreId, role } = useContext(AuthContext);
  const storeId = getActiveStoreId();

  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const [modelConfig, setModelConfig] = useState({
    model: "GPT-40 (Recommend)",
    temperature: 0.7,
    maxTokens: 150,
  });

  const [performance, setPerformance] = useState({
    timeout: 10,
    retryAttempts: 2,
    voiceProvider: "Eleven Labs",
  });

  const [sttSettings, setSTTSettings] = useState({
    provider: "Google Speech-to-Text",
    language: "English",
    punctuation: true,
    noiseSuppression: false,
  });

  const [loading, setLoading] = useState(false);
  const firstLoadRef = useRef(true);

  /* ================= ERROR LOGS (UI ONLY – SAME AS BEFORE) ================= */
  const errorLogs = [
    {
      type: "warning",
      message: "API timeout - retry successful",
      time: "2025-12-18 10:23:45",
    },
    {
      type: "warning",
      message: "STT processing delay - 2.3s",
      time: "2025-12-18 09:15:22",
    },
    {
      type: "error",
      message: "Rate limit reached - waiting",
      time: "2025-12-17 16:48:01",
    },
  ];

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

      const res = await getApiConfig(storeId);
      const { ai_config, stt_config, api_key } = res.data || {};

      setApiKey(api_key?.key || "");

      if (ai_config) {
        setModelConfig({
          model: ai_config.model ?? "GPT-40 (Recommend)",
          temperature: ai_config.temperature ?? 0.7,
          maxTokens: ai_config.max_tokens ?? 150,
        });

        setPerformance({
          timeout: ai_config.timeout ?? 10,
          retryAttempts: ai_config.retry_attempts ?? 2,
          voiceProvider: ai_config.voice_provider ?? "Eleven Labs",
        });
      }

      if (stt_config) {
        setSTTSettings({
          provider: stt_config.provider ?? "Google Speech-to-Text",
          language: stt_config.language ?? "English",
          punctuation: stt_config.punctuation ?? true,
          noiseSuppression: stt_config.noise_suppression ?? false,
        });
      }

      if (showToast) {
        toast.success("API settings updated for selected store");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load API config");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */

  const handleSaveKey = async () => {
    if (!storeId) return toast.error("Please select a store first");
    try {
      setLoading(true);
      await updateApiConfig(storeId, { api_key: { key: apiKey } });
      toast.success("API key saved ✅");
    } catch {
      toast.error("Failed to save API key ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = () => {
    toast("Test connection backend এ এখনো implement করা হয়নি");
  };

  const handleSaveSettings = async () => {
    if (!storeId) return toast.error("Please select a store first");

    try {
      setLoading(true);
      await updateApiConfig(storeId, {
        api_key: { key: apiKey },
        ai_config: {
          model: modelConfig.model,
          temperature: modelConfig.temperature,
          max_tokens: modelConfig.maxTokens,
          timeout: performance.timeout,
          retry_attempts: performance.retryAttempts,
          voice_provider: performance.voiceProvider,
        },
        stt_config: {
          provider: sttSettings.provider,
          language: sttSettings.language,
          punctuation: sttSettings.punctuation,
          noise_suppression: sttSettings.noiseSuppression,
        },
      });
      toast.success("Settings saved successfully ✅");
    } catch (err) {
      toast.error("Failed to save settings ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GUARD ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="p-10 text-center text-[#90A1B9]">
        <h2 className="text-xl font-bold mb-2">No store selected</h2>
        <p>Please select a store to configure API settings.</p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8">
      {/* API KEY */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          API Key Management
        </h2>

        <div className="relative mb-4">
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            placeholder="Enter your API key"
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 pr-12 text-white"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#90A1B9]"
          >
            <Icon icon={showKey ? "mdi:eye-off" : "mdi:eye"} width={20} />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSaveKey}
            disabled={loading}
            className="bg-[#05DF72] px-6 py-3 rounded-xl text-white cursor-pointer hover:bg-[#05DF72CC] disabled:bg-[#05DF7299]"
          >
            Save Key
          </button>
          <button
            onClick={handleTestConnection}
            className="bg-[#1D293D] border border-[#2B7FFF33] px-6 py-3 rounded-xl text-white"
          >
            Test Connection
          </button>
        </div>
      </div>

      {/* 🔥 ERROR LOGS – SAME AS BEFORE */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon
            icon="mdi:alert-circle-outline"
            className="text-[#FF2056]"
            width={24}
          />
          <h2 className="text-xl font-bold text-white">
            Error Logs
          </h2>
        </div>

        <div className="space-y-3">
          {errorLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-[#0F172B60] border border-[#2B7FFF15] rounded-xl"
            >
              <Icon
                icon={
                  log.type === "warning"
                    ? "mdi:alert"
                    : "mdi:close-circle"
                }
                className={
                  log.type === "warning"
                    ? "text-[#FF8904]"
                    : "text-[#FF2056]"
                }
                width={20}
              />
              <div className="flex-1">
                <p className="text-white text-sm">{log.message}</p>
                <p className="text-[#90A1B9] text-xs mt-1">
                  {log.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveSettings}
        disabled={loading}
        className="w-full bg-[#05DF72] py-4 rounded-xl text-white font-bold cursor-pointer hover:bg-[#05DF72CC] disabled:bg-[#05DF7299]"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
