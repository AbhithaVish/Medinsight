import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// attach token
API.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem("token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  },
  (err) => Promise.reject(err)
);

/* --------------------------
   Auth
-------------------------- */
export const register = async (payload) => {
  const res = await API.post("/auth/register", payload);
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    API.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
  }
  return res.data;
};

export const login = async (payload) => {
  const res = await API.post("/auth/login", payload);
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    API.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  delete API.defaults.headers.common.Authorization;
};

/* --------------------------
   Stores
-------------------------- */

export const getStores = () =>
  API.get("/stores").then((r) => r.data);

/**
 * Must return S_id from backend
 */
export const addStore = (payload) =>
  API.post("/stores", payload).then((r) => r.data);

export const getStoreItems = (storeId) =>
  API.get(`/stores/${storeId}/items`).then((r) => r.data);

/* --------------------------
   Store Items
-------------------------- */

export const addStoreItem = async (storeId, payload) => {
  if (payload instanceof FormData) {
    return API.post(`/stores/${storeId}/items`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data);
  }

  if (payload?.image instanceof File) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
    return API.post(`/stores/${storeId}/items`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data);
  }

  return API.post(`/stores/${storeId}/items`, payload).then((r) => r.data);
};

export const updateStoreItem = async (storeId, itemId, payload) => {
  if (payload instanceof FormData) {
    return API.patch(`/stores/${storeId}/items/${itemId}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data);
  }

  if (payload?.image instanceof File) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
    return API.patch(`/stores/${storeId}/items/${itemId}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data);
  }

  return API.patch(`/stores/${storeId}/items/${itemId}`, payload).then((r) => r.data);
};

export const deleteStoreItem = (storeId, itemId) =>
  API.delete(`/stores/${storeId}/items/${itemId}`).then((r) => r.data);

/* --------------------------
   Cart, appointment, etc.
-------------------------- */

export const getAppointments = () => API.get("/appointments").then((r) => r.data);
export const getCart = () => API.get("/cart").then((r) => r.data);
export const addToCart = (payload) => API.post("/cart", payload).then((r) => r.data);
export const checkout = () => API.post("/checkout").then((r) => r.data);

export const uploadXray = (file) => {
  const fd = new FormData();
  fd.append("scan", file);
  return API.post("/xray/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
};

export default API;
