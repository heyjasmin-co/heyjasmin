import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { colorTheme } from "../../theme/colorTheme";

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Check if path is active (including nested routes)
  const isPathActive = (path: string) => location.pathname.startsWith(path);

  const menuItems = [
    { name: "Account Settings", icon: "address-card", to: "/admin/dashboard/account/account-settings" },
    { name: "Users", icon: "users", to: "/admin/dashboard/account/users" },
    { name: "Billing", icon: "credit-card", to: "/admin/dashboard/account/billing" },
  ];

  return (
    <>
      {/* Hamburger button for mobile */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          type="button"
          className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 text-gray-500 shadow-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden"
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
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
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
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
        <div className="flex h-full flex-col gap-8 px-5 py-6">
          {/* Menu */}
          <ul className="flex flex-grow flex-col space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className="group flex items-center rounded-lg px-3 py-2.5 transition-all duration-200"
                  style={{
                    backgroundColor: isPathActive(item.to)
                      ? colorTheme.secondaryColor(0.9)
                      : "transparent",
                    color: isPathActive(item.to) ? "white" : "#374151",
                    fontSize: "18px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <i className={`fa-solid fa-${item.icon} text-xl`}></i>
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
