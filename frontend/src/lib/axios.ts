import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

export const useApiClient = (timeout: number = 10000): AxiosInstance => {
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

    apiClient.interceptors.request.use(
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

    return apiClient;

};

export const useScrapeApiClient = () => useApiClient(90000);
