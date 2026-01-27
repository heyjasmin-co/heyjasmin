import { BusinessDetailsType } from "@/types/BusinessTypes";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";

export const useGetBusinessDetails = (businessId: string | null) => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["business", businessId],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        success: boolean;
        data: BusinessDetailsType;
        message: string;
      }>(`/businesses/${businessId}`);
      return data.data;
    },
    enabled: !!businessId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
