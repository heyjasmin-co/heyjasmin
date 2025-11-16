"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { colorTheme } from "../../../theme/colorTheme";

interface ChatBubble {
  sender: "user" | "bot";
  message: string;
}

interface StatCard {
  icon?: string;
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendColor?: string;
}

interface IndustryHeroSectionProps {
  titleLines: string[];
  highlightText: string;
  description: string;
  placeholder: string;
  ctaText: string;
  trialNote: string;
  heroImage?: string;
  chatBubbles?: ChatBubble[];
  statCard?: StatCard;
}

const IndustryHeroSection: React.FC<IndustryHeroSectionProps> = ({
  titleLines,
  highlightText,
  description,
  placeholder,
  ctaText,
  trialNote,
  heroImage,
  chatBubbles = [
    { sender: "user", message: "Hey Jasmin, can you book my client?" },
    { sender: "bot", message: "Done! Your 2 PM slot is confirmed." },
  ],
  statCard = {
    icon: "fa-solid fa-calendar-check",
    title: "Booked Appointments",
    value: "76",
    subtitle: "this week",
    trend: "+42%",
    trendColor: "text-green-500",
  },
}) => {
  const [input, setInput] = useState("");

  return (
    <section
      className="relative overflow-hidden px-4 pt-26 pb-12 sm:px-6 md:pt-28 md:pb-20 lg:px-10"
      style={{
        backgroundColor: colorTheme.primary(0.3),
        backgroundImage: heroImage ? `url(${heroImage})` : "none",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay for realistic lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#1e293b]/70 to-[#0f172a]/90 backdrop-blur-sm" />

      {/* Subtle glowing orbs for depth */}
      <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-[#9B6BFF]/25 opacity-60 blur-[100px]" />
      <div className="absolute right-[-80px] bottom-[-100px] h-96 w-96 rounded-full bg-[#6C47FF]/30 opacity-70 blur-[120px]" />

      {/* Optional soft radial vignette for cinematic feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)]" />

      {/* CONTENT */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 text-center text-white md:grid-cols-2 md:text-left">
        {/* LEFT SIDE */}
        <div className="w-full">
          <h1 className="mb-4 text-2xl leading-snug font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundColor: colorTheme.primary(1),
              }}
            >
              {highlightText}
            </span>
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-200 sm:text-base md:max-w-none md:text-lg">
            {description}
          </p>
          {/* Chat simulation */}
          <div className="my-4 flex w-full max-w-full flex-col items-center justify-center space-y-2 sm:max-w-md sm:items-start">
            {chatBubbles.map((chat, i) => (
              <div
                key={i}
                className={`relative w-full rounded-2xl px-3 py-2 text-xs break-words shadow-lg sm:text-sm ${
                  chat.sender === "user"
                    ? "bg-white text-center text-gray-900 sm:text-left"
                    : "bg-gradient-to-r from-[#6C47FF] to-[#9B6BFF] text-center text-white sm:ml-4 sm:text-left"
                }`}
              >
                {chat.sender === "bot" && (
                  <div className="absolute top-1/2 left-[-5px] h-2.5 w-2.5 -translate-y-1/2 animate-ping rounded-full bg-[#9B6BFF] sm:left-[-5px]" />
                )}
                <p className="font-medium break-words">{chat.message}</p>
              </div>
            ))}
          </div>
          {/* Stats card */}
          <div className="mx-auto max-w-sm rounded-2xl bg-white/85 p-4 text-left shadow-lg backdrop-blur-md md:mx-0">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#6C47FF] to-[#9B6BFF] shadow-md">
                <i className={`${statCard.icon} text-sm text-white`} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {statCard.title}
                </h3>
                {statCard.trend && (
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold ${statCard.trendColor}`}
                  >
                    <i className="fa-solid fa-arrow-trend-up" />
                    <span>{statCard.trend}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {statCard.value}{" "}
              {statCard.subtitle && (
                <span className="text-xs font-normal text-gray-500">
                  {statCard.subtitle}
                </span>
              )}
            </div>
          </div>
          {/* CTA Input */}{" "}
          <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-2 sm:max-w-md sm:flex-row sm:gap-3 md:mx-0">
            {" "}
            <input
              type="text"
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-center text-sm text-gray-800 shadow-sm transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:outline-none sm:text-left"
            />{" "}
            <div
              className="flex w-50 items-center justify-center rounded-full px-5 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
            >
              {" "}
              <NavLink
                to="/admin/setup"
                className="w-full text-center"
                style={{ color: "white" }}
              >
                {" "}
                {ctaText}{" "}
              </NavLink>{" "}
            </div>{" "}
          </div>{" "}
          <p className="text-bold mt-3 text-lg">{trialNote}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex w-full justify-center md:justify-end">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-sm"
          >
            {heroImage ? (
              <img
                src={heroImage}
                alt="Hero Visual"
                className="w-full rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="flex h-64 w-full max-w-xs items-center justify-center rounded-2xl bg-[#6C47FF]/20 shadow-inner">
                <i className="fa-solid fa-industry text-4xl text-white/80"></i>
              </div>
            )}
          </motion.div>

          <div className="absolute right-4 bottom-4 rounded-lg bg-gradient-to-r from-[#6C47FF] to-[#9B6BFF] px-3 py-1.5 text-xs font-semibold text-white shadow-md">
            <i className="fa-solid fa-check-double mr-1"></i>
            Appointment Confirmed!
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryHeroSection;
