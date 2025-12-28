import { colorTheme } from "@/theme/colorTheme";
import { useNavigate } from "react-router-dom";

function AppointmentLockCard({
  subscriptionPlan,
  isTrial,
}: {
  subscriptionPlan: string;
  isTrial: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 rounded-lg bg-gray-200/30 backdrop-blur-sm"></div>
      <div className="relative mx-auto flex max-w-md flex-col items-center justify-center gap-6 rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-2xl">
        {/* Lock Icon with 3D effect */}
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full shadow-xl"
          style={{
            backgroundColor: colorTheme.secondaryColor(0.9),
          }}
        >
          <i className="fa-solid fa-lock text-5xl text-white drop-shadow-lg"></i>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800">
          Appointment Feature Locked
        </h3>

        {/* Description */}
        {subscriptionPlan === "essential" && (
          <p className="max-w-[260px] text-base text-gray-600">
            Upgrade to <span className="font-semibold text-gray-800">Pro</span>{" "}
            or <span className="font-semibold text-gray-800">Plus</span> to
            access Appointment settings.
          </p>
        )}

        {isTrial && (
          <p className="max-w-[260px] text-base text-gray-600">
            Upgrade your subscription to enable Appointment features.
          </p>
        )}

        {/* Upgrade Button */}
        <button
          className="mt-6 rounded-lg px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-purple-700"
          style={{
            backgroundColor: colorTheme.secondaryColor(0.9),
          }}
          onClick={() => {
            navigate("/admin/dashboard/account/billing");
          }}
        >
          Upgrade Now
        </button>

        {/* Optional subtle background glow */}
        <div className="absolute top-6 -z-10 h-60 w-60 rounded-full bg-purple-100 opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
}

export default AppointmentLockCard;
