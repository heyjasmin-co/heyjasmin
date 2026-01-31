import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

export const useSuperAdminClient = (timeout: number = 10000): AxiosInstance => {
  const client = useMemo(() => {
    const api = axios.create({
      baseURL:
        import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api/v1",
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("superAdminToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return api;
  }, [timeout]);

  return client;
};
