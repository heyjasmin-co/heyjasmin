import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import CallDetails from "./components/calls/CallDetails";

import { RouteGuard } from "./components/Auth/RouteGuard";
import { UserDataProvider } from "./context/UserDataContext";
import Main from "./pages/Admin";
import Login from "./pages/Admin/Auth/Login";
import Register from "./pages/Admin/Auth/Register";
import BusinessProfileSetup from "./pages/Admin/BusinessProfileSetup";
import AccountPage from "./pages/Admin/Dashboard/Account";
import AccountDetailsPage from "./pages/Admin/Dashboard/Account/AccountDetailsPage";
import BillingPage from "./pages/Admin/Dashboard/Account/BillingPage";
import UsersPage from "./pages/Admin/Dashboard/Account/UsersPage";
import CallsPage from "./pages/Admin/Dashboard/Calls";
import CallInfo from "./pages/Admin/Dashboard/Calls/CallInfo";
import Dashboard from "./pages/Admin/Dashboard/GuidedStep";
import Settings from "./pages/Admin/Dashboard/Settings";
import AppointmentInfo from "./pages/Admin/Dashboard/Settings/AppointmentInfo";
import BusinessDetailsPage from "./pages/Admin/Dashboard/Settings/BusinessDetailsPage";
import SubscriptionPage from "./pages/Admin/Subscription";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/sign-in" element={<Login />} />
          <Route path="/admin/sign-up" element={<Register />} />

          {/* Subscription page - requires auth + subscription */}
          <Route
            path="/admin/subscription"
            element={
              <ProtectedRoute requireSetup>
                <SubscriptionPage />
              </ProtectedRoute>
            }
          />

          {/* Setup page - requires auth only */}
          <Route
            path="/admin/setup"
            element={
              <ProtectedRoute>
                <BusinessProfileSetup />
              </ProtectedRoute>
            }
          />

          {/* Dashboard routes - requires auth + subscription + setup */}
          <Route
            path="/admin/dashboard"
            element={
              <RouteGuard>
                <Main />
              </RouteGuard>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Calls nested routes */}
            <Route path="calls" element={<CallsPage />}>
              <Route index element={<CallInfo />} />
              <Route path="call-details/:callId" element={<CallDetails />} />
            </Route>

            {/* Settings nested routes */}
            <Route path="settings" element={<Settings />}>
              <Route index element={<Navigate to="business-info" replace />} />
              <Route path="business-info" element={<BusinessDetailsPage />} />
              <Route path="appointments" element={<AppointmentInfo />} />
            </Route>

            {/* Account nested routes */}
            <Route path="account" element={<AccountPage />}>
              <Route
                index
                element={<Navigate to="account-settings" replace />}
              />
              <Route path="account-settings" element={<AccountDetailsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="billing" element={<BillingPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  );
}
