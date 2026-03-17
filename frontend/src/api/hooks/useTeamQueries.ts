import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { queryKeys } from "../QueryKeys";
import { teamService } from "../services/teamService";

export const useTeamMembers = (businessId: string | null | undefined) => {
  const apiClient = useApiClient();
  const service = teamService(apiClient);

  return useQuery({
    queryKey: queryKeys.users.team(businessId || ""),
    queryFn: () => service.getUsers(businessId || ""),
    enabled: !!businessId,
  });
};

export const useTeamInvitations = (businessId: string | null | undefined) => {
  const apiClient = useApiClient();
  const service = teamService(apiClient);

  return useQuery({
    queryKey: queryKeys.users.invitations(businessId || ""),
    queryFn: () => service.getInvitations(businessId || ""),
    enabled: !!businessId,
  });
};

export const useCreateInvitation = () => {
  const apiClient = useApiClient();
  const service = teamService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: { name: string; email: string; role: string };
    }) => service.createInvitation(businessId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.invitations(businessId),
      });
    },
  });
};

export const useRevokeInvitation = () => {
  const apiClient = useApiClient();
  const service = teamService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      invitationToken,
    }: {
      businessId: string;
      invitationToken: string;
    }) => service.revokeInvitation(invitationToken),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.invitations(businessId),
      });
    },
  });
};

export const useDeleteTeamMember = () => {
  const apiClient = useApiClient();
  const service = teamService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessUserId,
    }: {
      businessId: string;
      businessUserId: string;
    }) => service.deleteUser(businessUserId),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.team(businessId),
      });
    },
  });
};

export const useUpdateTeamMember = () => {
  const apiClient = useApiClient();
  const service = teamService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessUserId,
      data,
    }: {
      businessId: string;
      businessUserId: string;
      data: { role: string };
    }) => service.updateUser(businessUserId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.team(businessId),
      });
    },
  });
};
