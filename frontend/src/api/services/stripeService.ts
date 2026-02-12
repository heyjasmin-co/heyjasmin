import { AxiosInstance } from "axios";

export const stripeService = (apiClient: AxiosInstance) => ({
  createPaymentIntent: async (data: {
    businessId: string;
    priceId: string;
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: { clientSecret: string; subscriptionId: string };
    }>("/stripe/create", data);
    return response.data;
  },

  confirmSubscription: async (data: {
    paymentIntentId?: string;
    setupIntentId?: string;
    businessId: string;
    priceId: string;
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/stripe/confirm", data);
    return response.data;
  },
});
