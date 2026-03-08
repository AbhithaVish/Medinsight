import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Request interceptor for tokens
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - CLEANED UP
api.interceptors.response.use(
  res => res,
  err => {
    // We no longer call alert() here. 
    // The error is passed directly to the .catch() block in your components.
    return Promise.reject(err);
  }
);

export const BASE_URL = "http://localhost:5000";
export default api;