import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { UserBusinessesType, UserData } from "../../types/UsersTypes";

export const useGetMe = (enabled: boolean = true) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        message: string;
        success: boolean;
        data: UserData;
      }>("/users/me");
      return data.data;
    },
    enabled,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetUserBusinesses = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["users", "businesses"],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        message: string;
        success: boolean;
        data: UserBusinessesType;
      }>("/users/user-businesses");
      return data.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetUserDetails = (clerkId: string | undefined) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["users", "details", clerkId],
    queryFn: async () => {
      if (!clerkId) return null;
      const { data } = await apiClient.get<{
        success: boolean;
        message: string;
        data: UserData;
      }>(`/users/${clerkId}`);
      return data.data;
    },
    enabled: !!clerkId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
