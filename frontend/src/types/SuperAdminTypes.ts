import { BusinessDetailsType } from "./BusinessTypes";
import { IUser } from "./UserTypes";

export interface ISuperAdmin {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SuperAdminLoginData {
  email: string;
  password?: string;
}

export interface SuperAdminSignupData {
  email: string;
  password?: string;
}

export interface SuperAdminForgotPasswordData {
  email: string;
}

export interface SuperAdminResetPasswordData {
  password?: string;
  token?: string;
}

export interface SuperAdminChangePasswordData {
  currentPassword?: string;
  newPassword?: string;
}

export interface SuperAdminChangeEmailData {
  newEmail: string;
  password?: string;
}

export interface SuperAdminBusinessParams {
  page?: number;
  limit?: number;
}

export interface SuperAdminUserParams {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface SuperAdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    superAdmin: ISuperAdmin;
  };
}

export interface SuperAdminBusinessesResponse {
  success: boolean;
  message: string;
  businesses: BusinessDetailsType[];
  total: number;
  pages: number;
}

export interface SuperAdminUsersResponse {
  success: boolean;
  message: string;
  users: IUser[];
  total: number;
  pages: number;
}
