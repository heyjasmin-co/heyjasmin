import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { CallsType, CallType } from "../../types/CallsType";

export const useGetCalls = (businessId: string | null) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["calls", businessId],
    queryFn: async () => {
      if (!businessId) return null;
      const { data } = await apiClient.get<{
        success: boolean;
        message: string;
        data: CallsType;
      }>(`/calls/${businessId}`);
      return data.data;
    },
    enabled: !!businessId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetCallDetails = (
  callId: string | undefined,
  businessId: string | null,
) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["call", callId, businessId],
    queryFn: async () => {
      if (!callId || !businessId) return null;
      const { data } = await apiClient.get<{
        success: boolean;
        message: string;
        data: CallType;
      }>(`/calls/call/${callId}?businessId=${businessId}`);
      return data.data;
    },
    enabled: !!callId && !!businessId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
