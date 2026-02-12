import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../lib/axios";
import { scrapeService } from "../services/scrapeService";

export const useScrapeWebsite = () => {
  const apiClient = useApiClient();
  const service = scrapeService(apiClient);

  return useMutation({
    mutationFn: (data: { url: string; businessId: string }) =>
      service.scrapeWebsite(data),
  });
};
