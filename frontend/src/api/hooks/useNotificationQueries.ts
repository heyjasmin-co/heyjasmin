import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { queryKeys } from "../QueryKeys";
import { notificationService } from "../services/notificationService";
import { successToast } from "@/utils/react-toast";

export const useNotificationSettings = (
  businessId: string | null | undefined,
) => {
  const apiClient = useApiClient();
  const service = notificationService(apiClient);

  return useQuery({
    queryKey: queryKeys.business.notifications(businessId || ""),
    queryFn: () => service.getSettings(businessId || ""),
    enabled: !!businessId,
  });
};

export const useUpdateEmailToggle = () => {
  const apiClient = useApiClient();
  const service = notificationService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ businessId, enabled }: { businessId: string; enabled: boolean }) =>
      service.updateEmailToggle(businessId, enabled),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.notifications(businessId),
      });
      successToast("Email notifications updated successfully");
    },
  });
};

export const useUpdateTextToggle = () => {
  const apiClient = useApiClient();
  const service = notificationService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ businessId, enabled }: { businessId: string; enabled: boolean }) =>
      service.updateTextToggle(businessId, enabled),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.notifications(businessId),
      });
      successToast("Text notifications updated successfully");
    },
  });
};

export const useCreateNotificationRecipient = () => {
  const apiClient = useApiClient();
  const service = notificationService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      type,
      data,
    }: {
      businessId: string;
      type: "email" | "text";
      data: { id: string; value: string };
    }) => service.createRecipient(businessId, type, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.notifications(businessId),
      });
    },
  });
};

export const useUpdateNotificationRecipient = () => {
  const apiClient = useApiClient();
  const service = notificationService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      type,
      recipientId,
      data,
    }: {
      businessId: string;
      type: "email" | "text";
      recipientId: string;
      data: { value: string };
    }) => service.updateRecipient(businessId, type, recipientId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.notifications(businessId),
      });
    },
  });
};

export const useDeleteNotificationRecipient = () => {
  const apiClient = useApiClient();
  const service = notificationService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      type,
      recipientId,
    }: {
      businessId: string;
      type: "email" | "text";
      recipientId: string;
    }) => service.deleteRecipient(businessId, type, recipientId),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.notifications(businessId),
      });
    },
  });
};
