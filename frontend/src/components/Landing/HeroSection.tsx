"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import websiteIcon from "../../assets/image/websiteIcon.png";
import { colorTheme } from "../../theme/colorTheme";

export default function HeroSection() {
  const [businessName, setBusinessName] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4 pt-20 pb-12 sm:px-6 md:pt-28 md:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 text-center md:grid-cols-2 md:text-left">
        {/* Left Side — Text */}
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
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-center text-sm text-gray-800 shadow-sm transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:outline-none sm:text-left sm:text-base"
            />
            <div
              className="flex w-50 items-center justify-center rounded-full px-5 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                backgroundColor: colorTheme.secondaryColor(0.9),
              }}
            >
              <a
                href="/admin"
                className="w-full text-center"
                style={{ color: "white" }}
              >
                Get Started
              </a>
            </div>
          </div>

          <p className="text-bold text-lg">
            Start risk-free: 7-day trial with all features
          </p>
        </div>

        {/* Right Side — Animated Phone */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            {/* Signal Wave Behind Phone */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {/* Layered glowing pulse waves */}
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

              {/* Soft ambient center glow */}
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

            {/* Phone Container */}
            <div className="relative flex h-[350px] w-[180px] items-center justify-center overflow-hidden rounded-[2rem] border-[3px] border-gray-800 bg-gradient-to-b from-[#222] to-[#111] shadow-[0_10px_40px_rgba(0,0,0,0.4)] sm:h-[400px] sm:w-[200px] md:h-[440px] md:w-[230px] lg:h-[480px] lg:w-[250px]">
              {/* Inner Glass Reflection */}
              <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent" />

              {/* Speaker Notch */}
              <div className="absolute top-3 left-1/2 h-[6px] w-[60px] -translate-x-1/2 rounded-full bg-gray-700/60" />
              <div className="absolute top-5 left-1/2 h-[3px] w-[35px] -translate-x-1/2 rounded-full bg-gray-500/40" />

              {/* Screen Glow */}
              <motion.div
                className="relative flex h-32 w-32 items-center justify-center rounded-full sm:h-40 sm:w-40"
                style={{
                  background: `radial-gradient(circle, ${colorTheme.secondaryColor(
                    1,
                  )} 0%, #4c1d95 80%)`,
                  boxShadow: `0 0 40px 10px ${colorTheme.secondaryColor(0.6)}`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    `0 0 20px 5px ${colorTheme.secondaryColor(0.5)}`,
                    `0 0 50px 20px ${colorTheme.secondaryColor(0.7)}`,
                    `0 0 20px 5px ${colorTheme.secondaryColor(0.5)}`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={websiteIcon}
                  alt="Website Icon"
                  className="object-contain sm:h-64 sm:w-64"
                />
              </motion.div>

              {/* Screen Overlay Glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

              {/* Bottom Text */}
              <div className="absolute bottom-6 w-full text-center text-xs font-semibold tracking-wide text-gray-200 sm:text-sm">
                Appointment booked
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
