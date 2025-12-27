import smallBusinessImage from "../../../assets/image/industries/realestateImage.jpeg";
import IndustryFeatureSection from "../../../components/Landing/IndustriesPages/IndustryFeaturesSection";
import IndustryHeroSection from "../../../components/Landing/IndustriesPages/IndustryHeroSection";
import { MissedRevenueSection } from "../../../components/Landing/IndustriesPages/MissedRevenueSection";

function SmallBusinessPage() {
  const smallBusinessData = [
    { calls: 100, missedCalls: 20, missedJobs: 14, lostRevenue: "$1,800" },
    { calls: 200, missedCalls: 48, missedJobs: 33, lostRevenue: "$4,200" },
    { calls: 500, missedCalls: 110, missedJobs: 82, lostRevenue: "$9,600" },
  ];

  return (
    <div>
      <IndustryHeroSection
        titleLines={["Never miss a call.", "Never miss a customer."]}
        highlightText="Meet Jasmin — your small business’s 24/7 receptionist."
        description="Jasmin helps small businesses stay connected — answering every call, scheduling appointments, and capturing leads even after hours."
        placeholder="Enter your business name"
        ctaText="Get Started"
        trialNote="Try Jasmin free for 7 days — no credit card required."
        heroImage={smallBusinessImage}
        chatBubbles={[
          {
            sender: "user",
            message: "Hi, I’d like to book a consultation for my business.",
          },
          {
            sender: "bot",
            message: "Absolutely! When would you like to schedule it?",
          },
          {
            sender: "bot",
            message: "Your consultation is booked for Thursday at 3:00 PM.",
          },
        ]}
        statCard={{
          icon: "fa-solid fa-briefcase",
          title: "New Leads Captured",
          value: "96",
          subtitle: "this month",
          trend: "+24%",
          trendColor: "text-green-500",
        }}
      />

      <IndustryFeatureSection
        title={["No More Missed Calls.", "No More Missed Opportunities."]}
        subtitle="Jasmin keeps your business running — even when you’re too busy to answer the phone."
        description="Whether you’re a local store owner, consultant, or service provider, Jasmin ensures your clients reach a friendly voice 24/7, turning every call into a potential sale or booking."
        features={[
          {
            icon: "fa-solid fa-phone-volume",
            title: "Answers calls for you",
            description: "so you never miss a customer inquiry again.",
          },
          {
            icon: "fa-solid fa-calendar-check",
            title: "Schedules and manages bookings",
            description: "while you focus on running your business.",
          },
          {
            icon: "fa-solid fa-chart-line",
            title: "Boosts sales and productivity",
            description: "by turning missed calls into real opportunities.",
          },
        ]}
      />

      <MissedRevenueSection
        title="Missed Calls = Missed Opportunities"
        subtitle="Every missed call could mean a lost client or sale."
        averageJob="Customer Inquiry"
        averageRevenue="$100–$300+"
        data={smallBusinessData}
        ctaLabel="Start your free trial"
        ctaLink="/admin/setup"
        icon="fa-solid fa-briefcase"
      />
    </div>
  );
}

export default SmallBusinessPage;
