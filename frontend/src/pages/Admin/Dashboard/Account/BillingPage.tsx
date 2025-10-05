import { useState } from "react";
import ActiveSubscription from "../../../../components/Account/Billing/ActiveSubscription";
import BillingInfo from "../../../../components/Account/Billing/BillingInfo";
import SubscriptionCards from "../../../../components/Account/Billing/SubscriptionCards";
import TitleCard from "../../../../components/TitleCard";
import { appName } from "../../../../theme/appName";

export default function BillingPage() {
  const [currentSubscription, setCurrentSubscription] = useState("trail");
  const handleSubscription = (state: string) => {
    setCurrentSubscription(state);
  };
  // Example active plan data
  const activePlan = {
    planName: "Pro Plan",
    price: "$25/month",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
  };

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div className="flex h-full flex-col gap-5">
        <TitleCard
          title="Billing"
          subtitle={`Manage your subscription to ${appName}`}
          hasButton={false}
        />
        {currentSubscription === "trail" && (
          <BillingInfo handleSubscription={handleSubscription} />
        )}
        {currentSubscription === "buy" && <SubscriptionCards />}
        {currentSubscription === "paid" && (
          <ActiveSubscription
            planName={activePlan.planName}
            price={activePlan.price}
            features={activePlan.features}
          />
        )}
      </div>
    </div>
  );
}
