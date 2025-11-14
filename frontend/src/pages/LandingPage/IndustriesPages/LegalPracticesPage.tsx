import legalPracticesImage from "../../../assets/image/industries/legalPracticesImage.jpeg";
import IndustryFeatureSection from "../../../components/Landing/IndustriesPages/IndustryFeaturesSection";
import IndustryHeroSection from "../../../components/Landing/IndustriesPages/IndustryHeroSection";
import { MissedRevenueSection } from "../../../components/Landing/IndustriesPages/MissedRevenueSection";

function LegalPracticesPage() {
  const legalPracticeData = [
    { calls: 100, missedCalls: 22, missedJobs: 15, lostRevenue: "$4,500" },
    { calls: 200, missedCalls: 50, missedJobs: 35, lostRevenue: "$10,200" },
    { calls: 500, missedCalls: 120, missedJobs: 90, lostRevenue: "$22,800" },
  ];

  return (
    <div>
      <IndustryHeroSection
        titleLines={["Never miss a client inquiry.", "Never miss a case."]}
        highlightText="Meet Jasmin — your law firm’s 24/7 virtual receptionist."
        description="Jasmin helps legal professionals stay connected — answering every client call, booking consultations, and ensuring you never lose a potential case due to a missed call."
        placeholder="Enter your law firm name"
        ctaText="Get Started"
        trialNote="Try Jasmin free for 7 days — no credit card required."
        heroImage={legalPracticesImage}
        statCard={{
          icon: "fa-solid fa-scale-balanced",
          title: "New Consultations Booked",
          value: "72",
          subtitle: "this month",
          trend: "+29%",
          trendColor: "text-green-500",
        }}
      />

      <IndustryFeatureSection
        title={["No Missed Calls.", "No Missed Clients."]}
        subtitle="Jasmin keeps your firm responsive — building trust with every answered call."
        description="For lawyers, paralegals, and legal assistants, Jasmin ensures that every inquiry gets a professional response. Whether it’s after hours or during a busy hearing day, Jasmin captures leads and books consultations automatically."
        features={[
          {
            icon: "fa-solid fa-phone-volume",
            title: "Answers every client call",
            description: "so you never miss an important inquiry again.",
          },
          {
            icon: "fa-solid fa-calendar-check",
            title: "Schedules consultations automatically",
            description: "keeping your calendar full and your focus on cases.",
          },
          {
            icon: "fa-solid fa-scale-balanced",
            title: "Enhances client trust and accessibility",
            description: "by providing round-the-clock professional support.",
          },
        ]}
      />

      <MissedRevenueSection
        title="Missed Calls = Missed Cases"
        subtitle="Every missed call could mean losing a valuable client or case opportunity."
        averageJob="Legal Consultation"
        averageRevenue="$300–$1,000+"
        data={legalPracticeData}
        ctaLabel="Start your free trial"
        ctaLink="/admin"
        icon="fa-solid fa-gavel"
      />
    </div>
  );
}

export default LegalPracticesPage;
