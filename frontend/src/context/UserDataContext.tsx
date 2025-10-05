import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface UserData {
  id: string;
  email: string;
  hasSubscription: boolean;
  hasCompletedSetup: boolean;
  subscriptionStatus: "trial" | "active" | "expired" | "none";
  businessName?: string;
  websiteUrl?: string;
  trialEndsAt?: Date;
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

      // Replace with your actual API endpoint
      const response = await fetch(`/api/users/${user.id}`);
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);

      // Fallback data for development
      setUserData({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        hasSubscription: false,
        hasCompletedSetup: false,
        subscriptionStatus: "none",
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
