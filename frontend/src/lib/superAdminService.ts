import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; // Adjust fallback as needed

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("superAdminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
}

export interface SuperAdminChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface SuperAdminChangeEmailData {
  newEmail: string;
  password: string;
}

export const superAdminService = {
  // Auth
  signup: (data: SuperAdminSignupData) => api.post("/super-admin/signup", data),
  login: (data: SuperAdminLoginData) => api.post("/super-admin/login", data),
  forgotPassword: (data: SuperAdminForgotPasswordData) =>
    api.post("/super-admin/forgot-password", data),
  resetPassword: (data: SuperAdminResetPasswordData) =>
    api.post("/super-admin/reset-password", data),

  // Protected
  changePassword: (data: SuperAdminChangePasswordData) =>
    api.post("/super-admin/change-password", data),
  changeEmail: (data: SuperAdminChangeEmailData) =>
    api.post("/super-admin/change-email", data),
  getBusinesses: () => api.get("/super-admin/businesses"),
  deleteBusiness: (id: string) => api.delete(`/super-admin/businesses/${id}`),
};
