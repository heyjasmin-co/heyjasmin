import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../lib/axios";
import { CallsType, CallType } from "../types/CallsType";

export const useCalls = (businessId?: string) => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["calls", businessId],
    queryFn: async () => {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: CallsType;
      }>(`/calls/${businessId}`);
      return response.data.data;
    },
    enabled: !!businessId,
  });
};

export const useCallDetails = (callId?: string, businessId?: string) => {
  const apiClient = useApiClient();
  return useQuery({
    queryKey: ["call", callId, businessId],
    queryFn: async () => {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: CallType;
      }>(`/calls/call/${callId}?businessId=${businessId}`);
      return response.data.data;
    },
    enabled: !!callId && !!businessId,
  });
};
