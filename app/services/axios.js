import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.56.1:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
