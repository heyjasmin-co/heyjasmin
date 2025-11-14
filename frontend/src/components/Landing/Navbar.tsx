import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import websiteIcon from "../../assets/image/websiteIcon.png";
import { colorTheme } from "../../theme/colorTheme";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  const industriesList = [
    { label: "Salon", href: "/industries/salon" },
    { label: "Home Service", href: "/industries/home-service" },
    { label: "Legal Practices", href: "/industries/legal-practices" },
    { label: "Automotive Repair", href: "/industries/automotive-repair" },
    { label: "Small Business", href: "/industries/small-business" },
    { label: "Real Estate", href: "/industries/real-estate" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center text-xl font-bold sm:text-2xl md:text-3xl"
          style={{ color: colorTheme.secondaryColor(1) }}
        >
          <img
            src={websiteIcon}
            alt="Website Icon"
            className="h-10 w-10 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
          <span className="ml-1">heyjasmin</span>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden items-center space-x-6 lg:flex">
          <HashLink to="/#features" className="hover:text-blue-600">
            Features
          </HashLink>
          <HashLink to="/#how-it-works" className="hover:text-blue-600">
            How It Works
          </HashLink>

          {/* Industries Dropdown */}
          <div
            className="group relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <HashLink
              to="/#industries"
              className="flex items-center gap-1 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600"
            >
              Industries
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </HashLink>

            {/* Dropdown Menu */}
            <div
              className={`absolute left-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl transition-all duration-200 ${industriesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"} `}
            >
              {industriesList.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="block rounded-lg px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                  onClick={() => setIndustriesOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <HashLink to="/#faq" className="hover:text-blue-600">
            FAQ
          </HashLink>

          <a
            href="/admin"
            className="rounded-full px-5 py-2 font-semibold text-white shadow-md transition hover:scale-105"
            style={{ backgroundColor: colorTheme.primary(1), color: "white" }}
          >
            Login
          </a>
          <a
            href="/admin"
            className="rounded-full px-5 py-2 font-semibold text-white shadow-md transition hover:scale-105"
            style={{
              backgroundColor: colorTheme.secondaryColor(0.9),
              color: "white",
            }}
          >
            Get Started
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="text-black lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-white shadow-lg lg:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-4">
            <HashLink to="/#features" className="hover:text-blue-600">
              Features
            </HashLink>
            <HashLink to="/#how-it-works" className="hover:text-blue-600">
              How It Works
            </HashLink>

            {/* Mobile Industries dropdown */}
            <details className="group text-black">
              <summary className="flex cursor-pointer items-center justify-between rounded-md py-2 font-medium transition-colors hover:bg-gray-100">
                Industries
                <svg
                  className="h-4 w-4 transform transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="mt-2 flex flex-col space-y-2 pl-4">
                {industriesList.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className="rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </details>

            <HashLink to="/#faq">FAQ</HashLink>

            <a
              href="/admin"
              className="rounded-full px-5 py-2 font-semibold text-white shadow-md"
              style={{ backgroundColor: colorTheme.primary(1), color: "white" }}
            >
              Login
            </a>
            <a
              href="/admin"
              className="rounded-full px-5 py-2 font-semibold text-white shadow-md"
              style={{
                backgroundColor: colorTheme.secondaryColor(0.9),
                color: "white",
              }}
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
