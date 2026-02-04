import axios from "./axios";

export const getApiConfig = (storeId) =>
  axios.get(`/api/v1/stores/${storeId}/api-config/`);

export const updateApiConfig = (storeId) =>
  axios.patch(`/api/v1/stores/${storeId}/api-config/`);


