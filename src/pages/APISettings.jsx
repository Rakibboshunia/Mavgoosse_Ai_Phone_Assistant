import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function APISettings() {
  const [apiKey, setApiKey] = useState("vapi_sk_••••••••••••••••••••••••••");
  const [showKey, setShowKey] = useState(false);

  const [modelConfig, setModelConfig] = useState({
    model: "GPT-40 (Recommend)",
    temperature: 0.7,
    maxTokens: 150,
  });

  const [performance, setPerformance] = useState({
    timeout: 10,
    retryAttempts: "2 attempts",
    voiceProvider: "Eleven Labs",
  });

  const [sttSettings, setSTTSettings] = useState({
    provider: "Google Speech-to-Text",
    language: "English",
    punctuation: true,
    noiseSuppression: false,
  });

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

  const handleSaveKey = () => {
    console.log("Saving API key");
  };

  const handleTestConnection = () => {
    console.log("Testing connection");
  };

  const handleSaveSettings = () => {
    console.log("Saving all settings");
  };

  return (
    <div className="p-6 space-y-8">
      {/* API Key Management */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="mdi:key-variant" className="text-[#2B7FFF]" width={24} />
          <h2 className="text-xl font-bold text-white">API Key Management</h2>
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
                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 pr-12 text-white text-sm focus:border-[#2B7FFF] focus:outline-none"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#90A1B9] hover:text-white transition-colors"
              >
                <Icon icon={showKey ? "mdi:eye-off" : "mdi:eye"} width={20} />
              </button>
            </div>
            <p className="text-[#90A1B9] text-xs mt-2">
              Keep this key secure, never share it publicly
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveKey}
              className="bg-[#05DF72] hover:bg-[#05DF72CC] text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <Icon icon="mdi:content-save" width={18} />
              Save Key
            </button>
            <button
              onClick={handleTestConnection}
              className="bg-[#1D293D] border border-[#2B7FFF33] text-white px-6 py-3 rounded-xl hover:bg-[#2B7FFF15] transition-all"
            >
              Test Connection
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Model Configuration */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon icon="mdi:brain" className="text-[#2B7FFF]" width={24} />
            <h2 className="text-xl font-bold text-white">
              Model Configuration
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                AI Model Version
              </label>
              <select
                value={modelConfig.model}
                onChange={(e) =>
                  setModelConfig({ ...modelConfig, model: e.target.value })
                }
                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
              >
                <option>GPT-40 (Recommend)</option>
                <option>GPT-3.5 Turbo</option>
                <option>GPT-4</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[#90A1B9] text-sm font-medium">
                  Temperature: {modelConfig.temperature}
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={modelConfig.temperature}
                onChange={(e) =>
                  setModelConfig({
                    ...modelConfig,
                    temperature: parseFloat(e.target.value),
                  })
                }
                style={{ "--value": `${(modelConfig.temperature / 1) * 100}%` }}
                className="w-full slider"
              />
              <div className="flex justify-between text-xs text-[#90A1B9] mt-1">
                <span>More Precise</span>
                <span>More Creative</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[#90A1B9] text-sm font-medium">
                  Max Tokens: {modelConfig.maxTokens}
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={modelConfig.maxTokens}
                onChange={(e) =>
                  setModelConfig({
                    ...modelConfig,
                    maxTokens: parseInt(e.target.value),
                  })
                }
                style={{ "--value": `${(modelConfig.maxTokens / 500) * 100}%` }}
                className="w-full slider"
              />
              <div className="flex justify-between text-xs text-[#90A1B9] mt-1">
                <span>Shorter Responses</span>
                <span>Longer Responses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Settings */}
        <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon
              icon="mdi:lightning-bolt"
              className="text-[#FF8904]"
              width={24}
            />
            <h2 className="text-xl font-bold text-white">
              Performance Settings
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                Response Timeout (seconds)
              </label>
              <input
                type="number"
                value={performance.timeout}
                onChange={(e) =>
                  setPerformance({
                    ...performance,
                    timeout: parseInt(e.target.value),
                  })
                }
                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                Retry Attempts on Failure
              </label>
              <select
                value={performance.retryAttempts}
                onChange={(e) =>
                  setPerformance({
                    ...performance,
                    retryAttempts: e.target.value,
                  })
                }
                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
              >
                <option>1 attempt</option>
                <option>2 attempts</option>
                <option>3 attempts</option>
                <option>4 attempts</option>
              </select>
            </div>

            <div>
              <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
                Voice Provider
              </label>
              <select
                value={performance.voiceProvider}
                onChange={(e) =>
                  setPerformance({
                    ...performance,
                    voiceProvider: e.target.value,
                  })
                }
                className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
              >
                <option>Eleven Labs</option>
                <option>Google TTS</option>
                <option>Amazon Polly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Speech-to-Text Settings */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="mdi:microphone" className="text-[#05DF72]" width={24} />
          <h2 className="text-xl font-bold text-white">
            Speech-to-Text Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
              STT Provider
            </label>
            <select
              value={sttSettings.provider}
              onChange={(e) =>
                setSTTSettings({ ...sttSettings, provider: e.target.value })
              }
              className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
            >
              <option>Google Speech-to-Text</option>
              <option>Azure Speech</option>
              <option>AWS Transcribe</option>
            </select>
          </div>

          <div>
            <label className="text-[#90A1B9] text-sm font-medium mb-2 block">
              Language Model
            </label>
            <select
              value={sttSettings.language}
              onChange={(e) =>
                setSTTSettings({ ...sttSettings, language: e.target.value })
              }
              className="w-full bg-[#0F172B60] border-2 border-[#2B7FFF15] rounded-xl px-4 py-3 text-white focus:border-[#2B7FFF] focus:outline-none"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={sttSettings.punctuation}
              onChange={(e) =>
                setSTTSettings({
                  ...sttSettings,
                  punctuation: e.target.checked,
                })
              }
              className="size-5 bg-[#0F172B60] border-2 border-[#2B7FFF33] rounded checked:bg-[#2B7FFF] checked:border-[#2B7FFF] focus:outline-none cursor-pointer"
            />
            <div>
              <p className="text-white font-medium">
                Enable Punctuation Auto-correction
              </p>
              <p className="text-[#90A1B9] text-xs">
                Improves transcription accuracy
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={sttSettings.noiseSuppression}
              onChange={(e) =>
                setSTTSettings({
                  ...sttSettings,
                  noiseSuppression: e.target.checked,
                })
              }
              className="size-5 bg-[#0F172B60] border-2 border-[#2B7FFF33] rounded checked:bg-[#2B7FFF] checked:border-[#2B7FFF] focus:outline-none cursor-pointer"
            />
            <div>
              <p className="text-white font-medium">
                Background Noise Suppression
              </p>
              <p className="text-[#90A1B9] text-xs">
                Filter out background noise during calls
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Error Logs */}
      <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon
            icon="mdi:alert-circle-outline"
            className="text-[#FF2056]"
            width={24}
          />
          <h2 className="text-xl font-bold text-white">Error Logs</h2>
        </div>

        <div className="space-y-3">
          {errorLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-[#0F172B60] border border-[#2B7FFF15] rounded-xl"
            >
              <Icon
                icon={log.type === "warning" ? "mdi:alert" : "mdi:close-circle"}
                className={
                  log.type === "warning" ? "text-[#FF8904]" : "text-[#FF2056]"
                }
                width={20}
              />
              <div className="flex-1">
                <p className="text-white text-sm">{log.message}</p>
                <p className="text-[#90A1B9] text-xs mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Settings Button */}
      <button
        onClick={handleSaveSettings}
        className="w-full bg-[#05DF72] hover:bg-[#05DF72CC] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:content-save" width={20} />
        Save Settings
      </button>
    </div>
  );
}
