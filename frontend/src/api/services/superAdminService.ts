import { AxiosInstance } from "axios";
import {
  ISuperAdmin,
  SuperAdminBusinessParams,
  SuperAdminBusinessesResponse,
  SuperAdminChangePasswordData,
  SuperAdminLoginData,
  SuperAdminLoginResponse,
  SuperAdminResetPasswordData,
  SuperAdminSignupData,
  SuperAdminUserParams,
  SuperAdminUsersResponse,
} from "../../types/SuperAdminTypes";

export const superAdminService = (apiClient: AxiosInstance) => ({
  signup: async (data: SuperAdminSignupData) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: ISuperAdmin;
    }>("/super-admin/signup", data);
    return response.data;
  },

  login: async (data: SuperAdminLoginData) => {
    const response = await apiClient.post<SuperAdminLoginResponse>(
      "/super-admin/login",
      data,
    );
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/super-admin/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (data: SuperAdminResetPasswordData) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/super-admin/reset-password", data);
    return response.data;
  },

  changePassword: async (data: SuperAdminChangePasswordData) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/super-admin/change-password", data);
    return response.data;
  },

  changeEmail: async (email: string) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/super-admin/change-email", { email });
    return response.data;
  },

  verifyEmailChange: async (token: string) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/super-admin/verify-email-change", { token });
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

  deleteBusiness: async (id: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/super-admin/businesses/${id}`);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/super-admin/users/${id}`);
    return response.data;
  },
});
