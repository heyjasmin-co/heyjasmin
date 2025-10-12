import { useState } from "react";
import celebIcon from "../../../../assets/image/celebIcon.png";
import nextIcon from "../../../../assets/image/nextIcon.png";
import websiteIcon from "../../../../assets/image/websiteIcon.png";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import BusinessInfo from "../../../../components/dashboard/BusinessInfo";
import InfoCard from "../../../../components/dashboard/InfoCard";
import TalkToAgent from "../../../../components/dashboard/TalkToAgent";
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import { appName } from "../../../../theme/appName";

export default function Dashboard() {
  const [guideStep, setGuideStep] = useState(0);
  const handleStep = () => {
    if (!(guideStep < 3)) {
      return;
    }
    setGuideStep(guideStep + 1);
  };
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {/* Container */}
      <div className="mx-auto flex w-full max-w-3xl flex-col space-y-6">
        {/* Breadcrumb */}
        <div className="w-full">
          <Breadcrumb currentStep={guideStep} />
        </div>
        {guideStep === 0 && (
          <>
            {/* Info Card */}
            <InfoCard
              icon={websiteIcon}
              title={`Welcome to ${appName}!`}
              subtitle={
                "Use this quick setup guide to get your agent ready to handle calls in just a few minutes. 🎉"
              }
            />

            <TrainingSources businessProfile={""} businessWebsite={""} />
            <BusinessInfo businessProfile={""} businessWebsite={""} />
          </>
        )}
        {guideStep === 1 && <TalkToAgent />}
        {guideStep === 2 && (
          <InfoCard
            icon={celebIcon}
            title={`Ready to Launch`}
            subtitle={` Well done! Forward your business number to ${appName} so she can start answering your calls.`}
          />
        )}

        {/* Talk to Jasmin */}

        {guideStep !== 2 && (
          <div className="flex flex-col gap-3 px-4 sm:flex-row sm:justify-end">
            <button
              onClick={handleStep}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 sm:w-auto"
            >
              <span className="text-xl font-bold">
                {guideStep == 0 && `Talk to ${appName}`}
                {guideStep == 1 && `Continue`}
              </span>
              <img src={nextIcon} alt="Next Icon" className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
