import repairImage from "../../../assets/image/industries/repairImage.jpeg";
import IndustryFeatureSection from "../../../components/Landing/IndustriesPages/IndustryFeaturesSection";
import IndustryHeroSection from "../../../components/Landing/IndustriesPages/IndustryHeroSection";
import { MissedRevenueSection } from "../../../components/Landing/IndustriesPages/MissedRevenueSection";

function AutomotiveRepairPage() {
  const automotiveData = [
    { calls: 100, missedCalls: 22, missedJobs: 15, lostRevenue: "$3,000" },
    { calls: 200, missedCalls: 55, missedJobs: 38, lostRevenue: "$7,800" },
    { calls: 500, missedCalls: 120, missedJobs: 85, lostRevenue: "$17,500" },
  ];

  return (
    <div>
      <IndustryHeroSection
        titleLines={["Never miss a call.", "Never miss a repair job."]}
        highlightText="Meet Jasmin — your auto shop’s 24/7 service advisor."
        description="Jasmin answers every customer call, schedules repair appointments, and helps your automotive business run smoothly — even when your hands are full under the hood."
        placeholder="Enter your shop name"
        ctaText="Get Started"
        trialNote="Try Jasmin free for 7 days — no credit card required."
        heroImage={repairImage}
        chatBubbles={[
          {
            sender: "user",
            message: "My check engine light is on!",
          },
          {
            sender: "bot",
            message: "Let’s have you in for an appointment",
          },
          {
            sender: "bot",
            message: "Appointment booked!",
          },
        ]}
        statCard={{
          icon: "fa-solid fa-car",
          title: "New Repair Appointments",
          value: "134",
          subtitle: "this month",
          trend: "+28%",
          trendColor: "text-green-500",
        }}
      />

      <IndustryFeatureSection
        title={["No More Missed Calls.", "No More Missed Repairs."]}
        subtitle="Jasmin helps your auto shop stay busy — and your bays stay full."
        description="Whether you’re a mechanic, auto body specialist, or service advisor, Jasmin ensures every customer call is answered, every appointment booked, and every opportunity captured — day or night."
        features={[
          {
            icon: "fa-solid fa-phone-volume",
            title: "Answers calls instantly",
            description: "even when your team is busy in the garage.",
          },
          {
            icon: "fa-solid fa-calendar-check",
            title: "Schedules service appointments",
            description: "so no job slips through the cracks.",
          },
          {
            icon: "fa-solid fa-gauge-high",
            title: "Keeps your shop running efficiently",
            description: "by converting calls into loyal repeat customers.",
          },
        ]}
      />

      <MissedRevenueSection
        title="Missed Calls = Lost Repair Jobs"
        subtitle="Every missed call could mean a customer taking their car elsewhere."
        averageJob="Auto Repair"
        averageRevenue="$150–$500+"
        data={automotiveData}
        ctaLabel="Start your free trial"
        ctaLink="/admin/setup"
        icon="fa-solid fa-wrench"
      />
    </div>
  );
}

export default AutomotiveRepairPage;
