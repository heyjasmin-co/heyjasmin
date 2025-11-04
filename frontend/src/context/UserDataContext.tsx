/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { useApiClient } from "../lib/axios";
import { errorToast } from "../utils/react-toast";

export interface UserData {
  dbUserId?: string | null;
  clerkId?: string | null;
  businessId?: string | null;
  isSetupComplete?: boolean | null;
  hasSubscription?: boolean | null;
  assistantNumber?: string | null;
  businessName?: string | null;
  subscriptionNumbersLeft?: string | null;
  role?: string | null;
}

interface UserDataContextType {
  userData: UserData | null;
  loading: boolean;
  updateUserData: (data: Partial<UserData>) => void;
  refreshUserData: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useUser();
  const apiClient = useApiClient();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get<{
        message: string;
        success: boolean;
        data: UserData;
      }>("/users/me");

      if (response.data?.success && response.data?.data) {
        setUserData(response.data.data);
      } else {
        throw new Error(response.data?.message || "Failed to fetch user data");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "An unexpected error occurred while fetching user data.";
      errorToast(message);
      throw error;
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => (prev ? { ...prev, ...data } : null));
  };

  const refreshUserData = async () => {
    if (!user || !isSignedIn) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await fetchUserData();
    } catch (error) {
      console.error("Failed to fetch user data:", error);

      setUserData({
        dbUserId: null,
        clerkId: null,
        businessId: null,
        isSetupComplete: false,
        hasSubscription: false,
        role: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchUserData();
  }, [isSignedIn]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        loading,
        updateUserData,
        refreshUserData,
        setUserData,
        fetchUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
