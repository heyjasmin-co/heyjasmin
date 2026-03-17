import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { queryKeys } from "../QueryKeys";
import { userService } from "../services/userService";

export const useMe = () => {
  const apiClient = useApiClient();
  const service = userService(apiClient);

  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: () => service.me(),
  });
};

export const useUserBusinesses = () => {
  const apiClient = useApiClient();
  const service = userService(apiClient);

  return useQuery({
    queryKey: queryKeys.users.userBusinesses(),
    queryFn: () => service.getUserBusinesses(),
  });
};

export const useUserFetch = (clerkId: string | null | undefined) => {
  const apiClient = useApiClient();
  const service = userService(apiClient);

  return useQuery({
    queryKey: ["user", clerkId],
    queryFn: () => service.getUserByClerkId(clerkId!),
    enabled: !!clerkId,
  });
};

export const useSelectBusiness = () => {
  const apiClient = useApiClient();
  const service = userService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: { role: string };
    }) => service.selectBusiness(businessId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
  });
};

export const useLogout = () => {
  const apiClient = useApiClient();
  const service = userService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => service.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
