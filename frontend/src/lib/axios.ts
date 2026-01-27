import { useAuth, useOrganizationList } from "@clerk/clerk-react";
import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { TokenManager } from "./api/token-manager";

export const useApiClient = (timeout: number = 10000): AxiosInstance => {
  const { getToken } = useAuth();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (setActive) {
      setActive({ organization: null });
    }
  }, [setActive]);

  // Initialize TokenManager with the Clerk getToken function
  useEffect(() => {
    if (getToken) {
      TokenManager.getInstance().setGetToken(getToken);
    }
  }, [getToken]);

  const apiClient =axios.create({
      baseURL:
        import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api/v1",
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    apiClient.interceptors.request.use(
      async (config) => {
        // Use TokenManager to fetch the token (handles caching & deduplication)
        const token = await TokenManager.getInstance().getToken();

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
