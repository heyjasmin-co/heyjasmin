import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSuperAdminClient } from "../lib/superAdminClient";
import {
  SuperAdminForgotPasswordData,
  SuperAdminLoginData,
  SuperAdminResetPasswordData,
  superAdminService,
  SuperAdminSignupData,
} from "../lib/superAdminService";

export const useSuperAdminBusinesses = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["super-admin", "businesses", { page, limit }],
    queryFn: () => superAdminService.getBusinesses({ page, limit }),
  });
};

export const useSuperAdminUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["super-admin", "users", { page, limit }],
    queryFn: () => superAdminService.getUsers({ page, limit }),
  });
};

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => superAdminService.deleteBusiness(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["super-admin", "businesses"],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => superAdminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-admin", "users"] });
    },
  });
};

export const useSuperAdminLogin = () => {
  const apiClient = useSuperAdminClient();
  return useMutation({
    mutationFn: async (data: SuperAdminLoginData) => {
      const response = await apiClient.post("/super-admin/login", data);
      return response.data;
    },
  });
};

export const useSuperAdminSignup = () => {
  const apiClient = useSuperAdminClient();
  return useMutation({
    mutationFn: async (data: SuperAdminSignupData) => {
      const response = await apiClient.post("/super-admin/signup", data);
      return response.data;
    },
  });
};

export const useSuperAdminForgotPassword = () => {
  const apiClient = useSuperAdminClient();
  return useMutation({
    mutationFn: async (data: SuperAdminForgotPasswordData) => {
      const response = await apiClient.post(
        "/super-admin/forgot-password",
        data,
      );
      return response.data;
    },
  });
};

export const useSuperAdminResetPassword = () => {
  const apiClient = useSuperAdminClient();
  return useMutation({
    mutationFn: async (data: SuperAdminResetPasswordData) => {
      const response = await apiClient.post(
        "/super-admin/reset-password",
        data,
      );
      return response.data;
    },
  });
};

export const useSuperAdminChangePassword = () => {
  return useMutation({
    mutationFn: (data: any) => superAdminService.changePassword(data),
  });
};

export const useSuperAdminChangeEmail = () => {
  return useMutation({
    mutationFn: (data: any) => superAdminService.changeEmail(data),
  });
};
