import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import websiteIcon from "../../../assets/image/websiteIcon.png";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";
export default function Login() {
  useEffect(() => {
    const interval = setInterval(() => {
      // Select elements by Clerk's DOM structure
      const title = document.querySelector(
        "[data-localization-key='signIn.start.title']",
      );
      const subtitle = document.querySelector(
        "[data-localization-key='signIn.start.subtitle']",
      );

      if (title) title.textContent = "Sign in to heyjasmin";
      if (subtitle) subtitle.textContent = "Please sign in to continue";

      if (title || subtitle) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex min-h-screen">
      {/* Left branding section */}
      <div
        className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-12 text-white lg:flex"
        style={{ backgroundColor: colorTheme.primary(1) }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <img src={websiteIcon} className="h-28 w-28" />
          <h1 className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg">
            {appName}
          </h1>
          <p className="mt-4 text-lg font-medium opacity-90">
            Simplifying the way you work, connect, and grow.
          </p>
        </div>
      </div>

      {/* Right login section */}
      <div className="flex w-full items-center justify-center bg-gray-50 px-6 py-12 lg:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: colorTheme.primary(1) }}
            >
              Welcome Back
            </h2>
          </div>

          {/* Clerk Sign In (centered, larger fields) */}
          <SignIn
            afterSignInUrl="/admin/dashboard"
            appearance={{
              elements: {
                card: "shadow-none border-none bg-transparent w-full",
                formFieldInput:
                  "w-full text-lg px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)]",
                formFieldLabel: "text-base font-medium text-gray-700 mb-2",
                formButtonPrimary:
                  "w-full text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 px-4 rounded-lg shadow transition text-center",
              },
              variables: {
                colorPrimary: colorTheme.primary(1),
              },
            }}
          />

          {/* Footer */}
          <div className="mt-8 text-center text-base text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/admin/setup"
              className="font-medium hover:underline"
              style={{ color: colorTheme.primary(1) }}
            >
              Setup Agent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
