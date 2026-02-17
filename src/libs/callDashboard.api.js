import axios from "./axios";

/* ================= CALL TRENDS ================= */
export const getCallTrendsApi = (storeId, params = {}) => {
  return axios.get(`/api/v1/call/call-trends/`, {
    params: {
      store: storeId,
      range: params.range || "today",
    },
  });
};

/* ================= STORE SUMMARY ================= */
export const getStoreSummaryApi = (storeId, params = {}) => {
  return axios.get(`/api/v1/call/store-summary/`, {
    params: {
      store_id: storeId,
      range: params.range || "today",
    },
  });
};
