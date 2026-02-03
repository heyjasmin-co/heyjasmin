import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient, useScrapeApiClient } from "../lib/axios";
import { BusinessDetailsType, IBusinessHour } from "../types/BusinessTypes";

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

export const useUpdateBusinessInformation = (businessId?: string) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      overview: string;
      address: string;
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>(`/businesses/information/${businessId}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    },
  });
};

export const useUpdateBusinessServices = (businessId?: string) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (services: string[]) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: string[];
      }>(`/businesses/services/${businessId}`, { services });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    },
  });
};

export const useUpdateBusinessHours = (businessId?: string) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (businessHours: IBusinessHour[]) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: IBusinessHour[];
      }>(`/businesses/hours/${businessId}`, { businessHours });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    },
  });
};

export const useUpdateBusinessAppointment = (businessId?: string) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      appointmentEnabled: boolean;
      appointmentMessage: string | null;
      schedulingLink: string | null;
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: BusinessDetailsType["appointmentSettings"];
      }>(`/businesses/appointment/${businessId}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    },
  });
};
