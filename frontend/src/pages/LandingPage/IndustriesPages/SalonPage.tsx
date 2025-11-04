import SalonHero from "../../../assets/image/industries/SalonHero.png";
import IndustryFeatureSection from "../../../components/Landing/IndustriesPages/IndustryFeaturesSection";
import IndustryHeroSection from "../../../components/Landing/IndustriesPages/IndustryHeroSection";
import { MissedRevenueSection } from "../../../components/Landing/IndustriesPages/MissedRevenueSection";
function SalonPage() {
  const salonData = [
    { calls: 100, missedCalls: 28, missedJobs: 21, lostRevenue: "$1,050" },
    { calls: 200, missedCalls: 54, missedJobs: 42, lostRevenue: "$2,750" },
    { calls: 500, missedCalls: 140, missedJobs: 105, lostRevenue: "$5,250" },
  ];

  return (
    <div>
      <IndustryHeroSection
        titleLines={["Keep your chairs full."]}
        highlightText="Meet Jasmin — your salon’s 24/7 front desk assistant."
        description="Jasmin helps your salon stay fully booked by answering calls, scheduling clients, and managing appointments — even after hours."
        placeholder="Enter your salon name"
        ctaText="Get Started"
        trialNote="Try Jasmin free for 7 days — no credit card required."
        heroImage={SalonHero}
        statCard={{
          icon: "fa-solid fa-scissors",
          title: "New Bookings",
          value: "49",
          subtitle: "this month",
          trend: "+36%",
          trendColor: "text-green-500",
        }}
      />

      <IndustryFeatureSection
        title={["Never Miss a Call.", "Never Miss a Client."]}
        subtitle="Jasmin turns phone call interruptions into loyal patrons and booked services, completely hands-free."
        description="Jasmin is your AI-powered call manager, built for busy salon pros who want to focus entirely on styling, coloring, cutting, and pampering clients."
        features={[
          {
            icon: "fa-phone",
            title: "She answers every call",
            description: "while your hands are on the client.",
          },
          {
            icon: "fa-heart",
            title: "qualifies leads",
            description: "and books appointments day or night.",
          },
          {
            icon: "fa-calendar-check",
            title: "fills your books",
            description: "so you never turn away repeat business.",
          },
        ]}
      />

      <MissedRevenueSection
        title="Missed Calls = Missed Revenue"
        subtitle="Uncovering the hidden cost of a missed call"
        averageJob="Haircut"
        averageRevenue="$50-100+"
        data={salonData}
        ctaLabel="Start your free trial"
        ctaLink="/admin"
        icon="fa-scissors"
      />
    </div>
  );
}

export default SalonPage;
