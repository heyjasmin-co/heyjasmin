import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { queryKeys } from "../QueryKeys";
import { invitationService } from "../services/invitationService";

export const useAcceptInvitation = () => {
  const apiClient = useApiClient();
  const service = invitationService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      userId: string | null;
      invitationToken: string | null;
    }) => service.acceptInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.userBusinesses(),
      });
    },
  });
};
