import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useApiClient } from "../lib/axios";

export interface UserData {
  dbUserId: string | null;
  clerkId: string | null;
  businessId: string | null;
  isSetupComplete: boolean;
  role: string | null;
  assistantNumber: string | null;
  businessName: string | null;
  subscription: SubscriptionDetails | null;
}

export interface SubscriptionDetails {
  plan: "essential" | "pro" | "plus" | "trial";
  remainingMinutes: number | "unlimited";
  remainingMinutesFormatted: string;
  usedMinutes: number;
  stripePriceId: string | null;
  status:
    | "trial_active"
    | "trial_ended"
    | "canceled"
    | "active"
    | "inactive"
    | "unpaid";
}

interface UserDataContextType {
  userData: UserData | null;
  loading: boolean;
  updateUserData: (data: Partial<UserData>) => void;
  refreshUserData: () => Promise<void>;
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
    if (!user || !isSignedIn) {
      setUserData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.get<{
        message: string;
        success: boolean;
        data: UserData;
      }>("/users/me");

      setUserData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);

      // Fallback user data
      setUserData({
        dbUserId: null,
        clerkId: null,
        businessId: null,
        isSetupComplete: false,
        role: null,
        assistantNumber: null,
        businessName: null,
        subscription: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => (prev ? { ...prev, ...data } : null));
  };

  const refreshUserData = async () => {
    await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, [isSignedIn]);

  const contextValue = useMemo(
    () => ({ userData, loading, updateUserData, refreshUserData, setUserData }),
    [userData, loading],
  );

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
