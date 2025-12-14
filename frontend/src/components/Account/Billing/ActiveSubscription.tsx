import { useState } from "react";
import subscriptionImage from "../../../assets/image/subscriptionImage.png";
import { colorTheme } from "../../../theme/colorTheme";
import {
  SubscriptionCard,
  subscriptionCards,
} from "../../../utils/subscriptionCards";

interface ActiveSubscriptionProps {
  activePriceId: string;
  handleSubscription?: (state: string) => void;
}

export default function ActiveSubscription({
  activePriceId,
  handleSubscription,
}: ActiveSubscriptionProps) {
  const [subscriptions] = useState<SubscriptionCard[]>(subscriptionCards);

  const activeSub = subscriptions.find((sub) => sub.priceId === activePriceId);
  if (!activeSub) return null;

  const { name: planName, price, features } = activeSub;

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Image Section */}
      <div className="flex w-full items-center justify-center bg-gradient-to-br p-4">
        <img
          src={subscriptionImage}
          alt="Subscription"
          className="h-28 w-auto object-contain sm:h-32 md:h-36"
        />
      </div>

      {/* Details Section */}
      <div className="flex w-full flex-col p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg md:text-xl">
            Active Subscription
          </h3>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
            style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
          >
            CURRENT PLAN
          </span>
        </div>

        {/* Plan & Price */}
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">
            {planName}
          </span>
          <span className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
            {price}
          </span>
        </div>

        {/* Features */}
        <ul className="mb-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 rounded bg-gray-50 px-2 py-1 text-xs sm:text-sm"
            >
              <svg
                className="h-4 w-4 flex-shrink-0 text-cyan-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Manage Button */}
        <button
          className="w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-95 active:scale-95"
          style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
          onClick={() => handleSubscription && handleSubscription("buy")}
        >
          Manage Subscription
        </button>
      </div>
    </div>
  );
}
