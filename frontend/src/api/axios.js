import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Request interceptor
api.interceptors.request.use(config => {

  const token =
    localStorage.getItem("assistantToken") ||
    localStorage.getItem("consultantToken") ||
    localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export const BASE_URL = "http://localhost:5000";
export default api;