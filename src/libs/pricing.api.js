import api from "./axios";

/* ================= GET ================= */
export const getCategoriesApi = () =>
  api.get("/api/v1/services/categories/");

export const getBrandsApi = (category) =>
  api.get("/api/v1/services/brands/", {
    params: category ? { category } : {},
  });

export const getDeviceModelsApi = (brand) =>
  api.get("/api/v1/services/device-models/", {
    params: brand ? { brand } : {},
  });

export const getRepairTypesApi = () =>
  api.get("/api/v1/services/repair-types/");

/* ================= PRICE LIST ================= */
export const getPriceListApi = (filters = {}) =>
  api.get("/api/v1/services/price-list/", {
    params: {
      store: filters.store || undefined,
      category: filters.category || undefined,
      brand: filters.brand || undefined,
      device_model: filters.model || undefined,
      repair_type: filters.repair_type || undefined,
    },
  });

/* ================= CREATE ================= */
export const createPriceApi = (data, storeId) =>
  api.post(
    "/api/v1/services/price-list/",
    data,
    {
      params: storeId ? { store: storeId } : {},
    }
  );

/* ================= UPDATE ================= */
export const updatePriceApi = (id, data, storeId) =>
  api.patch(
    `/api/v1/services/price-list/${id}/`,
    data,
    {
      params: storeId ? { store: storeId } : {},
    }
  );
