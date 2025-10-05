import CTA from "../../components/Landing/CTA";
import FAQ from "../../components/Landing/FAQ";
import Features from "../../components/Landing/Features";
import Footer from "../../components/Landing/Footer";
import HeroSection from "../../components/Landing/HeroSection";
import HowWorks from "../../components/Landing/HowWorks";
import Industries from "../../components/Landing/Industries";
import Navbar from "../../components/Landing/Navbar";
import Pricing from "../../components/Landing/Pricing";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Features */}
      <Features />

      {/* Pricing / Subscriptions */}
      <Pricing />

      {/* How It Works */}
      <HowWorks />

      {/* Industries */}
      <Industries />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
