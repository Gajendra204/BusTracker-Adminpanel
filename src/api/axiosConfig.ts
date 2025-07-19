import axios from "axios";

export const API_BASE_URL = "http://localhost:5000/api";
//const API_BASE_URL = "https://api-bus-tracker.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("busTrackerAdminToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;