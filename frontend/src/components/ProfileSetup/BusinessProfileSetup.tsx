import { useState } from "react";
import { useForm } from "react-hook-form";
import completeIcon from "../../assets/image/completeIcon.png";
import sparklesIcon from "../../assets/image/sparklesIcon.png";
import { appName } from "../../theme/appName";
import LeftInfoPanel from "./LeftInfoPanel";

export default function BusinessProfileSetup({
  currentStep,
  totalSteps,
  handleScrapeData,
}: {
  currentStep: number;
  totalSteps: number;
  handleScrapeData: (businessName: string) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { businessName: "" },
  });

  const businessName = watch("businessName");
  const [suggestions, setSuggestions] = useState<string[]>([
    "Pest Busters USA – Passaic Avenue, Passaic, NJ, USA",
    "Pest Busters Pest Control – Ogden Avenue, Downers Grove, IL, USA",
    "Pest Busters Pest Control – Shermer Road, Northbrook, IL, USA",
    "Pest Busters – White Street, Lowell, MA, USA",
    "PESTBUSTERS LLC – North Embree Street, Princeton, IL, USA",
  ]);

  const onSubmit = async (data: { businessName: string }) => {
    await handleScrapeData(data.businessName);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-2xl lg:h-full lg:flex-row">
      {/* Left info section */}
      <LeftInfoPanel
        currentStep={currentStep}
        totalSteps={totalSteps}
        heading={
          <>
            Train {appName} with your{" "}
            <span className="font-semibold text-purple-600">
              Google Business Profile
            </span>
          </>
        }
        listItems={[
          {
            icon: "fa-solid fa-magnifying-glass",
            text: "Find your profile by entering your business name.",
          },
          {
            icon: "fa-solid fa-robot",
            text: "Your AI agent will be trained on your Google profile.",
          },
          {
            icon: "fa-solid fa-clock",
            text: "Takes less than a minute!",
          },
        ]}
        trialText={
          <div className="flex gap-2">
            <img
              src={completeIcon}
              alt="Website Icon"
              className="h-5 w-5 shrink-0"
            />{" "}
            <span>
              Start risk-free:{" "}
              <span className="font-semibold">5-day trial</span> with all
              features
            </span>
          </div>
        }
      />

      {/* Right content section */}
      <div className="flex w-full items-center justify-center px-4 py-8 sm:px-8 lg:w-1/2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-lg flex-col gap-6 rounded-xl bg-gradient-to-b from-white to-gray-50 p-8 shadow-lg sm:p-10"
        >
          <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
            Find your Google Business Profile
          </h2>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search your business (e.g. pest busters)"
              {...register("businessName", {
                required: "Business name is required",
              })}
              className="w-full rounded-full border border-gray-300 px-6 py-4 text-lg text-gray-800 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
            />
            <i className="fa-solid fa-magnifying-glass absolute top-1/2 right-5 -translate-y-1/2 text-gray-400"></i>
          </div>

          {errors.businessName && (
            <p className="text-sm text-red-500">
              {errors.businessName.message}
            </p>
          )}

          {/* Mock dropdown suggestions */}
          {businessName && (
            <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-md">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="flex cursor-pointer items-center gap-2 px-4 py-3 hover:bg-gray-100"
                >
                  <i className="fa-solid fa-location-dot text-purple-500"></i>
                  {s}
                </li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className={`flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition active:scale-95 ${
              businessName
                ? "bg-purple-600 hover:bg-purple-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Train {appName}
            <img src={sparklesIcon} alt="Sparkles" className="h-6 w-6" />
          </button>

          <p className="text-right text-xs text-gray-400">
            powered by <span className="font-medium text-gray-600">Google</span>
          </p>
        </form>
      </div>
    </div>
  );
}
