import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { BusinessUserInvitationsType } from "../../types/BusinessUserInvitationsTypes";
import { BusinessUserType } from "../../types/BusinessUsersTypes";

export const useUpdateTeamMemberRole = () => {
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
      queryClient.invalidateQueries({ queryKey: ["business-users"] });
    },
  });
};

export const useRemoveTeamMember = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (businessUserId: string) => {
      const response = await apiClient.delete<{
        message: string;
        success: boolean;
        data: BusinessUserType;
      }>(`/business-users/${businessUserId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-users"] });
    },
  });
};

export const useCreateTeamInvitation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      data,
    }: {
      businessId: string;
      data: { email: string; role: string };
    }) => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: BusinessUserInvitationsType;
      }>(`/business-user-invitations/create/${businessId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["business-user-invitations"],
      });
    },
  });
};

export const useRevokeTeamInvitation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clerkInvitationId: string) => {
      const response = await apiClient.delete<{
        success: boolean;
        message: string;
        data: BusinessUserInvitationsType;
      }>(`/business-user-invitations/revoke/${clerkInvitationId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["business-user-invitations"],
      });
    },
  });
};

export const useJoinOrganization = () => {
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async (data: {
      userId: string | null;
      businessId: string | null;
      clerkOrganizationId: string | null;
      role: string | null;
      clerkUserId: string | null;
      email: string | null;
    }) => {
      const response = await apiClient.post(
        `/business-user-invitations/accept`,
        data,
      );
      return response.data;
    },
  });
};
