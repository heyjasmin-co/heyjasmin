import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import {
  BusinessDetailsType,
  IBusinessHour,
  ITransferScenario,
  ICreateCallTransferTool,
  IUpdateCallTransferTool,
} from "../../types/BusinessTypes";
import { queryKeys } from "../QueryKeys";
import { businessService } from "../services/businessService";

export const useBusinessDetails = (businessId: string | null | undefined) => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);

  return useQuery({
    queryKey: queryKeys.business.details(businessId || ""),
    queryFn: () => service.getDetails(businessId || ""),
    enabled: !!businessId,
  });
};

export const useUpdateAssistant = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (businessId: string) => service.updateAssistant(businessId),
    onSuccess: (_, businessId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useUpdateBusinessDetails = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: Partial<BusinessDetailsType>;
    }) => service.updateDetails(businessId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.me(),
      });
    },
  });
};

export const useUpdateBusinessInformation = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: { name: string; overview: string; address: string };
    }) => service.updateInformation(businessId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useUpdateBusinessHours = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      businessHours,
    }: {
      businessId: string;
      businessHours: IBusinessHour[];
    }) => service.updateHours(businessId, businessHours),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useUpdateBusinessServices = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      services,
    }: {
      businessId: string;
      services: string[];
    }) => service.updateServices(businessId, services),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useUpdateAppointmentSettings = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: {
        appointmentEnabled: boolean;
        appointmentMessage: string;
        schedulingLink: string;
      };
    }) => service.updateAppointment(businessId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useUpdateTransferScenario = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      scenario,
    }: {
      businessId: string;
      scenario: ITransferScenario;
    }) => service.updateTransferScenario(businessId, scenario),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useDeleteTransferScenario = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      scenarioId,
    }: {
      businessId: string;
      scenarioId: string;
    }) => service.deleteTransferScenario(businessId, scenarioId),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useUpdateAssistantSetup = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: {
        assistantName?: string;
        greetingMessage?: string;
        assistantSetup?: string;
      };
    }) => service.updateAssistantSetup(businessId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useCreateBusinessFromGoogle = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      address?: string;
      website?: string;
      phoneNumber?: string;
      googlePlaceId?: string;
    }) => service.createBusinessFromGoogle(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.all,
      });
      return response;
    },
  });
};

export const useCallTransferTool = (businessId: string | null | undefined) => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);

  return useQuery({
    queryKey: queryKeys.business.callTransferTool(businessId || ""),
    queryFn: () => service.getCallTransferTool(businessId || ""),
    enabled: !!businessId,
  });
};

export const useCreateCallTransferTool = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: ICreateCallTransferTool;
    }) => service.createCallTransferTool(businessId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.callTransferTool(businessId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};

export const useUpdateCallTransferTool = () => {
  const apiClient = useApiClient();
  const service = businessService(apiClient);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: IUpdateCallTransferTool;
    }) => service.updateCallTransferTool(businessId, data),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.callTransferTool(businessId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.business.details(businessId),
      });
    },
  });
};
