import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import BillingInfo from "../../../../components/Account/Billing/BillingInfo";
import { CheckoutForm } from "../../../../components/Account/Billing/CheckoutForm";
import SubscriptionCards from "../../../../components/Account/Billing/SubscriptionCards";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { getStripe } from "../../../../lib/stripe";
import { appName } from "../../../../theme/appName";

export default function BillingPage() {
  // Initialize Stripe once when the component is loaded
  const stripePromise = getStripe();
  const [currentSubscription, setCurrentSubscription] = useState("trail");
  const [clientSecret, setClientSecret] = useState<string | null>();
  const [priceId, setPriceId] = useState<string | null>();
  const handleSubscription = (state: string) => {
    setCurrentSubscription(state);
  };
  const { userData } = useUserData();
  const handleCreatePaymentIntent = ({
    clientSecret,
    priceId,
  }: {
    clientSecret: string;
    priceId: string;
  }) => {
    setClientSecret(clientSecret);
    setPriceId(priceId);
  };
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div className="flex h-full flex-col gap-5">
        <TitleCard
          title="Billing"
          subtitle={`Manage your subscription to ${appName}`}
          hasButton={false}
        />

        {clientSecret && priceId ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm priceId={priceId} clientSecret={clientSecret} />
          </Elements>
        ) : (
          <>
            {userData?.subscription?.stripePriceId &&
            userData?.subscription?.plan !== "trial" ? (
              <SubscriptionCards
                handleCreatePaymentIntent={handleCreatePaymentIntent}
              />
            ) : currentSubscription === "buy" ? (
              <SubscriptionCards
                handleCreatePaymentIntent={handleCreatePaymentIntent}
              />
            ) : (
              <BillingInfo handleSubscription={handleSubscription} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
