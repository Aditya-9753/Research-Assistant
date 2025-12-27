import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------
// Request Interceptor
// -----------------------------
API.interceptors.request.use(
  (config) => {
    // Debug log (remove later if needed)
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------
// Response Interceptor
// -----------------------------
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    // Standardize error message
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      detail: "Network error. Please check backend server.",
    });
  }
);

export default API;
