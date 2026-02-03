import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminRoutes, LandingRoutes, SuperAdminRoutes } from "./routes";

import ScrollToTop from "./components/common/ScrollToTop";
import { UserDataProvider } from "./context/UserDataContext";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/*" element={<LandingRoutes />} />

          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Super Admin routes */}
          <Route path="/super-admin/*" element={<SuperAdminRoutes />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  );
}
