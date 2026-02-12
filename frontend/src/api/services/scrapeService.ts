import { AxiosInstance } from "axios";

export const scrapeService = (apiClient: AxiosInstance) => ({
  scrapeWebsite: async (data: { url: string; businessId: string }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: {
        websiteUrl: string;
        content: string;
        businessId: string;
      };
    }>("/scrape-website", data);
    return response.data;
  },
});
