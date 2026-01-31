/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Admin/SubscriptionPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import infoIcon from "../../../assets/image/infoIcon.png";
import { useUserData } from "../../../context/UserDataContext";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";

interface Subscription {
  id: number;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
}

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: "Essential",
    price: "$49",
    subtitle:
      "💡 Best for solo pros and small teams who want every call answered.",
    features: [
      "Includes 200 minutes per month",
      "Custom message capture built around your business needs",
      "Smart call screening that blocks spam",
      "Instant email & SMS alerts for every call",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: "$125",
    subtitle:
      "🚀 Best for fast-growing teams ready to automate scheduling and stay connected 24/7.",
    features: [
      "Everything in Essential plus:",
      "Real-time two-way text during active calls",
      "Call analytics dashboard with insights",
      "Full calendar sync + appointment link generation",
    ],
  },
  {
    id: 3,
    name: "Plus",
    price: "$299",
    subtitle:
      "🏢 Best for established businesses needing deeper insights and hands-on support.",
    features: [
      "Everything in Pro plus:",
      "Dedicated account manager for priority support and onboarding",
      "Deep system integrations connecting AI into your workflows",
    ],
  },
  {
    id: 4,
    name: "Custom",
    price: "Tailored",
    subtitle: "🏆 Tailored for multi-site businesses & franchises.",
    features: [
      "Best fit for franchises and multi-location brands with complex, high-volume workflows",
      "Unlimited minutes and full enterprise-scale throughput",
      "Fully custom prompt sets and advanced agent training for your workflow",
      "Dedicated account manager and integration",
    ],
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const user = useUserData();
  const navigate = useNavigate();

  const handleSelectPlan = (id: number) => {
    setSelectedPlan(id);
    user.setUserData((prev: any) => {
      if (prev) {
        return { ...prev, hasSubscription: true };
      }
      return prev;
    });
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1200px]">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <img src={infoIcon} alt="Info" className="h-6 w-6" />
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Choose your {appName} Plan
            </h1>
          </div>
          <p className="max-w-xl text-sm text-gray-600 sm:text-base">
            All plans come with{" "}
            <span className="font-semibold">7-day free trial</span> and{" "}
            <span className="font-semibold">20 minutes</span> free agent usage
            per day.
          </p>
        </div>

        {/* Subscription Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subscriptions.map((sub) => {
            const isPopular = sub.name === "Pro";

            return (
              <div
                key={sub.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md`}
                style={{
                  backgroundColor: "white",
                  borderColor: isPopular
                    ? colorTheme.secondaryColor(1)
                    : "#e5e7eb",
                }}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <span
                    className="absolute -top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md"
                    style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
                  >
                    ⭐ Most Popular
                  </span>
                )}

                {/* Card Content */}
                <div className="flex flex-col gap-2">
                  <h5 className="text-lg font-semibold text-gray-900">
                    {sub.name}
                  </h5>
                  <p className="text-xs leading-snug text-gray-500">
                    {sub.subtitle}
                  </p>

                  <div className="mt-2 flex items-baseline text-gray-900">
                    {sub.price.startsWith("$") ? (
                      <>
                        <span className="text-2xl font-bold">{sub.price}</span>
                        <span className="ml-1 text-sm text-gray-500">
                          /month
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">{sub.price}</span>
                    )}
                  </div>

                  {/* Trial Info */}
                  <div className="mt-2 flex flex-col gap-1">
                    <p className="text-xs font-medium text-purple-600">
                      5 Days Free Trial
                    </p>
                    <p className="text-xs font-medium text-purple-600">
                      20 Minutes Free Trial
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mt-3 space-y-1.5">
                    {sub.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs leading-snug text-gray-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <div className="mt-5">
                  <button
                    onClick={() => handleSelectPlan(sub.id)}
                    className={`w-full rounded-lg py-2.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-md ${
                      selectedPlan === sub.id
                        ? "bg-purple-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {sub.name === "Custom" ? "Contact Us" : "Buy"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
