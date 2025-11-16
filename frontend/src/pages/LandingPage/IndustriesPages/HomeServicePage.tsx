import HomeServiceHero from "../../../assets/image/industries/HomeServiceHero.png";
import IndustryFeatureSection from "../../../components/Landing/IndustriesPages/IndustryFeaturesSection";
import IndustryHeroSection from "../../../components/Landing/IndustriesPages/IndustryHeroSection";
import { MissedRevenueSection } from "../../../components/Landing/IndustriesPages/MissedRevenueSection";

function HomeServicePage() {
  const homeServiceData = [
    { calls: 100, missedCalls: 25, missedJobs: 18, lostRevenue: "$2,100" },
    { calls: 200, missedCalls: 60, missedJobs: 42, lostRevenue: "$4,800" },
    { calls: 500, missedCalls: 130, missedJobs: 96, lostRevenue: "$10,500" },
  ];

  return (
    <div>
      <IndustryHeroSection
        titleLines={["Never miss a call.", "Never miss a job."]}
        highlightText="Meet Jasmin — your home service business’s 24/7 phone assistant."
        description="Jasmin answers every call, books appointments, and helps you capture more jobs — even when you’re on the road or with a client."
        placeholder="Enter your business name"
        ctaText="Get Started"
        trialNote="Try Jasmin free for 7 days — no credit card required."
        heroImage={HomeServiceHero}
        statCard={{
          icon: "fa-solid fa-house",
          title: "New Jobs Scheduled",
          value: "82",
          subtitle: "this month",
          trend: "+31%",
          trendColor: "text-green-500",
        }}
      />

      <IndustryFeatureSection
        title={["Never Miss a Call.", "Never Miss a Job."]}
        subtitle="Jasmin helps your home service business run smoothly — no missed calls, no lost revenue."
        description="Built for plumbers, electricians, cleaners, HVAC techs, and repair pros, Jasmin handles your calls, books clients, and keeps your schedule full while you focus on the work."
        features={[
          {
            icon: "fa-solid fa-phone-volume",
            title: "Answers every call instantly",
            description: "even when you’re busy on a job site.",
          },
          {
            icon: "fa-solid fa-calendar-check",
            title: "Books appointments automatically",
            description: "so you never lose another customer to voicemail.",
          },
          {
            icon: "fa-solid fa-dollar-sign",
            title: "Turns missed calls into revenue",
            description: "by capturing every opportunity, 24/7.",
          },
        ]}
      />

      <MissedRevenueSection
        title="Missed Calls = Missed Jobs"
        subtitle="Every missed call could mean a lost client — and lost revenue."
        averageJob="Home Service"
        averageRevenue="$200–$400+"
        data={homeServiceData}
        ctaLabel="Start your free trial"
        ctaLink="/admin/setup"
        icon="fa-solid fa-toolbox"
      />
    </div>
  );
}

export default HomeServicePage;
