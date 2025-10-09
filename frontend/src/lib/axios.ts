import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const useApiClient = () => {
  const { getToken } = useAuth();
  const apiClient = axios.create({
    baseURL:
      import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api/v1",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use(
    async (config) => {
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

  return apiClient;
};
