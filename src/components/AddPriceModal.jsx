import React, { useEffect, useState } from "react";
import {
  getCategoriesApi,
  getBrandsApi,
  getDeviceModelsApi,
  getRepairTypesApi,
  createPriceApi,
} from "../libs/pricing.api";

export default function AddPriceModal({ onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [repairTypes, setRepairTypes] = useState([]);

  const [form, setForm] = useState({
    category: "",
    brand: "",
    model: "",
    repairType: "",
    price: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    getCategoriesApi().then(res => setCategories(res.data));
    getRepairTypesApi().then(res => setRepairTypes(res.data));
  }, []);

  useEffect(() => {
    if (form.category) {
      getBrandsApi(form.category).then(res => setBrands(res.data));
    } else {
      setBrands([]);
    }
    setForm(f => ({ ...f, brand: "", model: "" }));
  }, [form.category]);

  useEffect(() => {
    if (form.brand) {
      getDeviceModelsApi(form.brand).then(res => setModels(res.data));
    } else {
      setModels([]);
    }
    setForm(f => ({ ...f, model: "" }));
  }, [form.brand]);

  const handleSubmit = async () => {
    if (!form.model || !form.repairType || !form.price) return;

    try {
      await createPriceApi({
        device_model: form.model,
        repair_type: form.repairType,
        price: form.price,
        status: form.status,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Create price failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1D293D] p-8 rounded-xl w-full max-w-3xl">
        <h3 className="text-white text-xl mb-6">Add New Price</h3>

        <div className="grid grid-cols-2 gap-4">
          <select onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="" className="bg-red-300">Select Category</option>
            {categories.map(c => (
              <option className="bg-black" key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select onChange={e => setForm({ ...form, brand: e.target.value })}>
            <option className="bg-red-300" value="">Select Brand</option>
            {brands.map(b => (
              <option className="bg-black" key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <select onChange={e => setForm({ ...form, model: e.target.value })}>
            <option className="bg-red-300" value="">Select Model</option>
            {models.map(m => (
              <option className="bg-black" key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <select onChange={e => setForm({ ...form, repairType: e.target.value })}>
            <option className="bg-red-300" value="">Select Repair Type</option>
            {repairTypes.map(r => (
              <option className="bg-black" key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price"
            onChange={e => setForm({ ...form, price: e.target.value })}
          />

          <select className="bg-black" onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#05DF72] py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
