import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gym-backend-render-okpo.onrender.com/api",
  timeout: 15000,
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

/* 🛑 SAFE RESPONSE HANDLING */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.code === "ERR_NETWORK" ||
      error.message?.includes("Network Error")
    ) {
      console.warn("⚠️ Backend sleeping (Render)");
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
