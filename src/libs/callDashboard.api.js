import axios from "./axios"; 

export const getCallTrendsApi = (storeId) => {
  return axios.get(`/api/v1/call/call-trends/`, {
    params: { store: storeId },
  });
};

export const getStoreSummaryApi = (storeId) => {
  return axios.get(`/api/v1/call/store-summary/`, {
    params: { store_id: storeId },
  });
};
