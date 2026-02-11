import React, { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { updatePriceApi } from "../libs/pricing.api";

export default function EditPriceModal({
  item,
  storeId,
  onClose,
  onSuccess,
}) {
  const [price, setPrice] = useState(item.price);
  const [status, setStatus] = useState(item.status);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      await updatePriceApi(
        item.id,
        { price, status },
        storeId
      );

      toast.success("Price updated successfully");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md bg-[#1E2A44] rounded-2xl p-6 border border-[#2B7FFF40] shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="mdi:pencil" className="text-[#2B7FFF]" width={22} />
          <h2 className="text-lg font-semibold text-white">
            Edit Price
          </h2>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Price
          </label>
          <div className="flex items-center bg-[#0F1B3D] rounded-lg px-3">
            <span className="text-gray-400 mr-2">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent py-3 text-white outline-none"
            />
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#0F1B3D] text-white px-4 py-3 rounded-lg outline-none cursor-pointer"
          >
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-[#0F1B3D] text-gray-300 hover:bg-[#16244D] cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-[#2B7FFF] text-white hover:bg-[#2B7FFFCC] cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
