import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import {
  SuperAdminBusinessParams,
  SuperAdminLoginData,
  SuperAdminUserParams,
} from "../../types/SuperAdminTypes";
import { queryKeys } from "../QueryKeys";
import { superAdminService } from "../services/superAdminService";

export const useSuperAdminBusinesses = (params?: SuperAdminBusinessParams) => {
  const apiClient = useApiClient();
  const service = superAdminService(apiClient);

  return useQuery({
    queryKey: queryKeys.superAdmin.businesses(params),
    queryFn: () => service.getBusinesses(params),
  });
};

export const useSuperAdminUsers = (params?: SuperAdminUserParams) => {
  const apiClient = useApiClient();
  const service = superAdminService(apiClient);

  return useQuery({
    queryKey: queryKeys.superAdmin.users(params),
    queryFn: () => service.getUsers(params),
  });
};

export const useDeleteBusinessAsSuperAdmin = () => {
  const apiClient = useApiClient();
  const service = superAdminService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.deleteBusiness(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.superAdmin.all });
    },
  });
};

export const useDeleteUserAsSuperAdmin = () => {
  const apiClient = useApiClient();
  const service = superAdminService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => service.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.superAdmin.all });
    },
  });
};

export const useSuperAdminLogin = () => {
  const apiClient = useApiClient();
  const service = superAdminService(apiClient);

  return useMutation({
    mutationFn: (data: SuperAdminLoginData) => service.login(data),
  });
};
