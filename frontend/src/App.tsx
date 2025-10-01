import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Admin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout with Outlet */}
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="calls" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
          <Route path="account" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
