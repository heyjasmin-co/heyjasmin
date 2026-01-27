import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { BusinessUserInvitationsType } from "../../types/BusinessUserInvitationsTypes";
import { BusinessUsersDetailsType } from "../../types/BusinessUsersTypes";

export const useGetBusinessUsers = (businessId: string | null) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["business-users", businessId],
    queryFn: async () => {
      if (!businessId) return null;
      const { data } = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessUsersDetailsType;
      }>(`/business-users/${businessId}`);
      return data.data;
    },
    enabled: !!businessId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetBusinessUserInvitations = (businessId: string | null) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["business-user-invitations", businessId],
    queryFn: async () => {
      if (!businessId) return null;
      const { data } = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessUserInvitationsType[];
      }>(`/business-user-invitations/${businessId}`);
      return data.data;
    },
    enabled: !!businessId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
