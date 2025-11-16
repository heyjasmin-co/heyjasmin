import { motion } from "framer-motion";
import { useState } from "react";

type Subscription = {
  id: number;
  name: string;
  price: string;
  features: string[];
  buttonText: string;
};

function Pricing() {
  const [subscriptions] = useState<Subscription[]>([
    {
      id: 0,
      name: "Essential",
      price: "$49/month",
      features: [
        "Best fit for: Solo pros and small teams who want every call answered.",
        "Includes 200 minutes per month",
        "Custom message capture built around your business needs",
        "Smart call screening that blocks spam",
        "Instant email & SMS alerts for every call",
      ],
      buttonText: "Start Free Trial",
    },
    {
      id: 1,
      name: "Pro",
      price: "$125/month",
      features: [
        "Best fit for: Fast-growing teams ready to automate scheduling and stay connected 24/7.",
        "Everything in Essential plus:",
        "Real-time two-way text during active calls",
        "Call analytics dashboard with insights",
        "Full calendar sync + appointment link generation",
      ],
      buttonText: "Start Free Trial",
    },
    {
      id: 2,
      name: "Plus",
      price: "$299/month",
      features: [
        "Best fit for: Established businesses needing deeper insights and hands-on support.",
        "Everything in Pro plus:",
        "Dedicated account manager for priority support and onboarding",
        "Deep system integrations connecting AI into your workflows",
      ],
      buttonText: "Start Free Trial",
    },
    {
      id: 3,
      name: "Custom",
      price: "Tailored",
      features: [
        "Tailored for multi-site businesses & franchises.",
        "Best fit for: Franchises and multi-location brands with complex, high-volume workflows.",
        "Unlimited minutes and full enterprise-scale throughput",
        "Fully custom prompt sets and advanced agent training for your workflow",
        "Dedicated account manager and integration",
      ],
      buttonText: "Contact Us",
    },
  ]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="pricing" className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-16 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Plans that scale with you
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {subscriptions.map((plan) => {
            const isPopular = plan.id === 1;

            return (
              <motion.div
                key={plan.id}
                className={`relative flex h-full min-h-[460px] flex-col rounded-3xl border p-8 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl sm:p-10 ${
                  isPopular
                    ? "border-purple-400 bg-gradient-to-b from-purple-50 to-white shadow-2xl"
                    : "border-gray-200 bg-white"
                }`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: plan.id * 0.2 }}
                animate={isPopular ? { scale: [1, 1.05, 1] } : {}}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold text-white shadow-md"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Most Popular
                  </motion.div>
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

                <ul className="mb-8 space-y-4 text-left">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 flex-shrink-0 text-purple-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 md:text-base">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Redirect Button */}
                <a
                  href="/admin/setup"
                  style={{
                    color: "white",
                  }}
                  className={`mt-auto block rounded-full px-6 py-3 text-center font-semibold shadow-md transition hover:scale-105 hover:shadow-lg ${
                    isPopular
                      ? "bg-purple-600 text-white"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  {plan.buttonText}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
