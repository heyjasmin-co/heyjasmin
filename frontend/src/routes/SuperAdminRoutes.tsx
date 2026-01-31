import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SuperAdminLayout from "../components/SuperAdmin/SuperAdminLayout";
import Login from "../pages/SuperAdmin/auth/Login";
import ResetPassword from "../pages/SuperAdmin/auth/ResetPassword";
import Signup from "../pages/SuperAdmin/auth/Signup";
import BusinessesList from "../pages/SuperAdmin/dashboard/BusinessesList";
import Settings from "../pages/SuperAdmin/dashboard/Settings";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("superAdminToken");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/super-admin/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>; // Or a spinner
  if (!isAuthenticated) return null;

  return <>{children}</>;
};

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="dashboard/businesses" replace />}
      />

      {/* Auth Routes */}
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ResetPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Dashboard Routes */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="businesses" replace />} />
        <Route path="businesses" element={<BusinessesList />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default SuperAdminRoutes;
