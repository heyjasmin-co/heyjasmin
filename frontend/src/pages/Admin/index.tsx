import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useUserData } from "../../context/UserDataContext";

function Main() {
  const { userData } = useUserData();

  // Determine banner message
  let bannerMessage = "";
  if (
    userData?.subscription?.plan === "trial" &&
    userData.subscription.status === "trial_ended"
  ) {
    bannerMessage =
      "Your trial has ended. Subscribe to continue using the service.";
  } else if (userData?.subscription?.status === "inactive") {
    bannerMessage = "Your subscription has ended. Please renew to continue.";
  }

  return (
    <div className="flex h-screen flex-col gap-4 overflow-hidden">
      {/* Banner */}
      {bannerMessage && (
        <div className="w-full rounded-md bg-yellow-100 px-2 py-3 text-center font-medium text-yellow-900 shadow-sm">
          {bannerMessage}
        </div>
      )}

      <div className="flex flex-1 gap-4 overflow-hidden p-5">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
