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
  id?: string;
}

export interface SuperAdminChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface SuperAdminChangeEmailData {
  newEmail: string;
  password: string;
}

export interface SuperAdminBusinessParams {
  page: number;
  limit: number;
}

export interface SuperAdminUserParams {
  page: number;
  limit: number;
}
