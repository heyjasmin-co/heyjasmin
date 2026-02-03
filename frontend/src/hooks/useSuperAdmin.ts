import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSuperAdminClient } from "../lib/axios";

export interface SuperAdminSignupData {
  email: string;
  password: string;
}

export interface SuperAdminLoginData {
  email: string;
  password: string;
}

export interface SuperAdminForgotPasswordData {
  email: string;
}

export interface SuperAdminResetPasswordData {
  token: string;
  newPassword: string;
  id: string;
}

export interface SuperAdminChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface SuperAdminChangeEmailData {
  newEmail: string;
  password: string;
}

export interface SuperAdminBusiness {
  _id: string;
  name: string;
  twilioNumber?: string;
  ownerUserId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  subscription?: {
    plan: string;
    status: string;
  };
  memberCount: number;
  createdAt: string;
}

export interface SuperAdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  businessCount: number;
  createdAt: string;
}

interface SuperAdminBusinessesResponse {
  success: boolean;
  businesses: SuperAdminBusiness[];
  total: number;
  pages: number;
}

interface SuperAdminUsersResponse {
  success: boolean;
  users: SuperAdminUser[];
  total: number;
  pages: number;
}

export const useSuperAdminBusinesses = (page: number, limit: number) => {
  const apiClient = useSuperAdminClient();
  return useQuery({
    queryKey: ["super-admin", "businesses", { page, limit }],
    queryFn: async () => {
      const response = await apiClient.get<SuperAdminBusinessesResponse>(
        "/super-admin/businesses",
        { params: { page, limit } },
      );
      return response.data;
    },
  });
};

export const useSuperAdminUsers = (page: number, limit: number) => {
  const apiClient = useSuperAdminClient();
  return useQuery({
    queryKey: ["super-admin", "users", { page, limit }],
    queryFn: async () => {
      const response = await apiClient.get<SuperAdminUsersResponse>(
        "/super-admin/users",
        { params: { page, limit } },
      );
      return response.data;
    },
  });
};

export const useDeleteBusiness = () => {
  const apiClient = useSuperAdminClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`/super-admin/businesses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["super-admin", "businesses"],
      });
    },
  });
};

export const useDeleteUser = () => {
  const apiClient = useSuperAdminClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/super-admin/users/${id}`),
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
  const apiClient = useSuperAdminClient();
  return useMutation({
    mutationFn: (data: SuperAdminChangePasswordData) =>
      apiClient.post("/super-admin/change-password", data),
  });
};

export const useSuperAdminChangeEmail = () => {
  const apiClient = useSuperAdminClient();
  return useMutation({
    mutationFn: (data: SuperAdminChangeEmailData) =>
      apiClient.post("/super-admin/change-email", data),
  });
};

export const useVerifyEmailChange = () => {
  const apiClient = useSuperAdminClient();
  return useMutation({
    mutationFn: (data: { token: string; id: string }) =>
      apiClient.post("/super-admin/verify-email-change", data),
  });
};
