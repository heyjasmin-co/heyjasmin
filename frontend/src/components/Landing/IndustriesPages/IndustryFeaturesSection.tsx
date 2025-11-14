"use client";

import { colorTheme } from "../../../theme/colorTheme";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface IndustryFeaturesSectionProps {
  title: string[];
  subtitle: string;
  description: string;
  features: Feature[];
}

export default function IndustryFeaturesSection({
  title,
  subtitle,
  description,
  features,
}: IndustryFeaturesSectionProps) {
  return (
    <section
      className="relative px-6 py-16 sm:px-8 md:px-12 lg:px-20"
      style={{
        backgroundColor: colorTheme.primary(0.3),
      }}
    >
      <div className="mx-auto max-w-5xl text-center">
        {/* Title */}
        <h1 className="text-3xl leading-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          {title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg text-gray-700 md:text-xl">{subtitle}</p>

        {/* Description */}
        <p className="mt-4 text-base text-gray-700 sm:text-lg md:text-xl">
          {description}
        </p>
      </div>

      {/* Features */}
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl bg-white/70 p-6 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg">
              <i className={`fa-solid ${feature.icon} text-2xl`}></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 max-w-[250px] text-sm text-gray-700 sm:text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
