import { AxiosInstance } from "axios";
import {
  BusinessDetailsType,
  IBusinessHour,
  ITransferScenario,
} from "../../types/BusinessTypes";

export const businessService = (apiClient: AxiosInstance) => ({
  getDetails: async (businessId: string) => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/${businessId}`);
    return response.data;
  },

  updateAssistant: async (businessId: string) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/update-assistant/${businessId}`);
    return response.data;
  },

  updateDetails: async (
    businessId: string,
    data: Partial<BusinessDetailsType>,
  ) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/${businessId}`, data);
    return response.data;
  },

  updateInformation: async (
    businessId: string,
    data: { name: string; overview: string; address: string },
  ) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/information/${businessId}`, data);
    return response.data;
  },

  updateHours: async (businessId: string, businessHours: IBusinessHour[]) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/hours/${businessId}`, { businessHours });
    return response.data;
  },

  updateServices: async (businessId: string, services: string[]) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/services/${businessId}`, { services });
    return response.data;
  },

  updateAppointment: async (
    businessId: string,
    data: {
      appointmentEnabled: boolean;
      appointmentMessage: string;
      schedulingLink: string;
    },
  ) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/appointment/${businessId}`, data);
    return response.data;
  },

  updateTransferScenario: async (
    businessId: string,
    scenario: ITransferScenario,
  ) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/update-transfer-scenario/${businessId}`, scenario);
    return response.data;
  },

  deleteTransferScenario: async (businessId: string, scenarioId: string) => {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/delete-transfer-scenario/${businessId}/${scenarioId}`);
    return response.data;
  },

  updateAssistantSetup: async (
    businessId: string,
    data: {
      assistantName?: string;
      greetingMessage?: string;
      assistantSetup?: string;
    },
  ) => {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>(`/businesses/update-assistant-setup/${businessId}`, data);
    return response.data;
  },

  createBusinessFromGoogle: async (data: {
    name: string;
    address?: string;
    website?: string;
    phoneNumber?: string;
    googlePlaceId?: string;
  }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: BusinessDetailsType;
    }>("/businesses", data);
    return response.data;
  },
});
