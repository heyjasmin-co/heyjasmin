import { Outlet } from "react-router-dom";
import Footer from "../../components/Landing/Footer";
import Navbar from "../../components/Landing/Navbar";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Navbar />

      {/* Render nested routes here */}
      <Outlet />

      <Footer />
    </div>
  );
}
