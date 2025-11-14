import { useAuth, useOrganizationList } from "@clerk/clerk-react";
import axios, { AxiosInstance } from "axios";
import { useEffect, useMemo, useRef } from "react";

export const useApiClient = (timeout: number = 10000): AxiosInstance => {
  const { getToken, isLoaded } = useAuth();
  const { setActive } = useOrganizationList();
  
  const tokenCacheRef = useRef<{
    token: string | null;
    expiry: number;
    pendingRequest: Promise<string | null> | null;
  }>({
    token: null,
    expiry: 0,
    pendingRequest: null,
  });

  useEffect(() => {
    if (setActive) {
      setActive({ organization: null });
    }
  }, [setActive]);

  const apiClient = useMemo(() => {
    const client = axios.create({
      baseURL:
        import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api/v1",
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const fetchToken = async (): Promise<string | null> => {
      const now = Date.now();
      const cache = tokenCacheRef.current;

      // Return cached token if still valid
      if (cache.token && now < cache.expiry) {
        return cache.token;
      }

      // If there's already a pending token request, wait for it
      if (cache.pendingRequest) {
        return cache.pendingRequest;
      }

      // Create new token request
      cache.pendingRequest = getToken()
        .then((token) => {
          if (token) {
            // Cache token for 50 seconds
            tokenCacheRef.current = {
              token,
              expiry: Date.now() + 50000,
              pendingRequest: null,
            };
          } else {
            tokenCacheRef.current.pendingRequest = null;
          }
          return token;
        })
        .catch((error) => {
          // Clear pending request on error
          tokenCacheRef.current.pendingRequest = null;
          console.error("Failed to fetch token:", error);
          return null;
        });

      return cache.pendingRequest;
    };

    client.interceptors.request.use(
      async (config) => {
        const token = await fetchToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Handle rate limiting
    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        if (error.response?.status === 429) {
          console.warn("Rate limited by Clerk API");
          
          // Clear token cache to force refresh on retry
          tokenCacheRef.current = {
            token: null,
            expiry: 0,
            pendingRequest: null,
          };

          // Optional: Retry with exponential backoff
          if (!config._retryCount) {
            config._retryCount = 1;
            const delay = 2000; // 2 second delay
            await new Promise((resolve) => setTimeout(resolve, delay));
            return client(config);
          }
        }

        return Promise.reject(error);
      }
    );

    return client;
  }, [getToken, isLoaded, timeout]);

  return apiClient;
};

export const useScrapeApiClient = () => useApiClient(90000);