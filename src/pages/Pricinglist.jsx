import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import { AuthContext } from "../provider/AuthContext";
import AddPriceModal from "../components/AddPriceModal";
import EditPriceModal from "../components/EditPriceModal";
import Pagination from "../components/Pagination";

import {
  getCategoriesApi,
  getBrandsApi,
  getDeviceModelsApi,
  getRepairTypesApi,
  getPriceListApi,
  updatePriceApi,
} from "../libs/pricing.api";

export default function PricingList() {
  const { role, getActiveStoreId, selectedStore } =
    useContext(AuthContext);

  const storeId = getActiveStoreId() || 1;
  const isAdmin = role === "SUPER_ADMIN";

  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const prevStoreRef = useRef(null);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] =
    useState(1);
  const itemsPerPage = 10;

  /* ================= STORE CHANGE ================= */
  useEffect(() => {
    if (!storeId) return;

    if (
      prevStoreRef.current &&
      prevStoreRef.current !== storeId
    ) {
      toast.loading(
        "Loading pricing for new store...",
        { id: "pricing-store" }
      );
    }

    prevStoreRef.current = storeId;
  }, [storeId]);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    getCategoriesApi().then((res) =>
      setCategories(res.data || [])
    );
    getRepairTypesApi().then((res) =>
      setRepairTypes(res.data || [])
    );
  }, []);

  /* ================= CATEGORY → BRAND ================= */
  useEffect(() => {
    if (!filters.category) {
      setBrands([]);
      setModels([]);
      setFilters((f) => ({
        ...f,
        brand: "",
        model: "",
      }));
      return;
    }

    getBrandsApi(filters.category).then(
      (res) => {
        const validBrands =
          (res.data || []).filter(
            (b) =>
              String(b.category) ===
              String(filters.category)
          );
        setBrands(validBrands);
      }
    );

    setFilters((f) => ({
      ...f,
      brand: "",
      model: "",
    }));
  }, [filters.category]);

  /* ================= BRAND → MODEL ================= */
  useEffect(() => {
    if (!filters.brand) {
      setModels([]);
      setFilters((f) => ({
        ...f,
        model: "",
      }));
      return;
    }

    getDeviceModelsApi(filters.brand).then(
      (res) => {
        const validModels =
          (res.data || []).filter(
            (m) =>
              String(m.brand) ===
              String(filters.brand)
          );
        setModels(validModels);
      }
    );

    setFilters((f) => ({
      ...f,
      model: "",
    }));
  }, [filters.brand]);

  /* ================= FETCH ================= */
  const fetchPriceList = async () => {
    if (!storeId) return;

    try {
      setLoading(true);

      const res = await getPriceListApi({
        store: storeId,
        category:
          filters.category || undefined,
        brand: filters.brand || undefined,
        model: filters.model || undefined,
        repair_type:
          filters.repairType || undefined,
      });

      const data = Array.isArray(res.data)
        ? res.data
        : [];

      setPricingData(data);
      setCurrentPage(1);

      toast.success(
        `Pricing loaded for ${
          selectedStore?.name || "store"
        }`,
        { id: "pricing-store" }
      );
    } catch (err) {
      toast.error("Failed to load pricing", {
        id: "pricing-store",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!storeId) return;

    setPricingData([]);
    fetchPriceList();
    // eslint-disable-next-line
  }, [storeId, filters]);

  /* ================= STATUS TOGGLE ================= */
  const toggleStatus = async (item) => {
    try {
      const newStatus =
        item.status === "ACTIVE"
          ? "DISABLED"
          : "ACTIVE";

      await updatePriceApi(
        item.id,
        { status: newStatus },
        storeId
      );

      fetchPriceList();
    } catch {
      toast.error(
        "Failed to update price status"
      );
    }
  };

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(
    pricingData.length / itemsPerPage
  );

  const paginatedData = useMemo(() => {
    const start =
      (currentPage - 1) * itemsPerPage;
    return pricingData.slice(
      start,
      start + itemsPerPage
    );
  }, [pricingData, currentPage]);

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-linear-to-br from-[#0A1230] via-[#0E1B4D] to-[#070E26] border-2 border-[#2B7FFF33] min-h-screen">
      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
          className="w-full sm:w-auto bg-[#0F1B3D] px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">
            All Categories
          </option>
          {categories.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={filters.brand}
          onChange={(e) =>
            setFilters({
              ...filters,
              brand: e.target.value,
            })
          }
          disabled={!filters.category}
          className="w-full sm:w-auto bg-[#0F1B3D] px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">Brand</option>
          {brands.map((b) => (
            <option
              key={b.id}
              value={b.id}
            >
              {b.name}
            </option>
          ))}
        </select>

        <select
          value={filters.model}
          onChange={(e) =>
            setFilters({
              ...filters,
              model: e.target.value,
            })
          }
          disabled={!filters.brand}
          className="w-full sm:w-auto bg-[#0F1B3D] px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">Model</option>
          {models.map((m) => (
            <option
              key={m.id}
              value={m.id}
            >
              {m.name}
            </option>
          ))}
        </select>

        <select
          value={filters.repairType}
          onChange={(e) =>
            setFilters({
              ...filters,
              repairType:
                e.target.value,
            })
          }
          className="w-full sm:w-auto bg-[#0F1B3D] px-4 py-2 rounded-full border border-[#2B7FFF40]"
        >
          <option value="">
            Repair Type
          </option>
          {repairTypes.map((r) => (
            <option
              key={r.id}
              value={r.id}
            >
              {r.name}
            </option>
          ))}
        </select>

        {isAdmin && (
          <button
            onClick={() =>
              setIsAddModalOpen(true)
            }
            className="w-full sm:w-auto sm:ml-auto cursor-pointer bg-[#1D293D] border-2 border-[#2B7FFF33] text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Icon icon="mdi:plus" />
            Add Price
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-[#0F1B3D80] rounded-2xl border border-[#2B7FFF33] overflow-x-auto">
        <div className="min-w-250">
          <div className="grid grid-cols-8 text-[#9FB2FF] text-sm px-6 py-4 border-b border-[#2B7FFF33]">
            <div>Category</div>
            <div>Brand</div>
            <div>Model</div>
            <div>Repair</div>
            <div>Price</div>
            <div>Status</div>
            <div>Last Updated</div>
            <div></div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-white">
              Loading pricing...
            </div>
          ) : paginatedData.length ===
            0 ? (
            <div className="text-center py-10 text-gray-400">
              No price found
            </div>
          ) : (
            paginatedData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-8 items-center px-6 py-4 border-b border-[#2B7FFF20] hover:bg-[#2B7FFF20] cursor-pointer"
              >
                <div className="text-white">
                  {item.category_name}
                </div>
                <div className="text-white">
                  {item.brand_name}
                </div>
                <div className="text-white">
                  {
                    item.device_model_name
                  }
                </div>
                <div className="text-white">
                  {
                    item.repair_type_name
                  }
                </div>
                <div className="text-white font-semibold">
                  ${item.price}
                </div>

                <div>
                  <button
                    onClick={() =>
                      toggleStatus(item)
                    }
                    className={`min-w-28 py-1 rounded-full text-xs ${
                      item.status ===
                      "ACTIVE"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-gray-600/20 text-gray-400"
                    }`}
                  >
                    {item.status}
                  </button>
                </div>

                <div className="text-gray-400 text-sm">
                  {new Date(
                    item.updated_at
                  )
                    .toISOString()
                    .split("T")[0]}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      setEditingItem(
                        item
                      )
                    }
                    className="text-[#2B7FFF] hover:text-white"
                  >
                    <Icon
                      icon="mdi:pencil"
                      width={18}
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isAddModalOpen && (
        <AddPriceModal
          storeId={storeId}
          onClose={() =>
            setIsAddModalOpen(false)
          }
          onSuccess={fetchPriceList}
        />
      )}

      {editingItem && (
        <EditPriceModal
          item={editingItem}
          storeId={storeId}
          onClose={() =>
            setEditingItem(null)
          }
          onSuccess={fetchPriceList}
        />
      )}
    </div>
  );
}
