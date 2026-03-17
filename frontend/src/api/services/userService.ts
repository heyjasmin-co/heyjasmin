import { AxiosInstance } from "axios";
import { IUser, UserMeResponse } from "../../types/UserTypes";

export const userService = (apiClient: AxiosInstance) => ({
  me: async () => {
    const response = await apiClient.get<UserMeResponse>("/users/me");
    return response.data;
  },

  getUserByClerkId: async (clerkId: string) => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: IUser;
    }>(`/users/${clerkId}`);
    return response.data;
  },

  getUserBusinesses: async () => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: {
        _id: string;
        role: string;
        businessId: string;
        businessName: string;
      }[];
    }>("/users/user-businesses");
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/users/logout");
    return response.data;
  },

  selectBusiness: async (businessId: string, data: { role: string }) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>(`/users/select-business/${businessId}`, data);
    return response.data;
  },
});
