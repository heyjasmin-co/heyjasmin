import About from "../../../components/Landing/HomePage/About";
import CTA from "../../../components/Landing/HomePage/CTA";
import FAQ from "../../../components/Landing/HomePage/FAQ";
import Features from "../../../components/Landing/HomePage/Features";
import HeroSection from "../../../components/Landing/HomePage/HeroSection";
import HowWorks from "../../../components/Landing/HomePage/HowWorks";
import Industries from "../../../components/Landing/HomePage/Industries";
import Pricing from "../../../components/Landing/HomePage/Pricing";
import Statistics from "../../../components/Landing/HomePage/Statistics";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <Statistics />
      <Features />
      <Industries />
      <HowWorks />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
