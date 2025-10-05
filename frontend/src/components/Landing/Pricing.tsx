import { useState } from "react";
import { colorTheme } from "../../theme/colorTheme";

type Subscription = {
  id: number;
  name: string;
  price: string;
  features: string[];
};

function Pricing() {
  const [subscriptions] = useState<Subscription[]>([
    {
      id: 0,
      name: "Core",
      price: "$99",
      features: [
        "200 minutes",
        "Limited agent customization",
        "Appointment confirmation",
        "SMS support only",
      ],
    },
    {
      id: 1,
      name: "Pro",
      price: "$149",
      features: [
        "350 minutes",
        "Standard agent customization",
        "Appointment confirmation",
        "Smart spam detection",
        "Priority SMS support",
      ],
    },
    {
      id: 2,
      name: "Smart",
      price: "$299",
      features: [
        "600 minutes",
        "Full agent customization",
        "Advanced appointment & agent management",
        "Smart spam detection",
        "Phone + priority SMS support",
      ],
    },
    {
      id: 3,
      name: "Infinity",
      price: "Custom",
      features: [
        "Unlimited minutes",
        "Enterprise-level customization",
        "Full appointment & agent management",
        "Dedicated success manager",
        "24/7 support & SLAs",
        "Tailored integrations",
      ],
    },
  ]);

  return (
    <section id="pricing" className="px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-16 text-4xl font-extrabold text-gray-900">
          Choose Your Plan
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {subscriptions.map((plan) => {
            const isPopular = plan.id === 2; // Smart Plan

            return (
              <div
                key={plan.id}
                className={`relative flex h-full min-h-[460px] flex-col rounded-3xl border p-10 shadow-lg transition hover:shadow-2xl ${
                  isPopular
                    ? "scale-105 border-purple-600 bg-gradient-to-b from-purple-50 to-white shadow-2xl"
                    : "border-gray-300 bg-white"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold text-white shadow-md">
                    Most Popular
                  </div>
                )}

                <h3
                  className={`mb-4 text-2xl font-bold ${
                    isPopular ? "text-purple-700" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mb-8 text-4xl font-extrabold ${
                    isPopular ? "text-purple-700" : "text-purple-600"
                  }`}
                >
                  {plan.price}
                </p>
                <ul className="mb-8 space-y-4 text-left text-gray-700">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-cyan-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Redirect Button */}
                <a
                  href="/admin"
                  className={`mt-auto block rounded-full px-6 py-3 text-center font-semibold shadow-md transition hover:scale-105 hover:shadow-xl ${
                    isPopular ? "bg-purple-600 text-white" : "text-white"
                  }`}
                  style={
                    !isPopular
                      ? {
                          backgroundColor: colorTheme.secondaryColor(0.9),
                          color: "white",
                        }
                      : { color: "white" }
                  }
                >
                  {plan.id === 0 ? "Start Free Trial" : "Choose Plan"}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
