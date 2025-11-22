/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";
import { colorTheme } from "../../../theme/colorTheme";

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAP_API;

function HowWorks() {
  const navigate = useNavigate();
  const [selectedBusiness, setSelectedBusiness] = useState("");

  if (!GOOGLE_KEY) throw new Error("Google Map API key missing in .env");

  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_KEY,
    onPlaceSelected: (place: any) => {
      const name = place?.place_id;
      if (name) setSelectedBusiness(name);
    },
    options: {
      types: ["establishment"],
      componentRestrictions: { country: "ca" },
    },
  });

  const mainFeatures = [
    {
      title: "Train Jasmin on your business",
      desc: "Give Jasmin a quick intro — just your Google Business Profile, website or business details. She learns who you are and how to represent your brand instantly.",
      iconClass: "fas fa-bolt",
    },
    {
      title: "Customize and confirm",
      desc: "Fine-tune Jasmin’s responses, FAQs, and tone. In just a few clicks, she’s aligned with your brand voice.",
      iconClass: "fas fa-comments",
    },
    {
      title: "Start capturing calls and leads",
      desc: "Once you're ready, forward your calls to Jasmin — she’ll start instantly.",
      iconClass: "fas fa-chart-line",
    },
  ];

  const timelineDelay = [0, 0.25, 0.45];

  const handleContinue = () => {
    if (!selectedBusiness) return;

    navigate("/admin/setup", {
      state: { business: selectedBusiness },
    });
  };

  return (
    <section
      id="features"
      className="px-6 py-24"
      style={{ backgroundColor: colorTheme.primary(0.3) }}
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="mb-6 text-4xl font-extrabold text-black sm:text-5xl">
            Effortless setup.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colorTheme.secondaryColor(
                  1,
                )}, #9b6bff)`,
              }}
            >
              Intelligent results
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-black md:text-xl">
            Your AI receptionist, ready to answer every call — 24/7. Here's how
            easy it is to get started with Jasmin.
          </p>
        </div>

        {/* TIMELINE WRAPPER */}
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical Line */}
          <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 bg-purple-300"></div>

          {/* Timeline Steps */}
          <div className="flex flex-col gap-20">
            {mainFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: timelineDelay[idx] }}
                viewport={{ once: true, amount: 0.4 }}
                className="relative z-10 mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-md transition-transform hover:scale-[1.01]"
                whileHover={{ y: -3 }}
              >
                {/* STEP NUMBER */}
                <div
                  className="absolute top-0 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg font-bold shadow-lg"
                  style={{
                    background: colorTheme.secondaryColor(0.95),
                    color: "white",
                  }}
                >
                  {idx + 1}
                </div>

                {/* Text Section */}
                <div className="mt-4 text-center">
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>

                {/* Step 1 — Search Box */}
                {idx === 0 && (
                  <div className="mt-6">
                    <label className="mb-2 block text-left text-xs font-semibold text-gray-700">
                      Find your Google Business Profile
                    </label>

                    <div className="relative">
                      <input
                        ref={ref}
                        placeholder="Search your business…"
                        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pr-10 pl-4 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                      <i className="fas fa-search absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-500"></i>
                    </div>

                    <button
                      onClick={handleContinue}
                      disabled={!selectedBusiness}
                      className={`mt-4 w-full rounded-full py-2.5 text-sm font-semibold shadow ${
                        selectedBusiness
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "cursor-not-allowed bg-gray-200 text-gray-600"
                      }`}
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {/* Step 2 — Business Info */}
                {idx === 1 && (
                  <div className="mt-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/40 p-4 shadow">
                    <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm text-purple-600">
                          <i className="fas fa-clipboard-list"></i>
                        </div>
                        <h4 className="text-sm font-bold text-gray-800">
                          Business Information
                        </h4>
                      </div>

                      {/* Business Name */}
                      <div className="mb-3 text-left">
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          Business Name
                        </label>
                        <input
                          type="text"
                          value="Heating & Air Co."
                          disabled
                          className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs opacity-70 shadow-sm"
                        />
                      </div>

                      {/* Overview */}
                      <div className="mb-3 text-left">
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          Business Overview
                        </label>
                        <textarea
                          rows={2}
                          value="We provide heating, cooling, HVAC installation and maintenance for residential clients. 20+ years of experience."
                          disabled
                          className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs opacity-70 shadow-sm"
                        />
                      </div>

                      {/* Address */}
                      <div className="mb-3 text-left">
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          Primary Address
                        </label>
                        <input
                          type="text"
                          value="123 Main Street, Toronto, ON"
                          disabled
                          className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs opacity-70 shadow-sm"
                        />
                      </div>

                      {/* Services */}
                      <div>
                        <label className="mb-1 block text-left text-xs font-semibold text-gray-700">
                          Core Services
                        </label>

                        <div className="mb-2 flex flex-wrap gap-1">
                          {[
                            "Heating",
                            "Cooling",
                            "Air Quality",
                            "Installation",
                            "Heat Pumps",
                            "Residential",
                          ].map((s, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] text-purple-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="mt-2 flex cursor-not-allowed gap-2 opacity-50">
                          <input
                            type="text"
                            disabled
                            value="Add service"
                            className="flex-1 rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs"
                          />
                          <button
                            disabled
                            className="rounded-lg bg-purple-300 px-3 py-2 text-xs text-white"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 — Stats */}
                {idx === 2 && (
                  <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <i className="fas fa-chart-bar text-purple-600"></i>
                        Recent Call Stats
                      </h4>
                      <span className="text-xs text-gray-500">Last 24 hrs</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-lg bg-purple-50 p-3 shadow-sm">
                        <div className="text-xl font-bold text-purple-700">
                          18
                        </div>
                        <div className="text-[11px] font-semibold text-gray-600">
                          Total Calls
                        </div>
                      </div>

                      <div className="rounded-lg bg-green-50 p-3 shadow-sm">
                        <div className="text-xl font-bold text-green-700">
                          16
                        </div>
                        <div className="text-[11px] font-semibold text-gray-600">
                          Answered by Jasmin
                        </div>
                      </div>

                      <div className="rounded-lg bg-red-50 p-3 shadow-sm">
                        <div className="text-xl font-bold text-red-700">2</div>
                        <div className="text-[11px] font-semibold text-gray-600">
                          Missed Calls
                        </div>
                      </div>

                      <div className="rounded-lg bg-blue-50 p-3 shadow-sm">
                        <div className="text-xl font-bold text-blue-700">
                          00:43
                        </div>
                        <div className="text-[11px] font-semibold text-gray-600">
                          Avg Duration
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-center text-xs leading-relaxed text-gray-600">
                      Jasmin handled 98% of your calls automatically — keeping
                      you free while still capturing every lead.
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowWorks;
