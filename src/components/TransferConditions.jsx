import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getTransferConditionsApi } from "../libs/callTransfer.api";

export default function TransferConditions({ rules = [] }) {
  const [conditions, setConditions] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConditions();
  }, []);

  // 🔥 Existing rules → pre-select
  useEffect(() => {
    const preset = new Set(
      rules
        .filter((r) => r.is_active)
        .map((r) => r.condition.id)
    );
    setSelectedConditions(preset);
  }, [rules]);

  const fetchConditions = async () => {
    try {
      setLoading(true);
      const res = await getTransferConditionsApi();
      setConditions(res.data || []);
    } catch {
      console.error("Failed to load transfer conditions");
    } finally {
      setLoading(false);
    }
  };

  const toggleCondition = (conditionId) => {
    const newSet = new Set(selectedConditions);
    if (newSet.has(conditionId)) {
      newSet.delete(conditionId);
    } else {
      newSet.add(conditionId);
    }
    setSelectedConditions(newSet);
  };

  return (
    <div className="bg-[#1D293D80] border-2 border-[#2B7FFF33] rounded-2xl p-8">
      <h2 className="text-xl font-medium text-white mb-8">
        Transfer Conditions
      </h2>

      <div className="space-y-4">
        {conditions.map((condition) => (
          <div
            key={condition.id}
            onClick={() => toggleCondition(condition.id)}
            className="flex items-center justify-between p-5 bg-[#1D293D80] border border-[#2B7FFF33] rounded-xl cursor-pointer hover:bg-[#2B7FFF33]"
          >
            <span className="text-white opacity-80">
              {condition.description || condition.condition}
            </span>

            <div
              className={`size-5 rounded border-2 flex items-center justify-center ${
                selectedConditions.has(condition.id)
                  ? "bg-[#2B7FFF] border-[#2B7FFF]"
                  : "border-[#2B7FFF33]"
              }`}
            >
              {selectedConditions.has(condition.id) && (
                <Icon icon="mdi:check" className="text-white" width={16} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
