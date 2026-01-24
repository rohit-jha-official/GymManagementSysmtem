import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backendgymbelur-production.up.railway.app/api",
});

/* 🔐 AUTO ATTACH JWT TOKEN */
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
