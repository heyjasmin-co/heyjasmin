import { AxiosInstance } from "axios";
import { IBusinessUser, IBusinessUserInvitation } from "../../types/UserTypes";

export const teamService = (apiClient: AxiosInstance) => ({
  getUsers: async (businessId: string) => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: IBusinessUser[];
    }>(`/business-users/${businessId}`);
    return response.data;
  },

  deleteUser: async (businessUserId: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/business-users/${businessUserId}`);
    return response.data;
  },

  updateUser: async (businessUserId: string, data: { role: string }) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
    }>(`/business-users/${businessUserId}`, data);
    return response.data;
  },

  getInvitations: async (businessId: string) => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: IBusinessUserInvitation[];
    }>(`/business-user-invitations/${businessId}`);
    return response.data;
  },

  createInvitation: async (
    businessId: string,
    data: { name: string; email: string; role: string },
  ) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: IBusinessUserInvitation;
    }>(`/business-user-invitations/create/${businessId}`, data);
    return response.data;
  },

  revokeInvitation: async (invitationToken: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/business-user-invitations/revoke/${invitationToken}`);
    return response.data;
  },

  acceptInvitation: async (data: { token: string }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>(`/business-user-invitations/accept`, data);
    return response.data;
  },
});
