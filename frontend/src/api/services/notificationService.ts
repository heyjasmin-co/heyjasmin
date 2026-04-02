import { AxiosInstance } from "axios";
import { NotificationSettings } from "../../types/NotificationTypes";

export const notificationService = (apiClient: AxiosInstance) => ({
  getSettings: async (businessId: string) => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: NotificationSettings;
    }>(`/business-call-notifications/${businessId}`);
    return response.data;
  },

  updateEmailToggle: async (businessId: string, enabled: boolean) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: NotificationSettings;
    }>(`/business-call-notifications/${businessId}/email-toggle`, { enabled });
    return response.data;
  },

  updateTextToggle: async (businessId: string, enabled: boolean) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: NotificationSettings;
    }>(`/business-call-notifications/${businessId}/text-toggle`, { enabled });
    return response.data;
  },

  createRecipient: async (
    businessId: string,
    type: "email" | "text",
    data: { id: string; value: string },
  ) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: NotificationSettings;
    }>(`/business-call-notifications/${businessId}/recipients/${type}`, data);
    return response.data;
  },

  updateRecipient: async (
    businessId: string,
    type: "email" | "text",
    recipientId: string,
    data: { value: string },
  ) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: NotificationSettings;
    }>(
      `/business-call-notifications/${businessId}/recipients/${type}/${recipientId}`,
      data,
    );
    return response.data;
  },

  deleteRecipient: async (
    businessId: string,
    type: "email" | "text",
    recipientId: string,
  ) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
      data: NotificationSettings;
    }>(
      `/business-call-notifications/${businessId}/recipients/${type}/${recipientId}`,
    );
    return response.data;
  },
});
