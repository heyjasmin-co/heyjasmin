import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetMe } from "../hooks/api/useUserQueries";
import { queryClient } from "../lib/react-query";
import { UserData } from "../types/UsersTypes";

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
  /* const [userData, setUserData] = useState<UserData | null>(null);
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
  }; */

  const { data: userDataStr, isLoading } = useGetMe(!!user && !!isSignedIn);

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (userDataStr) {
      setUserData(userDataStr);
    } else if (!isLoading && !userDataStr) {
      // Fallback user data or just null if not logged in
      if (user && isSignedIn) {
        // If logged in but failed to fetch/empty
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
      } else {
        setUserData(null);
      }
    }
  }, [userDataStr, isLoading, user, isSignedIn]);

  const loading = isLoading;

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => (prev ? { ...prev, ...data } : null));
  };

  const refreshUserData = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users", "me"] });
  };

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
