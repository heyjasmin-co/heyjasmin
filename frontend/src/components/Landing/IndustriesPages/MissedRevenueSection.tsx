import React from "react";
import { NavLink } from "react-router-dom";

type RevenueData = {
  calls: number;
  missedCalls: number;
  missedJobs: number;
  lostRevenue: string;
};

type MissedRevenueSectionProps = {
  title: string;
  subtitle: string;
  averageJob: string;
  averageRevenue: string;
  data: RevenueData[];
  ctaLabel: string;
  ctaLink: string;
  icon: string;
};

export const MissedRevenueSection: React.FC<MissedRevenueSectionProps> = ({
  title,
  subtitle,
  averageJob,
  averageRevenue,
  data,
  ctaLabel,
  ctaLink,
  icon,
}) => {
  return (
    <section className="bg-white px-6 py-16 text-gray-800 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl text-center">
        {/* Header */}
        <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
          {title.split("=").map((part, index) =>
            index === 1 ? (
              <span key={index} className="text-indigo-600">
                ={part}
              </span>
            ) : (
              part
            ),
          )}
        </h2>
        <p className="mb-10 text-base text-gray-600 md:text-lg">{subtitle}</p>

        {/* ROI Card */}
        <div className="rounded-2xl border border-indigo-200 p-6 text-left shadow-sm md:p-10">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 flex items-center gap-3 md:mb-0">
              <i className={`fa-solid ${icon} text-2xl text-indigo-600`}></i>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700">
                  ROI calculator
                </h3>
                <p className="text-sm text-gray-600">
                  Average job: <span className="font-medium">{averageJob}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <i className="fa-solid fa-dollar-sign text-2xl text-indigo-600"></i>
              <div>
                <p className="text-sm text-gray-600">
                  Average revenue per job:
                </p>
                <p className="text-lg font-semibold text-indigo-700">
                  {averageRevenue}
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-indigo-50 text-sm text-gray-700 md:text-base">
                  <th className="rounded-tl-xl px-4 py-3">Calls per month</th>
                  <th className="px-4 py-3">Missed calls (28%)</th>
                  <th className="px-4 py-3">Missed jobs (75%)</th>
                  <th className="rounded-tr-xl px-4 py-3">Lost revenue</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t text-gray-700 transition-colors hover:bg-indigo-50"
                  >
                    <td className="px-4 py-3 font-medium">{row.calls}</td>
                    <td className="px-4 py-3">{row.missedCalls}</td>
                    <td className="px-4 py-3">{row.missedJobs}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      {row.lostRevenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <NavLink
              to={ctaLink}
              className="inline-block rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700"
              style={{
                color: "white",
              }}
            >
              {ctaLabel}
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
