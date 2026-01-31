import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../lib/axios";

export const useCreateSubscription = () => {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: async (data: { businessId?: string; priceId: string }) => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { clientSecret: string };
      }>("/stripe/create", data);
      return response.data;
    },
  });
};

export const useConfirmSubscription = () => {
  const apiClient = useApiClient();
  return useMutation({
    mutationFn: async (data: {
      businessId?: string;
      setupIntentId: string;
      priceId: string;
    }) => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { clientSecret: string };
      }>("/stripe/confirm", data);
      return response.data;
    },
  });
};
