import { AxiosInstance } from "axios";

export const invitationService = (apiClient: AxiosInstance) => ({
  acceptInvitation: async (data: {
    userId: string | null;
    invitationToken: string | null;
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/business-user-invitations/accept", data);
    return response.data;
  },
});
