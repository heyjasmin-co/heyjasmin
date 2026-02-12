import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { queryKeys } from "../QueryKeys";
import { callService } from "../services/callService";

export const useBusinessCalls = (
  businessId: string | null | undefined,
  params?: { page?: number; limit?: number },
) => {
  const apiClient = useApiClient();
  const service = callService(apiClient);

  return useQuery({
    queryKey: queryKeys.calls.list(businessId || "", params),
    queryFn: () => service.getCallsByBusinessId(businessId || ""),
    enabled: !!businessId,
  });
};

export const useCallDetails = (
  callId: string | null | undefined,
  businessId: string,
) => {
  const apiClient = useApiClient();
  const service = callService(apiClient);

  return useQuery({
    queryKey: queryKeys.calls.details(callId || ""),
    queryFn: () => service.getCallById(callId || "", { businessId }),
    enabled: !!callId && !!businessId,
  });
};
