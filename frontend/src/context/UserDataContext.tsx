import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiClient } from "../lib/axios";

export interface UserData {
  dbUserId: string | null;
  clerkId: string | null;
  businessId: string | null;
  isSetupComplete: boolean;
  hasSubscription: boolean;
  subscriptionStatus: "trial" | "active" | "expired" | "none";
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

  const [userData, setUserData] = useState<UserData | null>({
    dbUserId: null,
    clerkId: null,
    businessId: null,
    isSetupComplete: false,
    hasSubscription: false,
    subscriptionStatus: "trial",
  });
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    if (!user || !isSignedIn) {
      setUserData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await apiClient(`/users/me`);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);

      // Fallback data for development
      setUserData({
        dbUserId: null,
        clerkId: null,
        businessId: null,
        isSetupComplete: false,
        hasSubscription: false,
        subscriptionStatus: "trial",
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
  }, [user, isSignedIn]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        loading,
        updateUserData,
        refreshUserData,
        setUserData,
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
