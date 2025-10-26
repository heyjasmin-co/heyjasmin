import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const { userData, loading } = useUserData();
  if (!isLoaded || loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }
  if (!isSignedIn) {
    return <Navigate to="/admin/sign-in" replace />;
  }
  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }
  if (!userData?.businessId) {
    return <Navigate to="/admin/select-business" replace />;
  }
  if (!userData?.isSetupComplete) {
    return <Navigate to="/admin/setup" replace />;
  }
  if (!userData?.hasSubscription) {
    return <Navigate to="/admin/subscription" replace />;
  }

  return <>{children}</>;
}
