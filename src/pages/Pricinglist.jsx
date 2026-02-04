import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AuthContext } from "../provider/AuthContext";
import AddPriceModal from "../components/AddPriceModal";
import {
  getCategoriesApi,
  getBrandsApi,
  getDeviceModelsApi,
  getRepairTypesApi,
  getPriceListApi,
  updatePriceApi,
} from "../libs/pricing.api";

export default function PricingList() {
  const { role, getActiveStoreId } = useContext(AuthContext);

  const storeId = getActiveStoreId(); // 🔥 GLOBAL STORE ID
  const isAdmin = role === "SUPER_ADMIN";

  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    model: "",
    repairType: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [repairTypes, setRepairTypes] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    getCategoriesApi().then((res) => setCategories(res.data || []));
    getRepairTypesApi().then((res) => setRepairTypes(res.data || []));
  }, []);

  /* ================= CATEGORY → BRANDS ================= */
  useEffect(() => {
    if (!filters.category) {
      setBrands([]);
      setModels([]);
      setFilters((f) => ({ ...f, brand: "", model: "" }));
      return;
    }

    getBrandsApi(filters.category).then((res) => {
      const validBrands = (res.data || []).filter(
        (b) => String(b.category) === String(filters.category)
      );
      setBrands(validBrands);
    });

    setFilters((f) => ({ ...f, brand: "", model: "" }));
  }, [filters.category]);

  /* ================= BRAND → MODELS ================= */
  useEffect(() => {
    if (!filters.brand) {
      setModels([]);
      setFilters((f) => ({ ...f, model: "" }));
      return;
    }

    getDeviceModelsApi(filters.brand).then((res) => {
      const validModels = (res.data || []).filter(
        (m) => String(m.brand) === String(filters.brand)
      );
      setModels(validModels);
    });

    setFilters((f) => ({ ...f, model: "" }));
  }, [filters.brand]);

  /* ================= FETCH PRICE LIST ================= */
  const fetchPriceList = async () => {
    // ⛔ Super Admin must select store first
    if (role === "SUPER_ADMIN" && !storeId) return;
    if (!storeId) return;

    try {
      setLoading(true);

      const res = await getPriceListApi({
        store: storeId, // 🔥 STORE SCOPED
        category: filters.category || undefined,
        brand: filters.brand || undefined,
        model: filters.model || undefined,
        repair_type: filters.repairType || undefined,
      });

      setPricingData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Price List Error:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STORE / FILTER CHANGE ================= */
  useEffect(() => {
    setPricingData([]);
    fetchPriceList();
  }, [storeId, filters]);

  /* ================= STATUS TOGGLE ================= */
  const toggleStatus = async (item) => {
    try {
      const newStatus =
        item.status === "ACTIVE" ? "DISABLED" : "ACTIVE";

      await updatePriceApi(item.id, {
        status: newStatus,
        store: storeId, // 🔥 ensure store aware
      });

      fetchPriceList();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EMPTY STATE ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#90A1B9]">
        <p>Please select a store from the sidebar to manage pricing.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-[#0A1230] via-[#0E1B4D] to-[#070E26] min-h-screen">
      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
          className="bg-[#0F1B3D] text-white px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Brand */}
        <select
          value={filters.brand}
          onChange={(e) =>
            setFilters({ ...filters, brand: e.target.value })
          }
          disabled={!filters.category}
          className="bg-[#0F1B3D] text-white px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">Brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Model */}
        <select
          value={filters.model}
          onChange={(e) =>
            setFilters({ ...filters, model: e.target.value })
          }
          disabled={!filters.brand}
          className="bg-[#0F1B3D] text-white px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">Model</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Repair Type */}
        <select
          value={filters.repairType}
          onChange={(e) =>
            setFilters({ ...filters, repairType: e.target.value })
          }
          className="bg-[#0F1B3D] text-white px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">Repair Type</option>
          {repairTypes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        {isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="ml-auto bg-[#2B7FFF] text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            <Icon icon="mdi:plus" />
            Add Price
          </button>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-[#0F1B3D80] rounded-2xl border border-[#2B7FFF33] overflow-hidden">
        <div className="grid grid-cols-7 text-[#9FB2FF] text-sm px-6 py-4 border-b border-[#2B7FFF33]">
          <div>Category</div>
          <div>Brand</div>
          <div>Model</div>
          <div>Repair</div>
          <div>Price</div>
          <div>Status</div>
          <div>Updated</div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-white">Loading...</div>
        ) : pricingData.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No price found for selected filters
          </div>
        ) : (
          pricingData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-7 items-center px-6 py-4 border-b border-[#2B7FFF20]"
            >
              <div className="text-white">{item.category_name}</div>
              <div className="text-white">{item.brand_name}</div>
              <div className="text-white">
                {item.device_model_name}
              </div>
              <div className="text-white">
                {item.repair_type_name}
              </div>
              <div className="text-white font-semibold">
                ${item.price}
              </div>

              <button
                onClick={() => toggleStatus(item)}
                className={`px-3 py-1 rounded-full text-xs ${
                  item.status === "ACTIVE"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-gray-600/20 text-gray-400"
                }`}
              >
                {item.status}
              </button>

              <div className="text-gray-400 text-sm">
                {new Date(item.updated_at)
                  .toISOString()
                  .split("T")[0]}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= ADD MODAL ================= */}
      {isAddModalOpen && (
        <AddPriceModal
          storeId={storeId}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchPriceList}
        />
      )}
    </div>
  );
}
