import { useMemo } from "react";
import { useSuperAdminClient } from "../lib/axios";
import {
  SuperAdminBusinessParams,
  SuperAdminChangeEmailData,
  SuperAdminChangePasswordData,
  SuperAdminForgotPasswordData,
  SuperAdminLoginData,
  SuperAdminResetPasswordData,
  SuperAdminSignupData,
  SuperAdminUserParams,
} from "../types/SuperAdminTypes";

export const useSuperAdmin = () => {
  const api = useSuperAdminClient();

  return useMemo(
    () => ({
      signup: (data: SuperAdminSignupData) =>
        api.post("super-admin/signup", data),
      login: (data: SuperAdminLoginData) => api.post("super-admin/login", data),
      forgotPassword: (data: SuperAdminForgotPasswordData) =>
        api.post("super-admin/forgot-password", data),
      resetPassword: (data: SuperAdminResetPasswordData) =>
        api.post("super-admin/reset-password", data),
      changePassword: (data: SuperAdminChangePasswordData) =>
        api.post("super-admin/change-password", data),
      changeEmail: (data: SuperAdminChangeEmailData) =>
        api.post("super-admin/change-email", data),
      verifyEmailChange: (data: { token: string; id: string }) =>
        api.post("super-admin/verify-email-change", data),
      getBusinesses: (params?: SuperAdminBusinessParams) =>
        api.get("super-admin/businesses", { params }),
      deleteBusiness: (id: string) =>
        api.delete(`super-admin/businesses/${id}`),
      getUsers: (params?: SuperAdminUserParams) =>
        api.get("super-admin/users", { params }),
      deleteUser: (id: string) => api.delete(`super-admin/users/${id}`),
    }),
    [api],
  );
};
