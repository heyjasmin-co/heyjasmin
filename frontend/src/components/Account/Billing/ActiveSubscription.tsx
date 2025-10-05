import subscriptionImage from "../../../assets/image/subscriptionImage.png";
import { colorTheme } from "../../../theme/colorTheme";

interface ActiveSubscriptionProps {
  planName: string;
  price: string;
  features: string[];
}

export default function ActiveSubscription({
  planName,
  price,
  features,
}: ActiveSubscriptionProps) {
  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:flex-row"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Left: Color Accent & Image */}
      <div className="flex w-full items-center justify-center bg-gradient-to-br from-purple-600 to-purple-400 p-6 sm:w-1/3">
        <img
          src={subscriptionImage}
          alt="Subscription"
          className="h-40 w-auto object-contain sm:h-56 md:h-64"
        />
      </div>

      {/* Right: Details */}
      <div className="flex w-full flex-col p-6 sm:w-2/3 sm:p-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
            Active Subscription
          </h3>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white sm:text-sm"
            style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
          >
            CURRENT PLAN
          </span>
        </div>

        {/* Plan & Price */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-lg font-medium text-gray-700 sm:text-xl md:text-2xl">
            {planName}
          </span>
          <span className="mt-2 text-2xl font-bold text-gray-900 sm:mt-0 sm:text-3xl md:text-4xl">
            {price}
          </span>
        </div>

        {/* Features */}
        <ul className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium sm:text-base"
            >
              <svg
                className="h-5 w-5 text-cyan-500"
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
          className="w-full rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95 sm:w-auto sm:self-start sm:text-base"
          style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
        >
          Manage Subscription
        </button>
      </div>
    </div>
  );
}
