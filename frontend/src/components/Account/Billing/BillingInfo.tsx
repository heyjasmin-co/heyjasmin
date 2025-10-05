import subscriptionImage from "../../../assets/image/subscriptionImage.png";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";

export default function BillingInfo({
  handleSubscription,
}: {
  handleSubscription: (state: string) => void;
}) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6 sm:py-6"
      style={{
        fontFamily: "'Outfit', sans-serif",
        backgroundColor: colorTheme.secondaryColor(0.2),
      }}
    >
      {/* Image */}
      <img
        src={subscriptionImage}
        alt="Subscription"
        className="mb-6 h-40 w-auto max-w-full object-contain sm:h-56 md:h-72 lg:h-80"
      />

      {/* Text Content */}
      <div className="flex max-w-md flex-col items-center justify-center space-y-3 px-2 text-center sm:px-0">
        <h2 className="text-center text-base font-semibold text-black sm:text-lg md:text-xl">
          Free trial in progress. Complete the quick start guide to activate{" "}
          <span className="font-bold text-purple-600">{appName}</span> agent and
          start taking calls.
        </h2>

        <button
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110 active:scale-95 sm:w-auto"
          style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
          onClick={() => handleSubscription("buy")}
        >
          <span className="text-xl">Complete Setup</span>
          <i className="fa-solid fa-caret-right text-white"></i>
        </button>
      </div>
    </div>
  );
}
