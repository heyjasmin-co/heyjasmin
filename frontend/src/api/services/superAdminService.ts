import { AxiosInstance } from "axios";
import {
  SuperAdminBusinessParams,
  SuperAdminBusinessesResponse,
  SuperAdminChangeEmailData,
  SuperAdminChangePasswordData,
  SuperAdminLoginData,
  SuperAdminLoginResponse,
  SuperAdminResetPasswordData,
  SuperAdminSignupData,
  SuperAdminSignupResponse,
  SuperAdminSuccessResponse,
  SuperAdminUserParams,
  SuperAdminUsersResponse,
} from "../../types/SuperAdminTypes";

export const superAdminService = (apiClient: AxiosInstance) => ({
  signup: async (
    data: SuperAdminSignupData,
  ): Promise<SuperAdminSignupResponse> => {
    const response = await apiClient.post<SuperAdminSignupResponse>(
      "/super-admin/signup",
      data,
    );
    return response.data;
  },

  login: async (
    data: SuperAdminLoginData,
  ): Promise<SuperAdminLoginResponse> => {
    const response = await apiClient.post<SuperAdminLoginResponse>(
      "/super-admin/login",
      data,
    );
    return response.data;
  },

  forgotPassword: async (email: string): Promise<SuperAdminSuccessResponse> => {
    const response = await apiClient.post<SuperAdminSuccessResponse>(
      "/super-admin/forgot-password",
      { email },
    );
    return response.data;
  },

  resetPassword: async (
    data: SuperAdminResetPasswordData,
  ): Promise<SuperAdminSuccessResponse> => {
    const response = await apiClient.post<SuperAdminSuccessResponse>(
      "/super-admin/reset-password",
      data,
    );
    return response.data;
  },

  changePassword: async (
    data: SuperAdminChangePasswordData,
  ): Promise<SuperAdminSuccessResponse> => {
    const response = await apiClient.post<SuperAdminSuccessResponse>(
      "/super-admin/change-password",
      data,
    );
    return response.data;
  },

  changeEmail: async (
    data: SuperAdminChangeEmailData,
  ): Promise<SuperAdminSuccessResponse> => {
    const response = await apiClient.post<SuperAdminSuccessResponse>(
      "/super-admin/change-email",
      data,
    );
    return response.data;
  },

  verifyEmailChange: async (
    token: string,
  ): Promise<SuperAdminSuccessResponse> => {
    const response = await apiClient.post<SuperAdminSuccessResponse>(
      "/super-admin/verify-email-change",
      { token },
    );
    return response.data;
  },

  getBusinesses: async (params?: SuperAdminBusinessParams) => {
    const response = await apiClient.get<SuperAdminBusinessesResponse>(
      "/super-admin/businesses",
      { params },
    );
    return response.data;
  },

  getUsers: async (params?: SuperAdminUserParams) => {
    const response = await apiClient.get<SuperAdminUsersResponse>(
      "/super-admin/users",
      { params },
    );
    return response.data;
  },

  deleteBusiness: async (id: string): Promise<SuperAdminSuccessResponse> => {
    const response = await apiClient.delete<SuperAdminSuccessResponse>(
      `/super-admin/businesses/${id}`,
    );
    return response.data;
  },

  deleteUser: async (id: string): Promise<SuperAdminSuccessResponse> => {
    const response = await apiClient.delete<SuperAdminSuccessResponse>(
      `/super-admin/users/${id}`,
    );
    return response.data;
  },
});
