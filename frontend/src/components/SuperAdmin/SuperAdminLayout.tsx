import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import websiteLogo from "../../assets/image/websiteLogo.png";
import { colorTheme } from "../../theme/colorTheme";

const SuperAdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const isPathActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("superAdminToken");
    navigate("/super-admin/auth/login");
  };

  return (
    <div className="flex h-screen flex-col gap-4 overflow-hidden">
      <div className="flex flex-1 gap-4 overflow-hidden p-5">
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
              to="/super-admin/dashboard/businesses"
              className="flex flex-col items-center"
              onClick={() => setIsOpen(false)}
            >
              <img src={websiteLogo} alt="Website Icon" className="h-35" />
            </NavLink>
            <hr />

            {/* Menu */}
            <ul className="flex flex-grow flex-col space-y-3 overflow-y-auto">
              {/* Businesses */}
              <li>
                <NavLink
                  to="/super-admin/dashboard/businesses"
                  className="group flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 sm:text-base"
                  style={{
                    backgroundColor: isPathActive(
                      "/super-admin/dashboard/businesses",
                    )
                      ? colorTheme.secondaryColor(0.9)
                      : "transparent",
                    color: isPathActive("/super-admin/dashboard/businesses")
                      ? "white"
                      : "#374151",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fa-solid fa-building text-base sm:text-lg"></i>
                  <span className="ml-2 sm:ml-3">Businesses</span>
                </NavLink>
              </li>

              {/* Users */}
              <li>
                <NavLink
                  to="/super-admin/dashboard/users"
                  className="group flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 sm:text-base"
                  style={{
                    backgroundColor: isPathActive(
                      "/super-admin/dashboard/users",
                    )
                      ? colorTheme.secondaryColor(0.9)
                      : "transparent",
                    color: isPathActive("/super-admin/dashboard/users")
                      ? "white"
                      : "#374151",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fa-solid fa-users text-base sm:text-lg"></i>
                  <span className="ml-2 sm:ml-3">Users</span>
                </NavLink>
              </li>

              {/* Settings */}
              <li>
                <NavLink
                  to="/super-admin/dashboard/settings"
                  className="group flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 sm:text-base"
                  style={{
                    backgroundColor: isPathActive(
                      "/super-admin/dashboard/settings",
                    )
                      ? colorTheme.secondaryColor(0.9)
                      : "transparent",
                    color: isPathActive("/super-admin/dashboard/settings")
                      ? "white"
                      : "#374151",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fa-solid fa-gear text-base sm:text-lg"></i>
                  <span className="ml-2 sm:ml-3">Settings</span>
                </NavLink>
              </li>

              {/* Logout */}
              <li className="mt-auto pt-4">
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 active:scale-95 sm:text-base"
                >
                  <i className="fa-solid fa-right-from-bracket text-sm sm:text-base"></i>
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminLayout;
