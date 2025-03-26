import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://claimsystem.info.vn/api/v1/projects", // Giữ nguyên base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
