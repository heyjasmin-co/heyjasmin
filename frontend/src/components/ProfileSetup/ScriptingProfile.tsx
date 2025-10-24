import React from "react";
import { useNavigate } from "react-router-dom";
import completeIcon from "../../assets/image/completeIcon.png";
import sparklesIcon from "../../assets/image/sparklesIcon.png";
import { useUserData } from "../../context/UserDataContext";
import { appName } from "../../theme/appName";
import { colorTheme } from "../../theme/colorTheme";
import LeftInfoPanel from "./LeftInfoPanel";
export default function ScriptingProfile({
  currentStep,
  totalSteps,
  setCurrentStep,
  loading,
}: {
  currentStep: number;
  loading: boolean;
  totalSteps: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigate = useNavigate();
  const user = useUserData();
  const trainingSteps = [
    { label: "Analyzing your website for data." },
    { label: "Processing your business information." },
    { label: "Optimizing your data for AI." },
    { label: "Generating your custom Jasmin agent." },
  ];
  const handleClaimAgent = () => {
    user.setUserData((prev) => {
      if (prev) {
        return { ...prev, hasCompletedSetup: true };
      }
      return prev;
    });
    window.location.href = "/admin/dashboard";
  };
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-2xl lg:h-full lg:flex-row">
      <LeftInfoPanel
        currentStep={currentStep}
        totalSteps={totalSteps}
        setCurrentStep={setCurrentStep}
        heading={
          <>
            Building your{" "}
            <span className="text-purple-300">{appName} Agent</span>
          </>
        }
        listItems={[
          {
            icon: "fa-solid fa-desktop",
            text: `${appName} is scanning your website and available data.`,
          },
          {
            icon: "fa-solid fa-scissors",
            text: (
              <>
                Your custom AI agent is being{" "}
                <span className="font-bold">tailored to your business</span>.
              </>
            ),
          },
        ]}
        trialText={
          <div className="flex gap-2">
            <img
              src={completeIcon}
              alt="Website Icon"
              className="h-5 w-5 shrink-0"
            />
            <span>
              Start risk-free:{" "}
              <span className="font-semibold">5-day trial</span> with all
              features
            </span>
          </div>
        }
      />

      {/* Right section */}
      <div className="flex w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2">
        <div className="flex w-full max-w-lg flex-col gap-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {appName} is training on your data
          </h2>

          {/* Progress bar */}
          <div className="h-3 w-full rounded-full bg-gray-200"></div>

          {/* Training steps */}
          <div className="mt-8 space-y-6">
            {trainingSteps.map((stepItem, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-md ${
                    loading ? "animate-spin-slow" : "bg-green-500"
                  }`}
                  style={{
                    backgroundColor: loading
                      ? colorTheme.secondaryColor(1)
                      : "",
                  }}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner animate-spin text-sm text-white"></i>
                  ) : (
                    <img
                      src={completeIcon}
                      alt="Complete"
                      className="h-8 w-8 object-contain"
                    />
                  )}
                </div>
                <span
                  className={`text-base ${loading ? "font-medium text-gray-900" : "text-gray-400"}`}
                >
                  {stepItem.label}
                </span>
              </div>
            ))}
          </div>

          {/* Train button */}
          {!loading && (
            <button
              onClick={handleClaimAgent}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-purple-700 active:scale-95"
              style={{
                color: "white",
              }}
            >
              Claim your Agent
              <img src={sparklesIcon} alt="Sparkles" className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
