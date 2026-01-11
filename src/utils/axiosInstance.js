import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

/* 🔐 AUTO ATTACH JWT TOKEN */
axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
