import axios from "./axios";

export const getUsersApi = () => axios.get("/auth/users/");

export const createUserApi = (payload) =>
  axios.post("/auth/users/", payload);

export const updateUserApi = (id, payload) =>
  axios.patch(`/auth/users/${id}/`, payload);

export const deleteUserApi = (id) =>
  axios.delete(`/auth/users/${id}/`);
