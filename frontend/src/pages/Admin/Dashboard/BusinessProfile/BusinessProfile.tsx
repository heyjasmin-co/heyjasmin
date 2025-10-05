// src/pages/BusinessProfile.tsx
import { useState } from "react";
import { appName } from "../../../../theme/appName";
import { colorTheme } from "../../../../theme/colorTheme";

export default function BusinessProfile() {
  const [businessName, setBusinessName] = useState("");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left section */}
      <div
        className="hidden w-1/2 flex-col justify-center px-12 lg:flex"
        style={{
          background: `linear-gradient(135deg, ${colorTheme.primary(
            1,
          )}, ${colorTheme.secondaryColor(1)})`,
          color: "white",
        }}
      >
        {/* Stepper */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm font-medium">1/5</span>
          <div className="h-2 w-24 rounded-full bg-white/30">
            <div className="h-2 w-1/5 rounded-full bg-white"></div>
          </div>
        </div>

        <h1 className="text-4xl leading-snug font-extrabold">
          Train {appName} with your{" "}
          <span className="text-purple-200">Business Profile</span>
        </h1>

        <ul className="mt-8 space-y-4 text-lg">
          <li className="flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass text-white"></i>
            <span>Find your profile by entering your business name.</span>
          </li>
          <li className="flex items-center gap-3">
            <i className="fa-solid fa-robot text-white"></i>
            <span>Your AI agent will be trained on your profile.</span>
          </li>
          <li className="flex items-center gap-3">
            <i className="fa-solid fa-clock text-white"></i>
            <span>Takes less than a minute!</span>
          </li>
        </ul>

        <div className="mt-10 rounded-xl bg-white/20 p-4 text-sm font-medium backdrop-blur">
          ✅ Start risk-free: <span className="font-semibold">5-day trial</span>{" "}
          with all features
        </div>
      </div>

      {/* Right section */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <h2
            className="text-2xl font-bold"
            style={{ color: colorTheme.primary(1) }}
          >
            Find your Business Profile
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your business name to continue.
          </p>

          <div className="mt-6">
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Type your business name..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
            />
          </div>

          <button
            disabled={!businessName}
            className={`mt-6 w-full rounded-lg px-6 py-3 text-white shadow-md transition active:scale-95 ${
              businessName
                ? "bg-purple-600 hover:bg-purple-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Continue →
          </button>

          <button className="mt-4 w-full text-sm text-gray-500 hover:underline">
            Use my website instead
          </button>
        </div>
      </div>
    </div>
  );
}
