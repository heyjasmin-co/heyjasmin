import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

export const useApiClient = (timeout?: number): AxiosInstance => {
  const { getToken, isLoaded } = useAuth();
  const apiClient = useMemo(() => {
    const client = axios.create({
      baseURL:
        import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api/v1",
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    client.interceptors.request.use(
      async (config) => {
        const token = await getToken({
          skipCache: true,
        });

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    return client;
  }, [getToken, isLoaded, timeout]);

  return apiClient;
};

export const useScrapeApiClient = () => useApiClient(90000);

export const useSuperAdminClient = (): AxiosInstance => {
  const client = useMemo(() => {
    const api = axios.create({
      baseURL:
        import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api/v1",
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
  }, []);

  return client;
};
