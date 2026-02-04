import React, { useEffect, useState, useContext } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthContext";
import {
  getApiConfig,
  updateApiConfig,
} from "../libs/apiConfig.api";

export default function APISettings() {
  /* ================= STORE ================= */
  const { getActiveStoreId, role } = useContext(AuthContext);
  const storeId = getActiveStoreId(); // 🔥 GLOBAL STORE ID

  /* ================= STATE ================= */
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

  /* ================= STATIC ERROR LOGS (UI ONLY) ================= */
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
    loadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const loadConfig = async () => {
    try {
      setLoading(true);

      const res = await getApiConfig(storeId);
      const { ai_config, stt_config, api_key } = res.data || {};

      if (api_key?.key) setApiKey(api_key.key);

      if (ai_config) {
        setModelConfig({
          model: ai_config.model ?? "GPT-40 (Recommend)",
          temperature: ai_config.temperature ?? 0.7,
          maxTokens: ai_config.max_tokens ?? 150,
        });

        setPerformance({
          timeout: ai_config.timeout ?? 10,
          retryAttempts: ai_config.retry_attempts ?? 2,
          voiceProvider:
            ai_config.voice_provider ?? "Eleven Labs",
        });
      }

      if (stt_config) {
        setSTTSettings({
          provider:
            stt_config.provider ?? "Google Speech-to-Text",
          language: stt_config.language ?? "English",
          punctuation:
            stt_config.punctuation ?? true,
          noiseSuppression:
            stt_config.noise_suppression ?? false,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load API config");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLERS ================= */

  const handleSaveKey = async () => {
    if (!storeId) {
      toast.error("Please select a store first");
      return;
    }

    try {
      await updateApiConfig(storeId, {
        api_key: { key: apiKey },
      });
      toast.success("API key saved ✅");
    } catch {
      toast.error("Failed to save API key ❌");
    }
  };

  const handleTestConnection = () => {
    toast(
      "Test connection endpoint backend এ এখনো implement করা হয়নি"
    );
  };

  const handleSaveSettings = async () => {
    if (!storeId) {
      toast.error("Please select a store first");
      return;
    }

    try {
      const payload = {
        api_key: {
          key: apiKey,
        },
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
      };

      await updateApiConfig(storeId, payload);
      toast.success("Settings saved successfully ✅");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to save settings ❌");
    }
  };

  /* ================= GUARD ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="p-10 text-center text-[#90A1B9]">
        <h2 className="text-xl font-bold mb-2">
          No store selected
        </h2>
        <p>Please select a store to configure API settings.</p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8">
      {/* API Key Management */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon
            icon="mdi:key-variant"
            className="text-[#2B7FFF]"
            width={24}
          />
          <h2 className="text-xl font-bold text-white">
            API Key Management
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
              Vapi API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 pr-12 text-white text-sm"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#90A1B9]"
              >
                <Icon
                  icon={showKey ? "mdi:eye-off" : "mdi:eye"}
                  width={20}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveKey}
              className="bg-[#05DF72] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <Icon icon="mdi:content-save" width={18} />
              Save Key
            </button>

            <button
              onClick={handleTestConnection}
              className="bg-[#1D293D] border border-[#2B7FFF33] text-white px-6 py-3 rounded-xl"
            >
              Test Connection
            </button>
          </div>
        </div>
      </div>

      {/* ERROR LOGS */}
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
                <p className="text-white text-sm">
                  {log.message}
                </p>
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
        className="w-full bg-[#05DF72] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:content-save" width={20} />
        Save Settings
      </button>
    </div>
  );
}
