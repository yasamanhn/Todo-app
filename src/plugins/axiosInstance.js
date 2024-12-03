import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://6734c937a042ab85d11b9e03.mockapi.io/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
