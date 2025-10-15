import { useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import { useApiClient } from "../../../lib/axios";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast, successToast } from "../../../utils/react-toast";

function AccountDetails() {
  const apiClient = useApiClient();
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await apiClient.post("/users/logout");
      successToast("User logged out successfully.");

      await new Promise((res) => setTimeout(res, 2000));
      await signOut({ redirectUrl: "/admin/sign-in" });
    } catch {
      errorToast("Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="h-full w-full divide-y divide-gray-200">
        {/* Header */}
        <div className="flex items-center space-x-3 px-4 py-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-envelope text-white"></i>
          </div>
          <h5 className="text-lg font-bold text-gray-900">
            Account Information
          </h5>
        </div>

        {/* Content */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 [@media(max-width:300px)]:flex-col">
          <div
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm sm:text-base sm:font-semibold"
            style={{
              backgroundColor: colorTheme.secondaryColor(0.08),
            }}
          >
            imahsan600@gmail.com
          </div>

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all sm:text-base ${
              loading
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin text-sm sm:text-base"></i>
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-from-bracket text-sm sm:text-base"></i>
                <span>Log Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
