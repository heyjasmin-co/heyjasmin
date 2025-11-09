import completeIcon from "../../assets/image/completeIcon.png";
import sparklesIcon from "../../assets/image/sparklesIcon.png";
import { useUserData } from "../../context/UserDataContext";
import { appName } from "../../theme/appName";
import { BusinessDetailsType } from "../../types/BusinessTypes";
import LeftInfoPanel from "./LeftInfoPanel";

export default function PreviewAgentVoice({
  currentStep,
  totalSteps,
  businessDetails,
}: {
  businessDetails: BusinessDetailsType;
  currentStep: number;
  totalSteps: number;
}) {
  const user = useUserData();

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
      {/* Left Info Panel */}
      <LeftInfoPanel
        currentStep={currentStep}
        totalSteps={totalSteps}
        heading={
          <>
            <span className="font-semibold text-purple-600">Preview</span>{" "}
            {businessDetails.name}.
          </>
        }
        listItems={[
          {
            icon: "fa-solid fa-graduation-cap",
            text: `${appName} has been trained on your data.`,
          },
          {
            icon: "fa-solid fa-volume-high",
            text: "Listen to the examples to hear your agent.",
          },
          {
            icon: "fa-solid fa-hourglass-half",
            text: (
              <>
                Claim your agent and{" "}
                <span className="font-semibold">get started for free.</span>
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
            />{" "}
            <span>
              Start risk-free:{" "}
              <span className="font-semibold">5-day trial</span> with all
              features
            </span>
          </div>
        }
      />

      {/* Right Preview Section */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2">
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
          Listen to a few examples below…
        </h2>

        <div className="flex w-full max-w-md flex-col gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-bold text-gray-700">
              Greeting
            </label>
            <audio controls className="w-full rounded-lg">
              <source src="/audio/greeting-sample.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-lg font-bold text-gray-700">
              Message
            </label>
            <audio controls className="w-full rounded-lg">
              <source src="/audio/message-sample.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Claim your {appName} agent to customize your new AI answering service.
        </p>

        <button
          onClick={handleClaimAgent}
          className="mt-6 flex w-full max-w-md items-center justify-center rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-purple-700 active:scale-95"
          style={{
            color: "white",
          }}
        >
          Claim your Agent
          <img src={sparklesIcon} alt="Sparkles" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
