import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient, useScrapeApiClient } from "../lib/axios";
import { BusinessDetailsType } from "../types/BusinessTypes";

export const useBusinessDetails = (businessId?: string) => {
  const apiClient = useScrapeApiClient();
  return useQuery({
    queryKey: ["business", businessId],
    queryFn: async () => {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + businessId);
      return response.data.data;
    },
    enabled: !!businessId,
  });
};

export const useUpdateAssistantSetup = (businessId?: string) => {
  const apiClient = useScrapeApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (assistantSetup: string) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: BusinessDetailsType["aiAgentSettings"];
      }>("/businesses/update-assistant-setup/" + businessId, {
        assistantSetup,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    },
  });
};

export const useUpdateBusinessDetails = (businessId?: string) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<BusinessDetailsType>) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + businessId, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    },
  });
};

export const useUpdateAssistant = (businessId?: string) => {
  const apiClient = useScrapeApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/update-assistant/" + businessId);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    },
  });
};
