/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";
import waveImage from "../../../assets/image/waveImage.png";
import { colorTheme } from "../../../theme/colorTheme";

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAP_API;

export default function HeroSection() {
  const navigate = useNavigate();
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

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

  const handleContinue = () => {
    if (!selectedBusiness) return;
    navigate("/admin/setup", {
      state: { business: selectedBusiness },
    });
  };

  // Trigger message animation
  useEffect(() => {
    const timer = setTimeout(() => setMessageVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4 pt-20 pb-12 sm:px-6 md:pt-28 md:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 text-center md:grid-cols-2 md:text-left">
        {/* Left Side */}
        <div>
          <h1 className="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Every call answered. <br className="hidden sm:block" />
            Every lead captured. <br className="hidden sm:block" />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colorTheme.secondaryColor(
                  1,
                )}, #9b6bff)`,
              }}
            >
              Every customer satisfied.
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-700 sm:text-lg md:max-w-none md:text-xl">
            Jasmin helps your business grow by answering calls, booking
            appointments, and capturing every lead — 24/7, with zero missed
            opportunities.
          </p>

          {/* Input + Button */}
          <div className="mx-auto mb-10 flex max-w-sm flex-col items-center gap-3 sm:max-w-lg sm:flex-row sm:gap-4 md:mx-0">
            <input
              type="text"
              ref={ref}
              placeholder="Enter your business name"
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-center text-sm text-gray-800 shadow-sm transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:outline-none sm:text-left sm:text-base"
            />
            <div
              className={`flex w-50 items-center justify-center rounded-full px-5 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 ${
                selectedBusiness
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "cursor-not-allowed bg-gray-200 text-gray-600"
              }`}
              style={{
                backgroundColor: selectedBusiness
                  ? colorTheme.secondaryColor(0.9)
                  : "",
              }}
            >
              <button
                onClick={handleContinue}
                disabled={!selectedBusiness}
                className="w-full text-center"
                style={{ color: "white" }}
              >
                Get Started
              </button>
            </div>
          </div>

          <p className="text-bold text-lg">
            Start risk-free: 7-day trial with all features
          </p>
        </div>

        {/* Right Side — Animated Phone */}
        <div className="flex justify-center md:justify-end">
          <div className="relative flex min-h-[500px] items-center justify-center">
            {/* Wave Image Behind Everything */}
            <img
              src={waveImage}
              alt="Wavelength Background"
              className=""
              style={{
                width: "500px",
                height: "500px",
              }}
            />

            {/* Glowing Pulses */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: "120px",
                    height: "120px",
                    background: `radial-gradient(circle, ${colorTheme.secondaryColor(
                      0.8,
                    )} 10%, transparent 70%)`,
                    boxShadow: `0 0 30px 10px ${colorTheme.secondaryColor(0.5)}`,
                    opacity: 0.4,
                  }}
                  animate={{
                    scale: [1, 4.5],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div
                className="absolute rounded-full opacity-40 blur-3xl"
                style={{
                  width: "250px",
                  height: "250px",
                  background: `radial-gradient(circle, ${colorTheme.secondaryColor(
                    0.7,
                  )} 0%, transparent 70%)`,
                }}
              />
            </div>

            {/* Phone with Chat Interface */}
            <div className="absolute z-20 flex h-[350px] w-[180px] items-center justify-center overflow-hidden rounded-[2rem] border-[3px] border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:h-[420px] sm:w-[220px] md:h-[480px] md:w-[250px] lg:h-[540px] lg:w-[280px]">
              <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent" />

              {/* Status Bar */}
              <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm">
                <span className="font-semibold text-gray-900">18:04</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">5G</span>
                  <i className="fa-solid fa-signal text-xs text-gray-600"></i>
                  <i className="fa-solid fa-battery-full text-xs text-gray-600"></i>
                </div>
              </div>

              {/* Header */}
              <div className="absolute top-8 right-0 left-0 z-10 border-b border-gray-200 bg-white px-3 py-2 sm:top-10 sm:px-4 sm:py-2.5">
                <div className="flex items-center">
                  <button className="mr-2 text-base sm:text-lg">←</button>
                  <span className="text-sm font-semibold text-gray-900 sm:text-base">
                    heyjasmin
                  </span>
                </div>
              </div>

              {/* Chat Content */}
              <div className="absolute top-16 right-0 bottom-12 left-0 overflow-y-auto bg-gray-50 p-2 sm:top-20 sm:bottom-14 sm:p-3 md:p-4">
                {/* Profile Header */}
                <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10"
                    style={{
                      backgroundColor: colorTheme.secondaryColor(0.9),
                    }}
                  >
                    <i className="fas fa-star text-base text-white sm:text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900 sm:text-sm">
                      heyjasmin
                    </div>
                    <div className="text-[10px] text-gray-500 sm:text-xs">
                      +1 (555) 887-4225
                    </div>
                  </div>
                </div>

                {/* Message Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={messageVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="mb-2 rounded-lg bg-gray-200 p-2 text-[11px] text-gray-600 sm:mb-3 sm:p-2.5 sm:text-xs"
                >
                  I'll send calendar invites now.
                </motion.div>

                {/* Booking Details Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={messageVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="mb-2 rounded-lg bg-white p-2 shadow-sm sm:mb-3 sm:p-3"
                >
                  <div className="mb-1 text-[11px] font-bold text-gray-900 sm:mb-1.5 sm:text-xs">
                    Plumbing Service Booked!
                  </div>
                  <div className="mb-1 text-[9px] text-gray-700 sm:text-[10px]">
                    <strong>Date:</strong> Friday, 07/26/2024 - 3:00 PM - 4:00
                    PM
                  </div>
                  <div className="mb-0.5 text-[9px] text-gray-700 sm:text-[10px]">
                    <strong>Client:</strong> Johnca Lae -{" "}
                    <span className="text-blue-500">+1 (555) 567-8901</span>
                  </div>
                  <div className="mb-0.5 text-[9px] text-gray-700 sm:text-[10px]">
                    <strong>Property:</strong> Leaky Faucet Repair
                  </div>
                  <div className="mb-0.5 text-[9px] text-gray-700 sm:text-[10px]">
                    3 Bed / 2 60124
                  </div>
                  <div className="mb-1 text-[9px] text-gray-700 sm:mb-1.5 sm:text-[10px]">
                    <strong>Address:</strong> 456 Oak St, Anytown, CA H12334
                  </div>
                  <div className="text-[9px] text-gray-600 sm:text-[10px]">
                    <strong>Notes:</strong> Constant dripping under kitchen
                    sink. Estimate: $150-$200
                  </div>
                </motion.div>

                {/* User Response */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={messageVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.5, duration: 0.4 }}
                  className="ml-auto w-fit max-w-[70%] rounded-lg px-3 py-1.5 text-[11px] text-white sm:px-3.5 sm:py-2 sm:text-xs"
                  style={{ backgroundColor: colorTheme.secondaryColor(1) }}
                >
                  Perfect, thanks!
                  <div className="mt-0.5 text-right text-[9px] text-purple-100 sm:text-[10px]">
                    Delivered
                  </div>
                </motion.div>
              </div>

              {/* Input Bar */}
              <div className="absolute right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-2 sm:p-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button className="text-base text-gray-400 sm:text-lg">
                    +
                  </button>
                  <div className="flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-[11px] text-gray-400 sm:px-4 sm:py-2 sm:text-xs">
                    Text here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
