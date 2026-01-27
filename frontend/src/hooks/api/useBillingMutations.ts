import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";

export const useCreateStripePaymentIntent = () => {
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      priceId,
    }: {
      businessId: string;
      priceId: string;
    }) => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { clientSecret: string };
      }>("/stripe/create", {
        businessId,
        priceId,
      });
      return response.data;
    },
  });
};

export const useConfirmStripePayment = () => {
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      setupIntentId,
      priceId,
    }: {
      businessId: string;
      setupIntentId: string;
      priceId: string;
    }) => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { clientSecret: string };
      }>("/stripe/confirm", {
        businessId,
        setupIntentId,
        priceId,
      });
      return response.data;
    },
  });
};
