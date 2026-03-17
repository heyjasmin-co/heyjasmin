import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { queryKeys } from "../QueryKeys";
import { stripeService } from "../services/stripeService";

export const useCreatePaymentIntent = () => {
  const apiClient = useApiClient();
  const service = stripeService(apiClient);

  return useMutation({
    mutationFn: (data: { businessId: string; priceId: string }) =>
      service.createPaymentIntent(data),
  });
};

export const useConfirmSubscription = () => {
  const apiClient = useApiClient();
  const service = stripeService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      paymentIntentId?: string;
      setupIntentId?: string;
      businessId: string;
      priceId: string;
    }) => service.confirmSubscription(data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.billing.subscription(businessId),
      });
    },
  });
};
