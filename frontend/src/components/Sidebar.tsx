import { useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import websiteLogo from "../assets/image/websiteLogo.png";
import { useUserData } from "../context/UserDataContext";
import { useLogout } from "../hooks/api/useAuthMutations";
import { colorTheme } from "../theme/colorTheme";
import { errorToast, successToast } from "../utils/react-toast";
import { formatPhoneNumber } from "../utils/string-utils";

export default function Sidebar() {
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const location = useLocation();
  // const apiClient = useApiClient();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const { userData } = useUserData();
  const isPathActive = (path: string) => location.pathname.startsWith(path);

  const handleSignOut = async () => {
    // setLoading(true);
    try {
      await logout();
      successToast("User logged out successfully.");

      await new Promise((res) => setTimeout(res, 2000));
      await signOut({ redirectUrl: "/admin/sign-in" });
    } catch {
      errorToast("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      {/* Hamburger for mobile */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          type="button"
          className="fixed top-12 left-4 z-50 rounded-lg bg-white p-2 text-gray-500 shadow-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden"
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-72 transform rounded-r-2xl bg-white shadow-xl transition-transform duration-300 lg:relative lg:translate-x-0 lg:rounded-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="flex h-full flex-col gap-6 px-5 py-6">
          {/* Logo */}
          <NavLink
            to="/admin/dashboard"
            className="flex flex-col items-center"
            onClick={() => setIsOpen(false)}
          >
            <img src={websiteLogo} alt="Website Icon" className="h-35" />
          </NavLink>
          <hr />

          {/* Menu */}
          <ul className="flex flex-grow flex-col space-y-3 overflow-y-auto">
            {/* Guided Setup */}
            <li>
              <NavLink
                to="/admin/dashboard"
                end
                className="group flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 sm:text-base"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? colorTheme.secondaryColor(0.9)
                    : "transparent",
                  color: isActive ? "white" : "#374151",
                  fontWeight: 500,
                })}
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-solid fa-file text-base sm:text-lg"></i>
                <span className="ml-2 sm:ml-3">Guided Setup</span>
              </NavLink>
            </li>

            {/* Calls */}
            <li>
              <NavLink
                to="/admin/dashboard/calls"
                className="group flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 sm:text-base"
                style={{
                  backgroundColor: isPathActive("/admin/dashboard/calls")
                    ? colorTheme.secondaryColor(0.9)
                    : "transparent",
                  color: isPathActive("/admin/dashboard/calls")
                    ? "white"
                    : "#374151",
                  fontWeight: 500,
                }}
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-solid fa-phone-volume text-base sm:text-lg"></i>
                <span className="ml-2 sm:ml-3">Calls</span>
              </NavLink>
            </li>

            {/* Settings */}
            <li>
              <NavLink
                to="/admin/dashboard/settings"
                end={false}
                className="hidden items-center rounded-lg px-3 py-2 transition-all duration-200 lg:flex"
                style={{
                  backgroundColor: isPathActive("/admin/dashboard/settings")
                    ? colorTheme.secondaryColor(0.9)
                    : "transparent",
                  color: isPathActive("/admin/dashboard/settings")
                    ? "white"
                    : "#374151",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-solid fa-gear text-lg"></i>
                <span className="ml-3">Settings</span>
              </NavLink>

              {/* Mobile dropdown */}
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm sm:text-base lg:hidden"
              >
                <i className="fa-solid fa-gear text-base sm:text-lg"></i>
                <span className="ml-2 sm:ml-3">Settings</span>
                <i
                  className={`fa-solid fa-chevron-${settingsOpen ? "up" : "down"} ml-auto text-[10px] sm:text-xs`}
                ></i>
              </button>

              {settingsOpen && (
                <ul className="mt-2 ml-4 flex flex-col space-y-1 sm:ml-6 sm:space-y-2 lg:hidden">
                  <li>
                    <NavLink
                      to="/admin/dashboard/settings/business-info"
                      end
                      className="group flex items-center rounded-lg px-3 py-2 text-xs sm:text-sm"
                      style={({ isActive }) => ({
                        backgroundColor: isActive
                          ? colorTheme.secondaryColor(0.9)
                          : "transparent",
                        color: isActive ? "white" : "#374151",
                        fontWeight: 500,
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa-solid fa-circle-info text-sm sm:text-base"></i>
                      <span className="ml-2 sm:ml-3">Business Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/dashboard/settings/appointments"
                      className="group flex items-center rounded-lg px-3 py-2 text-xs sm:text-sm"
                      style={({ isActive }) => ({
                        backgroundColor: isActive
                          ? colorTheme.secondaryColor(0.9)
                          : "transparent",
                        color: isActive ? "white" : "#374151",
                        fontWeight: 500,
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa-solid fa-calendar-days text-sm sm:text-base"></i>
                      <span className="ml-2 sm:ml-3">Appointments</span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Account with dropdown */}
            <li>
              {/* Desktop NavLink */}
              <NavLink
                to="/admin/dashboard/account"
                end={false}
                className="hidden items-center rounded-lg px-3 py-2 transition-all duration-200 lg:flex"
                style={{
                  backgroundColor: isPathActive("/admin/dashboard/account")
                    ? colorTheme.secondaryColor(0.9)
                    : "transparent",
                  color: isPathActive("/admin/dashboard/account")
                    ? "white"
                    : "#374151",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-solid fa-user text-lg"></i>
                <span className="ml-3">Account</span>
              </NavLink>

              {/* Mobile dropdown */}
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm sm:text-base lg:hidden"
              >
                <i className="fa-solid fa-user text-base sm:text-lg"></i>
                <span className="ml-2 sm:ml-3">Account</span>
                <i
                  className={`fa-solid fa-chevron-${accountOpen ? "up" : "down"} ml-auto text-[10px] sm:text-xs`}
                ></i>
              </button>

              {accountOpen && (
                <ul className="mt-2 ml-4 flex flex-col space-y-1 sm:ml-6 sm:space-y-2 lg:hidden">
                  <li>
                    <NavLink
                      to="/admin/dashboard/account/account-settings"
                      className="group flex items-center rounded-lg px-3 py-2 text-xs sm:text-sm"
                      style={({ isActive }) => ({
                        backgroundColor: isActive
                          ? colorTheme.secondaryColor(0.9)
                          : "transparent",
                        color: isActive ? "white" : "#374151",
                        fontWeight: 500,
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa-solid fa-address-card text-sm sm:text-base"></i>
                      <span className="ml-2 sm:ml-3">Account Settings</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/dashboard/account/users"
                      className="group flex items-center rounded-lg px-3 py-2 text-xs sm:text-sm"
                      style={({ isActive }) => ({
                        backgroundColor: isActive
                          ? colorTheme.secondaryColor(0.9)
                          : "transparent",
                        color: isActive ? "white" : "#374151",
                        fontWeight: 500,
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa-solid fa-users text-sm sm:text-base"></i>
                      <span className="ml-2 sm:ml-3">Users</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/dashboard/account/billing"
                      className="group flex items-center rounded-lg px-3 py-2 text-xs sm:text-sm"
                      style={({ isActive }) => ({
                        backgroundColor: isActive
                          ? colorTheme.secondaryColor(0.9)
                          : "transparent",
                        color: isActive ? "white" : "#374151",
                        fontWeight: 500,
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa-solid fa-credit-card text-sm sm:text-base"></i>
                      <span className="ml-2 sm:ml-3">Billing</span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Logout */}
            <li className="mt-auto pt-4">
              {/* Info Section */}
              {userData?.businessName && (
                <li className="pb-8">
                  <div
                    className="flex flex-col items-center justify-center rounded-2xl text-center text-sm shadow-md sm:text-base"
                    style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
                  >
                    {/* Business Name */}
                    <div className="w-full border-b border-white/30 py-2 font-semibold text-white">
                      <span>{userData?.businessName}</span>
                    </div>

                    {/* Phone Number */}
                    <div className="flex w-full items-center justify-center gap-2 border-b border-white/30 py-2 text-white">
                      <i className="fa-solid fa-phone-volume text-base sm:text-lg"></i>
                      <span className="truncate">
                        {userData.subscription?.plan === "trial" &&
                        userData.subscription.status === "trial_ended"
                          ? "Trial has Ended"
                          : userData.subscription?.status === "inactive"
                            ? "Subscription has Ended"
                            : userData?.assistantNumber
                              ? formatPhoneNumber(userData.assistantNumber)
                              : "No Number Available"}
                      </span>
                    </div>

                    {/* Minutes Left */}
                    <div className="flex w-full items-center justify-center gap-2 py-2 font-medium text-white">
                      <i className="fa-solid fa-circle-info text-base sm:text-lg"></i>
                      <span className="truncate">
                        {userData?.subscription!.remainingMinutesFormatted} MIN
                        LEFT
                      </span>
                    </div>
                  </div>
                </li>
              )}

              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className={`group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-all duration-200 sm:text-base ${
                  isLoggingOut
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600 active:scale-95"
                }`}
              >
                {isLoggingOut ? (
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
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
