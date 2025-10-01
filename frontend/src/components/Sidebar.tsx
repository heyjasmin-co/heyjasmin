import { useState } from "react";
import { NavLink } from "react-router-dom";
import fileIcon from "../assets/image/fileIcon.png";
import logoutIcon from "../assets/image/logoutIcon.png";
import phoneIcon from "../assets/image/phoneIcon.png";
import profileIcon from "../assets/image/profileIcon.png";
import robotIcon from "../assets/image/robotIcon.png";
import settingIcons from "../assets/image/settingIcon.png";
import { colorTheme } from "../theme/colorTheme";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger button for mobile - fixed position */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          type="button"
          className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 text-gray-500 shadow-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden"
        >
          <span className="sr-only">Toggle sidebar</span>
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
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
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
        {/* Sidebar Content */}
        <div className="flex h-full flex-col rounded-2xl px-5 py-6">
          {/* Logo */}
          <NavLink
            to="/"
            className="mb-6 flex items-center space-x-3"
            onClick={() => setIsOpen(false)}
          >
            <img src={robotIcon} alt={`Robot Icon`} className="h-15 w-15" />
            <span
              style={{
                fontSize: "22px",
                lineHeight: "28px",
                letterSpacing: "-0.04em",
              }}
              className="font-semibold tracking-tight"
            >
              heyjasmin
            </span>
          </NavLink>

          {/* Menu */}
          <ul className="flex flex-grow flex-col space-y-1.5">
            {[
              { name: "Guided Setup", icon: fileIcon, to: "/" },
              { name: "Calls", icon: phoneIcon, to: "/calls" },
              { name: "Settings", icon: settingIcons, to: "/settings" },
              { name: "Account", icon: profileIcon, to: "/account" },
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className="group flex items-center rounded-lg px-3 py-2.5 transition-all duration-200"
                  style={({ isActive }) => ({
                    backgroundColor: isActive
                      ? colorTheme.secondaryColor(1)
                      : "transparent",
                    color: isActive ? "white" : "#374151",
                    fontSize: "18px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  })}
                  onMouseEnter={(e) => {
                    if (
                      !e.currentTarget.style.backgroundColor.includes("rgb")
                    ) {
                      e.currentTarget.style.backgroundColor =
                        colorTheme.secondaryColor(0.3);
                    }
                  }}
                  onMouseLeave={(e) => {
                    const isActive =
                      e.currentTarget.getAttribute("aria-current") === "page";
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "";
                    }
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={item.icon}
                    style={{
                      color: "white",
                    }}
                    alt={`${item.name} Icon`}
                    className="h-7 w-7"
                  />
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              </li>
            ))}

            {/* Bottom-aligned Log Out */}
            <li className="mt-auto pt-4">
              {/* Contact Info */}
              {/* <div
                className="mb-4 flex flex-col space-y-2 rounded-xl p-3 shadow-lg"
                style={{
                  backgroundColor: colorTheme.secondaryColor(0.2),
                }}
              >
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <img
                    src={settingIcons}
                    alt="Phone Icon"
                    className="h-4 w-4"
                  />
                  <span>(233) 489-4419</span>
                </div>
                <hr className="border-gray-700" />
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <img
                    src={settingIcons}
                    alt="Timer Icon"
                    className="h-4 w-4"
                  />
                  <span>50:00 min left</span>
                  <img src={settingIcons} alt="Info Icon" className="h-4 w-4" />
                </div>
              </div> */}

              {/* Logout Button */}
              <NavLink
                to="/login"
                className="group flex items-center rounded-lg px-3 py-2.5 transition-all duration-200"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? colorTheme.secondaryColor(1)
                    : "transparent",
                  color: isActive ? "white" : "#374151",
                  fontSize: "18px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.style.backgroundColor.includes("rgb")) {
                    e.currentTarget.style.backgroundColor =
                      colorTheme.secondaryColor(0.2);
                  }
                }}
                onMouseLeave={(e) => {
                  const isActive =
                    e.currentTarget.getAttribute("aria-current") === "page";
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
              >
                <img src={logoutIcon} alt="Log Out Icon" className="h-7 w-7" />
                <span className="ml-3">Log Out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
