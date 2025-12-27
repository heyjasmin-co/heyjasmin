import realEstateImage from "../../../assets/image/industries/clinicImage.jpeg";
import IndustryFeatureSection from "../../../components/Landing/IndustriesPages/IndustryFeaturesSection";
import IndustryHeroSection from "../../../components/Landing/IndustriesPages/IndustryHeroSection";
import { MissedRevenueSection } from "../../../components/Landing/IndustriesPages/MissedRevenueSection";

function RealEstatePage() {
  const realEstateData = [
    { calls: 100, missedCalls: 25, missedJobs: 18, lostRevenue: "$12,000" },
    { calls: 200, missedCalls: 60, missedJobs: 45, lostRevenue: "$28,500" },
    { calls: 500, missedCalls: 130, missedJobs: 100, lostRevenue: "$60,000" },
  ];

  return (
    <div>
      <IndustryHeroSection
        titleLines={["Never miss a buyer call.", "Never lose a property deal."]}
        highlightText="Meet Jasmin — your real estate agency’s 24/7 virtual assistant."
        description="Jasmin helps real estate agents stay responsive — answering every call, capturing new leads, and booking property showings even when you’re busy or off the clock."
        placeholder="Enter your agency name"
        ctaText="Get Started"
        trialNote="Try Jasmin free for 7 days — no credit card required."
        heroImage={realEstateImage}
           chatBubbles={[
    {
      sender: "user",
      message: "Hi, I’m interested in scheduling a viewing for a 3-bedroom house.",
    },
    {
      sender: "bot",
      message: "Sure! I can help with that. What date works best for you?",
    },
    {
      sender: "bot",
      message: "Your property tour is booked for tomorrow at 4:00 PM.",
    },
  ]}
        statCard={{
          icon: "fa-solid fa-house-chimney",
          title: "Leads Captured",
          value: "156",
          subtitle: "this month",
          trend: "+34%",
          trendColor: "text-green-500",
        }}
      />

      <IndustryFeatureSection
        title={["No Missed Calls.", "No Missed Opportunities."]}
        subtitle="Jasmin ensures every property inquiry turns into a potential client."
        description="For agents, brokers, and real estate offices, Jasmin provides 24/7 call coverage — answering inquiries, scheduling tours, and qualifying leads so you can focus on closing deals."
        features={[
          {
            icon: "fa-solid fa-phone-volume",
            title: "Answers every client inquiry",
            description: "so you never miss a potential buyer or seller again.",
          },
          {
            icon: "fa-solid fa-calendar-check",
            title: "Books property tours automatically",
            description:
              "keeping your schedule full of qualified leads and showings.",
          },
          {
            icon: "fa-solid fa-chart-line",
            title: "Increases conversions and client satisfaction",
            description:
              "by ensuring every call gets answered — even after hours.",
          },
        ]}
      />

      <MissedRevenueSection
        title="Missed Calls = Missed Deals"
        subtitle="Each unanswered call could mean a lost listing, buyer, or commission."
        averageJob="Property Sale or Rental Lead"
        averageRevenue="$3,000–$10,000+"
        data={realEstateData}
        ctaLabel="Start your free trial"
        ctaLink="/admin/setup"
        icon="fa-solid fa-house"
      />
    </div>
  );
}

export default RealEstatePage;
