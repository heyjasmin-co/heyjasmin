import { Outlet } from "react-router-dom";

export default function IndustriesPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Outlet for nested industry pages */}
      <Outlet />
    </div>
  );
}
