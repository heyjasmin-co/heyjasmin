import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";

export const useLogout = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post("/users/logout");
      return data;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useSelectBusiness = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      role,
    }: {
      businessId: string;
      role: string;
    }) => {
      const { data } = await apiClient.post(
        `/users/select-business/${businessId}`,
        {
          role,
        },
      );
      return data;
    },
    onSuccess: () => {
      // Invalidate relevant queries or handle success side effects if needed
      // For example, if selecting a business changes the user data:
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });
};
