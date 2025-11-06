import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { colorTheme } from "../../theme/colorTheme";

function Footer() {
  const industries = [
    { label: "Salon", href: "/industries/salon" },
    { label: "Home Service", href: "/industries/home-service" },
    { label: "Legal Practices", href: "/industries/legal-practices" },
    { label: "Automotive Repair", href: "/industries/automotive-repair" },
    { label: "Small Business", href: "/industries/small-business" },
    { label: "Real Estate", href: "/industries/real-estate" },
  ];

  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 px-6 py-12 text-gray-300 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left md:grid-cols-3 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">Jasmin AI</h3>
            <p className="text-sm">
              Helping businesses automate appointments and customer
              interactions.
            </p>
            {/* Social icons */}
            {/* <div className="flex justify-center sm:justify-start gap-4 mt-2 text-gray-400">
              <a href="#" className="hover:text-white transition-colors"><FaFacebookF /></a>
              <a href="#" className="hover:text-white transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-white transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-white transition-colors"><FaLinkedinIn /></a>
            </div> */}
          </div>

          {/* Industries Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Industries</h3>
            <ul className="space-y-2 text-sm">
              {industries.map((industry) => (
                <li key={industry.href}>
                  <NavLink
                    to={industry.href}
                    className="transition-colors hover:text-white"
                  >
                    {industry.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources / Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <HashLink
                  to="/#features"
                  className="transition-colors hover:text-white"
                >
                  Features
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/#how-it-works"
                  className="transition-colors hover:text-white"
                >
                  How It Works
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/#faq"
                  className="transition-colors hover:text-white"
                >
                  FAQ
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Contact / CTA */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Get Started</h3>
            <p className="mb-2 text-sm">
              Sign up to automate your business today.
            </p>
            <NavLink
              to="/admin"
              className="inline-block transform rounded-full px-6 py-2 font-semibold text-white shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
            >
              Get Started
            </NavLink>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700" />

        {/* Bottom copyright */}
        <p className="text-center text-sm text-gray-400">
          © 2025 Jasmin AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
