/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import infoIcon from "../../../assets/image/infoIcon.png";
import { useUserData } from "../../../context/UserDataContext";
import { useCreateStripePaymentIntent } from "../../../hooks/api/useBillingMutations";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast } from "../../../utils/react-toast";
import type { SubscriptionCard } from "../../../utils/subscriptionCards";
import { subscriptionCards } from "../../../utils/subscriptionCards";
interface SubscriptionCardsProps {
  handleCreatePaymentIntent: ({
    clientSecret,
    priceId,
  }: {
    clientSecret: string;
    priceId: string;
  }) => void;
}
function SubscriptionCards({
  handleCreatePaymentIntent,
}: SubscriptionCardsProps) {
  const [subscriptions] = useState<SubscriptionCard[]>(subscriptionCards);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { mutateAsync: createPaymentIntent } = useCreateStripePaymentIntent();
  const { userData } = useUserData();
  const currentSusbcription = userData?.subscription?.stripePriceId;
  const handleSubscribe = async (sub: SubscriptionCard) => {
    try {
      setLoadingId(sub.id);

      const response = await createPaymentIntent({
        businessId: userData?.businessId!,
        priceId: sub.priceId!,
      });

      if (response.success) {
        const clientSecret = response.data.clientSecret;
        handleCreatePaymentIntent({
          priceId: sub.priceId!,
          clientSecret,
        });
      }
    } catch (error: any) {
      console.error("Payment Intent Error:", error);
      errorToast("");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      className="flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-credit-card text-sm text-white"></i>
          </div>
          <h5 className="text-base font-bold text-gray-900">
            {appName} Subscriptions
          </h5>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 px-3 py-2 sm:flex-row sm:items-start sm:px-5">
        <img src={infoIcon} alt="Info Icon" className="h-5 w-5 flex-shrink-0" />
        <p className="text-xs text-gray-700">
          Manage the subscription plans for {appName}. View pricing, features,
          and choose the plan that best fits your needs. You can update or
          upgrade anytime.
        </p>
      </div>

      {/* Subscription Cards */}
      <div
        className="flex flex-col gap-3 px-3 py-4"
        style={{ backgroundColor: colorTheme.secondaryColor(0.05) }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {subscriptions.map((sub) => {
            const isPopular = sub.name === "Pro";
            const isCurrent = sub.priceId === currentSusbcription;
            const isExpired =
              isCurrent && userData?.subscription?.status !== "active";
            return (
              <div
                key={sub.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md`}
                style={{
                  backgroundColor: "white",
                  borderColor: isCurrent
                    ? colorTheme.secondaryColor(1)
                    : isPopular
                      ? colorTheme.secondaryColor(1)
                      : "#e5e7eb",
                  minHeight: "200px",
                }}
              >
                {isPopular && !isCurrent && (
                  <span
                    className="absolute -top-2 right-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white shadow-md"
                    style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
                  >
                    ⭐ Most Popular
                  </span>
                )}

                {isCurrent && (
                  <span
                    className="absolute -top-2 right-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white shadow-md"
                    style={{ backgroundColor: colorTheme.secondaryColor(1) }}
                  >
                    Current Plan
                  </span>
                )}

                <div>
                  <h5 className="mb-2 text-base font-semibold text-gray-900">
                    {sub.name}
                  </h5>
                  <div className="mb-2 flex items-baseline text-gray-900">
                    {sub.price.startsWith("$") ? (
                      <>
                        <span className="text-xl font-bold">{sub.price}</span>
                        <span className="ml-1 text-xs text-gray-500">
                          /month
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold">{sub.price}</span>
                    )}
                  </div>

                  <ul className="space-y-1">
                    {sub.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <svg
                          className="h-4 w-4 text-cyan-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  {sub.name === "Custom" ? (
                    <a
                      href={`mailto:${import.meta.env.VITE_ADMIN_MAIL}`}
                      className="inline-block w-full rounded-lg py-2 text-center text-xs font-medium text-white shadow-sm transition hover:scale-95 hover:shadow-md"
                      style={{
                        color: "white",
                        backgroundColor: colorTheme.secondaryColor(0.9),
                      }}
                    >
                      {sub.buttonText}
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled={loadingId !== null || (isCurrent && !isExpired)} // disable current plan button
                      onClick={() => handleSubscribe(sub)}
                      className="w-full rounded-lg py-2 text-xs font-medium text-white shadow-sm transition hover:scale-95 hover:shadow-md"
                      style={{
                        backgroundColor: colorTheme.secondaryColor(0.9),
                      }}
                    >
                      {isCurrent
                        ? isExpired
                          ? "Renew Plan"
                          : "Current Plan"
                        : loadingId === sub.id
                          ? "Processing..."
                          : sub.buttonText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionCards;
