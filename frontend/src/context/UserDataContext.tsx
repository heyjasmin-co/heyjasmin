import { useUser } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { queryKeys } from "../api/QueryKeys";
import { useMe } from "../api/hooks/useUserQueries";

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
  const { isSignedIn } = useUser();
  const queryClient = useQueryClient();

  const { data: meResponse, isLoading, refetch } = useMe();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (meResponse?.data) {
      // If the API returns UserMeResponse (user + businessUser), map it.
      // If it returns UserData, this might need adjustment.
      // Assuming UserMeResponse for now based on UserTypes.ts
      const data = meResponse.data;
      if ("user" in data) {
        setUserData({
          dbUserId: data.user._id,
          clerkId: data.user.clerkId,
          businessId: data.businessUser?.businessId || null,
          isSetupComplete: !!data.businessUser, // simplified
          role: data.businessUser?.role || null,
          assistantNumber: null, // these might come from elsewhere
          businessName: null,
          subscription: null,
        });
      } else {
        setUserData(data as unknown as UserData);
      }
    } else if (!isSignedIn) {
      setUserData(null);
    }
  }, [meResponse, isSignedIn]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => (prev ? { ...prev, ...data } : null));
  };

  const refreshUserData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    await refetch();
  }, [queryClient, refetch]);

  const contextValue = useMemo(
    () => ({
      userData,
      loading: isLoading,
      updateUserData,
      refreshUserData,
      setUserData,
    }),
    [userData, isLoading, refreshUserData],
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
