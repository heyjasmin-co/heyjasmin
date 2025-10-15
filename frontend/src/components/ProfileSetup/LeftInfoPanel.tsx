import React from "react";
import { colorTheme } from "../../theme/colorTheme";

interface ListItem {
  icon: string;
  text: React.ReactNode;
}

interface LeftInfoPanelProps {
  currentStep: number;
  totalSteps: number;
  heading: React.ReactNode;
  progressBar?: boolean;
  listItems: ListItem[];
  trialText?: React.ReactNode;
  primaryColor?: number;
  secondaryColor?: number;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
}

export default function LeftInfoPanel({
  currentStep,
  totalSteps,
  heading,
  listItems,
  trialText,
  progressBar = true,
}: LeftInfoPanelProps) {
  return (
    <div
      className="flex h-full w-full flex-col rounded-t-2xl px-6 py-10 text-white sm:px-12 lg:w-1/2 lg:rounded-l-2xl lg:rounded-tr-none"
      style={{
        background: colorTheme.secondaryColor(0.9),
      }}
    >
      {/* Top: Stepper */}
      {progressBar && (
        <div className="mb-6 flex items-center gap-3 lg:mb-8">
          {/* {currentStep === totalSteps && setCurrentStep && !loading && (
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center justify-center rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
            >
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
          )} */}

          <span className="min-w-[36px] text-right text-sm font-medium">
            {currentStep}/{totalSteps}
          </span>

          <div className="h-2 flex-1 rounded-full bg-white/40">
            <div
              className="h-2 rounded-full bg-white transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Center: Heading + List */}
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="text-2xl leading-snug font-extrabold sm:text-3xl lg:text-4xl">
          {heading}
        </h1>

        <ul className="mt-6 space-y-4 text-base sm:mt-10 sm:space-y-5 sm:text-lg">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: colorTheme.primary(0.8) }}
              >
                <i className={`${item.icon} text-lg text-white`}></i>
              </div>
              <span className="flex-1 text-white">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: Trial Box */}
      {trialText && (
        <div className="mt-8 rounded-xl bg-white/20 p-4 text-sm font-medium backdrop-blur-md sm:mt-12 sm:p-5">
          {trialText}
        </div>
      )}
    </div>
  );
}
