import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, useScrapeApiClient } from "../../lib/axios";
import {
  BusinessCreationType,
  BusinessDetailsType,
  GoogleBusinessScrapeType,
  IBusinessHour,
} from "../../types/BusinessTypes";

export const useScrapeWebsite = () => {
  const scrapeApiClient = useScrapeApiClient();

  return useMutation({
    mutationFn: async ({ websiteUrl }: { websiteUrl: string }) => {
      const { data } = await scrapeApiClient.post<{
        message: string;
        data: BusinessCreationType;
        success: boolean;
      }>(`/scrape`, {
        websiteUrl,
      });
      return data;
    },
  });
};

export const useScrapeGoogleBusiness = () => {
  const scrapeApiClient = useScrapeApiClient();

  return useMutation({
    mutationFn: async (data: GoogleBusinessScrapeType) => {
      const response = await scrapeApiClient.post<{
        message: string;
        success: boolean;
        data: BusinessCreationType;
      }>(`/businesses`, data);
      return response.data;
    },
  });
};

export const useUpdateBusinessProfile = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      data,
    }: {
      businessId: string;
      data: Partial<BusinessDetailsType>;
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>(`/businesses/${businessId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business", variables.businessId],
      });
    },
  });
};

export const useUpdateBusinessInfo = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      data,
    }: {
      businessId: string;
      data: { name: string; overview: string; address: string };
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: { name: string; overview: string; address: string };
      }>(`/businesses/information/${businessId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business", variables.businessId],
      });
      // queryClient.invalidateQueries({ queryKey: ["user-businesses"] }); // Optional
    },
  });
};

export const useUpdateCoreServices = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      services,
    }: {
      businessId: string;
      services: string[];
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: string[];
      }>(`/businesses/services/${businessId}`, { services });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business", variables.businessId],
      });
    },
  });
};

export const useUpdateBusinessHours = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      businessHours,
    }: {
      businessId: string;
      businessHours: IBusinessHour[];
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: IBusinessHour[];
      }>(`/businesses/hours/${businessId}`, { businessHours });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business", variables.businessId],
      });
    },
  });
};

export const useUpdateAppointmentSettings = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      data,
    }: {
      businessId: string;
      data: {
        appointmentEnabled: boolean;
        appointmentMessage: string;
        schedulingLink: string;
      };
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: {
          appointmentSettings: {
            appointmentEnabled: boolean;
            appointmentMessage: string;
            schedulingLink: string;
          };
        };
      }>(`/businesses/appointment/${businessId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business", variables.businessId],
      });
    },
  });
};

export const useUpdateAssistantSetup = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      assistantSetup,
    }: {
      businessId: string;
      assistantSetup: string;
    }) => {
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: { assistantSetup: string; twilioNumber?: string };
      }>(`/businesses/update-assistant-setup/${businessId}`, {
        assistantSetup,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["business", variables.businessId],
      });
    },
  });
};

export const useUpdateAssistant = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (businessId: string) => {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>(`/businesses/update-assistant/${businessId}`);
      return response.data;
    },
    onSuccess: (_, businessId) => {
      queryClient.invalidateQueries({
        queryKey: ["business", businessId],
      });
    },
  });
};
