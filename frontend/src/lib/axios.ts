import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const { getToken } = useAuth();
    let token;

    if (config.url?.includes("/me")) {
      token = await getToken({ skipCache: true });
    } else {
      token = await getToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
