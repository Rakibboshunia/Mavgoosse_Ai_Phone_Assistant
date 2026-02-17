import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import {
  getCategoriesApi,
  getBrandsApi,
  getDeviceModelsApi,
  getRepairTypesApi,
  createPriceApi,
} from "../libs/pricing.api";
import { AuthContext } from "../provider/AuthContext";

export default function AddPriceModal({ onClose, onSuccess }) {
  const { getActiveStoreId } = useContext(AuthContext);
  const storeId = getActiveStoreId();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [repairTypes, setRepairTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    brand: "",
    model: "",
    repairType: "",
    price: "",
    status: "ACTIVE",
  });

  /* ================= LOAD ================= */
  useEffect(() => {
    getCategoriesApi().then((res) => setCategories(res.data || []));
    getRepairTypesApi().then((res) => setRepairTypes(res.data || []));
  }, []);

  useEffect(() => {
    if (!form.category) {
      setBrands([]);
      return;
    }
    getBrandsApi(form.category).then((res) =>
      setBrands(res.data || [])
    );
  }, [form.category]);

  useEffect(() => {
    if (!form.brand) {
      setModels([]);
      return;
    }
    getDeviceModelsApi(form.brand).then((res) =>
      setModels(res.data || [])
    );
  }, [form.brand]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!storeId) {
      toast.error("Please select a store first");
      return;
    }

    if (!form.model || !form.repairType || !form.price) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createPriceApi({
        store: storeId,
        device_model: form.model,
        repair_type: form.repairType,
        price: Number(form.price),
        status: form.status,
      });

      toast.success("Price added successfully");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Failed to add price");
    } finally {
      setLoading(false);
    }
  };

  /* ================= COMMON INPUT STYLE ================= */
  const inputStyle =
    "w-full bg-[#0F172B] border border-[#2B7FFF33] text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#2B7FFF]";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1D293D] p-8 rounded-xl w-full max-w-3xl">
        <h3 className="text-white text-xl mb-6">
          Add New Price
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className={inputStyle}
          >
            <option value="" className="text-white">
              Select Category
            </option>
            {categories.map((c) => (
              <option
                key={c.id}
                value={c.id}
                className="text-white"
              >
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.brand}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value })
            }
            className={inputStyle}
          >
            <option value="" className="text-white">
              Select Brand
            </option>
            {brands.map((b) => (
              <option
                key={b.id}
                value={b.id}
                className="text-white"
              >
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={form.model}
            onChange={(e) =>
              setForm({ ...form, model: e.target.value })
            }
            className={inputStyle}
          >
            <option value="" className="text-white">
              Select Model
            </option>
            {models.map((m) => (
              <option
                key={m.id}
                value={m.id}
                className="text-white"
              >
                {m.name}
              </option>
            ))}
          </select>

          <select
            value={form.repairType}
            onChange={(e) =>
              setForm({
                ...form,
                repairType: e.target.value,
              })
            }
            className={inputStyle}
          >
            <option value="" className="text-white">
              Select Repair Type
            </option>
            {repairTypes.map((r) => (
              <option
                key={r.id}
                value={r.id}
                className="text-white"
              >
                {r.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            className={inputStyle}
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className={inputStyle}
          >
            <option value="ACTIVE" className="text-white">
              Active
            </option>
            <option value="DISABLED" className="text-white">
              Disabled
            </option>
          </select>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="flex-1 bg-[#05DF72] text-white py-2 rounded hover:bg-[#05DF72CC] cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-500 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
