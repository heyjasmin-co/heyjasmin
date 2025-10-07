import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireSubscription?: boolean;
  requireSetup?: boolean;
};
export default function ProtectedRoute({
  children,
  requireSubscription = false,
  requireSetup = false,
}: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useUser();
  const { userData, loading } = useUserData();
  const location = useLocation();

  if (!isLoaded || loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/admin/sign-in" state={{ from: location }} replace />;
  }

  if (requireSetup && userData && !userData.hasCompletedSetup) {
    return <Navigate to="/admin/setup" replace />;
  }

  if (requireSubscription && userData && !userData.hasSubscription) {
    return <Navigate to="/admin/subscription" replace />;
  }

  return <>{children}</>;
}
