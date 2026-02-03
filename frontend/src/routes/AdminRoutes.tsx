import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import { RouteGuard } from "../components/Auth/RouteGuard";
import CallDetails from "../components/calls/CallDetails";
import Loading from "../components/Loading";

const Main = lazy(() => import("../pages/Admin"));
const JoinOrganization = lazy(
  () => import("../pages/Admin/Auth/JoinOrganization"),
);
const Login = lazy(() => import("../pages/Admin/Auth/Login"));
const Register = lazy(() => import("../pages/Admin/Auth/Register"));
const BusinessProfileSetup = lazy(
  () => import("../pages/Admin/BusinessProfileSetup"),
);
const AccountPage = lazy(() => import("../pages/Admin/Dashboard/Account"));
const AccountDetailsPage = lazy(
  () => import("../pages/Admin/Dashboard/Account/AccountDetailsPage"),
);
const BillingPage = lazy(
  () => import("../pages/Admin/Dashboard/Account/BillingPage"),
);
const UsersPage = lazy(
  () => import("../pages/Admin/Dashboard/Account/UsersPage"),
);
const CallsPage = lazy(() => import("../pages/Admin/Dashboard/Calls"));
const CallInfo = lazy(() => import("../pages/Admin/Dashboard/Calls/CallInfo"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard/GuidedStep"));
const Settings = lazy(() => import("../pages/Admin/Dashboard/Settings"));
const AppointmentInfo = lazy(
  () => import("../pages/Admin/Dashboard/Settings/AppointmentInfo"),
);
const BusinessDetailsPage = lazy(
  () => import("../pages/Admin/Dashboard/Settings/BusinessDetailsPage"),
);
const SelectBusiness = lazy(() => import("../pages/Admin/SelectBusiness"));

const AdminRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" replace />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="accept-invitation" element={<JoinOrganization />} />

        <Route
          path="select-business"
          element={
            <ProtectedRoute>
              <SelectBusiness />
            </ProtectedRoute>
          }
        />

        <Route path="setup" element={<BusinessProfileSetup />} />

        <Route
          path="dashboard"
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
            <Route index element={<Navigate to="account-settings" replace />} />
            <Route path="account-settings" element={<AccountDetailsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="billing" element={<BillingPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="sign-in" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
