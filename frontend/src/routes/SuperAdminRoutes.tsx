import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SuperAdminLayout from "../components/SuperAdmin/SuperAdminLayout";

const Login = lazy(() => import("../pages/SuperAdmin/auth/Login"));
const Signup = lazy(() => import("../pages/SuperAdmin/auth/Signup"));
const ResetPassword = lazy(
  () => import("../pages/SuperAdmin/auth/ResetPassword"),
);
const VerifyEmailChange = lazy(
  () => import("../pages/SuperAdmin/auth/VerifyEmailChange"),
);
const BusinessesList = lazy(
  () => import("../pages/SuperAdmin/dashboard/BusinessesList"),
);
const UsersList = lazy(() => import("../pages/SuperAdmin/dashboard/UsersList"));
const Settings = lazy(() => import("../pages/SuperAdmin/dashboard/Settings"));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("superAdminToken");

  useEffect(() => {
    if (!token) {
      navigate("/super-admin/auth/login");
    }
  }, [token, navigate]);

  return token ? <>{children}</> : null;
};

const SuperAdminRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-purple-600"></i>
        </div>
      }
    >
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route
          path="/auth/verify-email-change"
          element={<VerifyEmailChange />}
        />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="businesses" element={<BusinessesList />} />
          <Route path="users" element={<UsersList />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<Navigate to="businesses" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/super-admin/auth/login" />} />
      </Routes>
    </Suspense>
  );
};

export default SuperAdminRoutes;
