import { useUser } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useMemo } from "react";
import { UserData, useUserDataQuery } from "../hooks/useUser";

interface UserDataContextType {
  userData: UserData | null;
  loading: boolean;
  updateUserData: (data: Partial<UserData>) => void;
  refreshUserData: () => Promise<void>;
  setUserData: (data: UserData | null) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();
  const queryClient = useQueryClient();

  const { data: userData, isLoading: loading } = useUserDataQuery(
    isSignedIn === true,
  );

  const updateUserData = useCallback(
    (data: Partial<UserData>) => {
      queryClient.setQueryData(["user-data"], (prev: UserData | undefined) =>
        prev ? { ...prev, ...data } : undefined,
      );
    },
    [queryClient],
  );

  const setUserData = useCallback(
    (data: UserData | null) => {
      queryClient.setQueryData(["user-data"], data);
    },
    [queryClient],
  );

  const refreshUserData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["user-data"] });
  }, [queryClient]);

  const contextValue = useMemo(
    () => ({
      userData: userData || null,
      loading,
      updateUserData,
      refreshUserData,
      setUserData,
    }),
    [userData, loading, refreshUserData, setUserData, updateUserData],
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
