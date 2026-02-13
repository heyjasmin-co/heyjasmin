import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSuperAdminClient } from "../../lib/axios";
import {
  SuperAdminBusinessParams,
  SuperAdminChangeEmailData,
  SuperAdminChangePasswordData,
  SuperAdminLoginData,
  SuperAdminLoginResponse,
  SuperAdminSuccessResponse,
  SuperAdminUserParams,
} from "../../types/SuperAdminTypes";
import { queryKeys } from "../QueryKeys";
import { superAdminService } from "../services/superAdminService";

export const useSuperAdminBusinesses = (params?: SuperAdminBusinessParams) => {
  const apiClient = useSuperAdminClient();
  const service = superAdminService(apiClient);

  return useQuery({
    queryKey: queryKeys.superAdmin.businesses(params),
    queryFn: () => service.getBusinesses(params),
  });
};

export const useSuperAdminUsers = (params?: SuperAdminUserParams) => {
  const apiClient = useSuperAdminClient();
  const service = superAdminService(apiClient);

  return useQuery({
    queryKey: queryKeys.superAdmin.users(params),
    queryFn: () => service.getUsers(params),
  });
};

export const useDeleteBusinessAsSuperAdmin = () => {
  const apiClient = useSuperAdminClient();
  const service = superAdminService(apiClient);
  const queryClient = useQueryClient();

  return useMutation<
    SuperAdminSuccessResponse,
    AxiosError<{ error: string }>,
    string
  >({
    mutationFn: (id: string) => service.deleteBusiness(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.superAdmin.all });
    },
  });
};

export const useDeleteUserAsSuperAdmin = () => {
  const apiClient = useSuperAdminClient();
  const service = superAdminService(apiClient);
  const queryClient = useQueryClient();

  return useMutation<
    SuperAdminSuccessResponse,
    AxiosError<{ error: string }>,
    string
  >({
    mutationFn: (id: string) => service.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.superAdmin.all });
    },
  });
};

export const useSuperAdminLogin = () => {
  const apiClient = useSuperAdminClient();
  const service = superAdminService(apiClient);

  return useMutation<
    SuperAdminLoginResponse,
    AxiosError<{ error: string }>,
    SuperAdminLoginData
  >({
    mutationFn: (data: SuperAdminLoginData) => service.login(data),
  });
};

export const useSuperAdminChangePassword = () => {
  const apiClient = useSuperAdminClient();
  const service = superAdminService(apiClient);

  return useMutation<
    SuperAdminSuccessResponse,
    AxiosError<{ error: string }>,
    SuperAdminChangePasswordData
  >({
    mutationFn: (data: SuperAdminChangePasswordData) =>
      service.changePassword(data),
  });
};

export const useSuperAdminChangeEmail = () => {
  const apiClient = useSuperAdminClient();
  const service = superAdminService(apiClient);

  return useMutation<
    SuperAdminSuccessResponse,
    AxiosError<{ error: string }>,
    SuperAdminChangeEmailData
  >({
    mutationFn: (data: SuperAdminChangeEmailData) => service.changeEmail(data),
  });
};
