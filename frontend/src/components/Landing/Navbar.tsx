import { useState } from "react";
import { colorTheme } from "../../theme/colorTheme";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          className="cursor-pointer text-2xl font-bold"
          style={{
            color: colorTheme.secondaryColor(1),
          }}
        >
          Jasmin
        </div>

        {/* Desktop Menu */}
        <nav className="hidden items-center space-x-6 lg:flex">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Industries", href: "#industries" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-medium transition-colors"
              style={{
                color: "black",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colorTheme.secondaryColor(1))
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              {item.label}
            </a>
          ))}

          <a
            href="/admin"
            className="rounded-full px-5 py-2 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
            style={{
              backgroundColor: colorTheme.primary(1),
              color: "white",
            }}
          >
            Login
          </a>
          <a
            href="/admin"
            className="rounded-full px-5 py-2 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
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
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Industries", href: "#industries" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-medium transition-colors"
                style={{
                  color: "black",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colorTheme.secondaryColor(1))
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
              >
                {item.label}
              </a>
            ))}

            <a
              href="/admin"
              className="rounded-full px-5 py-2 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
              style={{
                backgroundColor: colorTheme.primary(1),
                color: "white",
              }}
            >
              Login
            </a>
            <a
              href="/admin"
              className="rounded-full px-5 py-2 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
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
