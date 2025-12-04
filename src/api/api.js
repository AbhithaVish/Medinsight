import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

// attach token automatically if present
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const register = (payload) => API.post("/auth/register", payload).then(r => r.data);
export const login = (payload) => API.post("/auth/login", payload).then(r => r.data);

export const getStores = () => API.get("/stores").then(r => r.data);
export const getStoreItems = (storeId) => API.get(`/stores/${storeId}/items`).then(r => r.data);
export const getAppointments = () => API.get("/appointments").then(r => r.data);

export const uploadXray = (file) => {
  const fd = new FormData();
  fd.append("scan", file);
  return axios.post((import.meta.env.VITE_API_BASE || "http://localhost:5000") + "/xray/upload", fd, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("token")}` }
  }).then(r => r.data);
};

export const getCart = () => API.get("/cart").then(r => r.data);
export const addToCart = (payload) => API.post("/cart", payload).then(r => r.data);
export const checkout = () => API.post("/checkout").then(r => r.data);
