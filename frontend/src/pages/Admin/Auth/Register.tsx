import { SignUp } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";

export default function Register() {
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get("invitationToken");
  const emailParam = searchParams.get("email");

  const email = emailParam ? decodeURIComponent(emailParam) : null;

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left branding section (hidden on small screens) */}
      <div
        className="relative hidden flex-1 flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-8 text-white lg:flex"
        style={{ backgroundColor: colorTheme.primary(1) }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <div className="relative z-10 w-full max-w-lg space-y-10 px-4 text-center">
          {/* Branding */}
          <div>
            <h1 className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg md:text-5xl">
              {appName}
            </h1>
            <p className="mt-4 text-lg font-medium opacity-90 md:text-xl">
              Start your journey with us today 🚀
            </p>
          </div>

          {/* How It Works */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <div className="space-y-5">
              <div>
                <p className="text-xl font-semibold">
                  1. Train Jasmin on your business
                </p>
                <p className="text-base opacity-90">
                  Use your website address or simple business info to get
                  started.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  2. Confirm Jasmin has things right
                </p>
                <p className="text-base opacity-90">
                  Jasmin learns your business details. You can adjust and add
                  custom questions.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  3. Forward your calls to Jasmin
                </p>
                <p className="text-base opacity-90">
                  No need to change your number. Just forward calls to Jasmin
                  when you want her to answer.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  4. Jasmin answers and takes messages
                </p>
                <p className="text-base opacity-90">
                  Jasmin answers, handles questions, and sends you email or text
                  updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right signup section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: colorTheme.primary(1) }}
            >
              Create Your Account ✨
            </h2>
            <p className="mt-3 text-base text-gray-500 md:text-lg">
              Sign up to get started with {appName}
            </p>
          </div>

          {/* Clerk Sign Up */}
          <SignUp
            afterSignInUrl="/admin/dashboard"
            unsafeMetadata={{
              invitationToken,
            }}
            initialValues={{
              emailAddress: email || "",
            }}
            appearance={{
              elements: {
                card: "shadow-none border-none bg-transparent w-full",
                ...(email && {
                  formFieldInput__emailAddress: `
                    cursor-not-allowed 
                    bg-gray-100 
                    opacity-75 
                    pointer-events-none 
                    select-none
                  `,
                }),

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
            Already have an account?{" "}
            <a
              href="/admin/login"
              className="font-medium hover:underline"
              style={{ color: colorTheme.primary(1) }}
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
