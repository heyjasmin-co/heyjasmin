import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../lib/axios";
import { BusinessUserInvitationsType } from "../types/BusinessUserInvitationsTypes";
import { BusinessUserType } from "../types/BusinessUsersTypes";
import { UserBusinessesType, UserDetailsType } from "../types/UsersTypes";

export interface UserData {
  dbUserId: string | null;
  clerkId: string | null;
  businessId: string | null;
  isSetupComplete: boolean;
  role: string | null;
  assistantNumber: string | null;
  businessName: string | null;
  subscription: SubscriptionDetails | null;
}

export interface SubscriptionDetails {
  plan: "essential" | "pro" | "plus" | "trial";
  remainingMinutes: number | "unlimited";
  remainingMinutesFormatted: string;
  usedMinutes: number;
  stripePriceId: string | null;
  status:
    | "trial_active"
    | "trial_ended"
    | "canceled"
    | "active"
    | "inactive"
    | "unpaid";
}

export const useUserDataQuery = (enabled: boolean = true) => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await apiClient.get<{
        message: string;
        success: boolean;
        data: UserData;
      }>("/users/me");
      return response.data.data;
    },
    enabled,
    retry: false,
  });
};

export const useUserBusinesses = () => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["user-businesses"],
    queryFn: async () => {
      const response = await apiClient.get<{
        message: string;
        success: boolean;
        data: UserBusinessesType;
      }>("/users/user-businesses");
      return response.data.data;
    },
  });
};

export const useUserDetails = (clerkId?: string) => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["user", clerkId],
    queryFn: async () => {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: UserDetailsType;
      }>("/users/" + clerkId);
      return response.data.data;
    },
    enabled: !!clerkId,
  });
};

export const useUserInvitations = (businessId?: string) => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["business-invitations", businessId],
    queryFn: async () => {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessUserInvitationsType[];
      }>("/business-user-invitations/" + businessId);
      return response.data.data;
    },
    enabled: !!businessId,
  });
};

export const useTeammates = (businessId?: string) => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["teammates", businessId],
    queryFn: async () => {
      const response = await apiClient.get(`/users/teammates`);
      return response.data.data;
    },
    enabled: !!businessId,
  });
};

export const useLogout = () => {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/users/logout");
      localStorage.removeItem("superAdminToken"); // Just in case
    },
  });
};

export const useSelectBusiness = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (businessId: string) => {
      await apiClient.post(`/users/select-business/${businessId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });
};

export const useAcceptInvitation = () => {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: async (data: { token: string; email: string }) => {
      await apiClient.post(`/business-user-invitations/accept`, data);
    },
  });
};

export const useUpdateTeammate = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      businessUserId,
      role,
    }: {
      businessUserId: string;
      role: string;
    }) => {
      const response = await apiClient.patch<{
        message: string;
        success: boolean;
        data: BusinessUserType;
      }>(`/business-users/${businessUserId}`, { role });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teammates"] });
    },
  });
};

export const useRemoveTeammate = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (businessUserId: string) => {
      const response = await apiClient.delete<{
        message: string;
        success: boolean;
        data: BusinessUserType;
      }>("/business-users/" + businessUserId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teammates"] });
    },
  });
};

export const useCreateInvitation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      businessId,
      email,
      role,
    }: {
      businessId: string;
      email: string;
      role: string;
    }) => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: BusinessUserInvitationsType;
      }>(`/business-user-invitations/create/${businessId}`, { email, role });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business-invitations", variables.businessId],
      });
    },
  });
};

export const useRevokeInvitation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      invitationToken,
    }: {
      invitationToken: string;
      businessId: string;
    }) => {
      const response = await apiClient.delete<{
        success: boolean;
        message: string;
        data: BusinessUserInvitationsType;
      }>(`/business-user-invitations/revoke/${invitationToken}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business-invitations", variables.businessId],
      });
    },
  });
};
