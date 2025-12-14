export interface SubscriptionCard {
  id: number;
  name: string;
  price: string;
  features: string[];
  priceId: string | null;
  buttonText: string;
}
export const subscriptionCards: SubscriptionCard[] = [
  {
    id: 1,
    name: "Essential",
    price: "$49/month",
    priceId: "price_1SdwUS3RWlFXmQKIZuvy03K2",
    features: [
      "Solo pros and small teams – every call answered",
      "Includes 200 minutes per month",
      "Custom message capture",
      "Smart call screening",
      "Instant email & SMS alerts",
    ],
    buttonText: "Buy",
  },
  {
    id: 2,
    name: "Pro",
    price: "$125/month",
    priceId: "price_1SdwUk3RWlFXmQKIPnSwdaGm",
    features: [
      "Fast-growing teams – automate scheduling 24/7",
      "Everything in Essential plus",
      "Real-time two-way text during calls",
      "Call analytics dashboard with insights",
      "Full calendar sync & appointment link generation",
    ],
    buttonText: "Buy",
  },
  {
    id: 3,
    name: "Plus",
    price: "$299/month",
    priceId: "price_1SdwV03RWlFXmQKIVFUPznvl",
    features: [
      "Established businesses – deeper insights & support",
      "Everything in Pro plus",
      "Dedicated account manager for priority support",
      "Deep system integrations with AI workflows",
    ],
    buttonText: "Buy",
  },
  {
    id: 4,
    name: "Custom",
    price: "Tailored",
    priceId: null,
    features: [
      "Multi-site businesses & franchises",
      "Franchises & multi-location brands – high-volume workflows",
      "Unlimited minutes & full enterprise-scale throughput",
      "Custom prompt sets & advanced agent training",
      "Dedicated account manager and integration",
    ],
    buttonText: "Contact Us",
  },
];
