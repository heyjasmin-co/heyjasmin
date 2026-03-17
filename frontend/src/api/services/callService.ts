import { AxiosInstance } from "axios";
import { CallDetailResponse, CallListResponse } from "../../types/CallTypes";

export const callService = (apiClient: AxiosInstance) => ({
  getCallsByBusinessId: async (businessId: string) => {
    const response = await apiClient.get<CallListResponse>(
      `/calls/${businessId}`,
    );
    return response.data;
  },

  getCallById: async (callId: string, params?: { businessId: string }) => {
    const response = await apiClient.get<CallDetailResponse>(
      `/calls/call/${callId}`,
      { params },
    );
    return response.data;
  },
});
