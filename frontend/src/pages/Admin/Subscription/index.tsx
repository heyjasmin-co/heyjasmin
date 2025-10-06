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
    name: "Core",
    price: "$99",
    subtitle: "💡 Best for testing purposes",
    features: [
      "200 minutes",
      "Limited agent customization",
      "Appointment confirmation",
      "SMS support only",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: "$149",
    subtitle: "🚀 Ideal for startups & growing teams",
    features: [
      "350 minutes",
      "Standard agent customization",
      "Appointment confirmation",
      "Smart spam detection",
      "Priority SMS support",
    ],
  },
  {
    id: 3,
    name: "Smart",
    price: "$299",
    subtitle: "🏢 Best for established or large businesses",
    features: [
      "600 minutes",
      "Full agent customization",
      "Advanced appointment & agent management",
      "Smart spam detection",
      "Phone + priority SMS support",
    ],
  },
  {
    id: 4,
    name: "Infinity",
    price: "Custom",
    subtitle: "🏆 Best for enterprise-level operations",
    features: [
      "Unlimited minutes",
      "Enterprise-level customization",
      "Full appointment & agent management",
      "Dedicated success manager",
      "24/7 support & SLAs",
      "Tailored integrations",
    ],
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const user = useUserData();
  const navigate = useNavigate();

const handleSelectPlan = (id: number) => {
  setSelectedPlan(id);
  user.setUserData((prev) => {
    if (prev) {
      return { ...prev, hasSubscription: true };
    }
    return prev; 
  });
  navigate("/admin/dashboard");
};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1200px]">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <img src={infoIcon} alt="Info" className="h-5 w-5" />
            <h1 className="text-3xl font-bold text-gray-900">
              Choose your {appName} Plan
            </h1>
          </div>
          <p className="text-center text-gray-600">
            All plans come with{" "}
            <span className="font-semibold">5-day free trial</span> and{" "}
            <span className="font-semibold">20 minutes</span> free agent usage
            per day.
          </p>
        </div>

        {/* Subscription Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subscriptions.map((sub) => {
            const isPopular = sub.name === "Smart";

            return (
              <div
                key={sub.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md`}
                style={{
                  backgroundColor: "white",
                  borderColor: isPopular
                    ? colorTheme.secondaryColor(1)
                    : "#e5e7eb",
                  minHeight: "260px",
                }}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <span
                    className="absolute -top-2 right-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white shadow-md"
                    style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
                  >
                    ⭐ Most Popular
                  </span>
                )}

                {/* Card Content */}
                <div>
                  <h5 className="mb-1 text-lg font-semibold text-gray-900">
                    {sub.name}
                  </h5>
                  <p className="mb-1 text-xs text-gray-500">{sub.subtitle}</p>

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

                  {/* Trial Info */}
                  <div className="mb-2 flex flex-col gap-1">
                    <p className="text-xs font-medium text-purple-600">
                      5 Days Free Trial
                    </p>
                    <p className="text-xs font-medium text-purple-600">
                      20 Minutes Free Trial
                    </p>
                  </div>

                  {/* Features */}
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

                {/* Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleSelectPlan(sub.id)}
                    className={`w-full rounded-lg py-2 text-lg font-medium text-white shadow-sm transition hover:scale-105 hover:shadow-md ${
                      selectedPlan === sub.id
                        ? "bg-purple-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    Buy
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
