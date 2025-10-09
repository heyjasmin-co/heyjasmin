import { useState } from "react";
import ScriptingProfile from "../../../components/ProfileSetup/ScriptingProfile";
import WebsiteProfileSetup from "../../../components/ProfileSetup/WebsiteProfileSetup";
import { useApiClient } from "../../../lib/axios";

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const apiClient = useApiClient();
  const handleScrapeData = async (websiteUrl: string) => {
    setCurrentStep(2);
    console.log(websiteUrl);
    await apiClient.post(`/scrape`, {
      websiteUrl,
    });
    // const websiteData = await extractBusinessData(websiteUrl);
    // console.log(websiteData);
  };
  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto p-4 sm:p-6 lg:p-8">
      {/* Centered container */}
      {currentStep === 1 && (
        <div className="h-auto min-h-[400px] w-full max-w-[1100px] sm:min-h-[500px] lg:h-[600px]">
          <WebsiteProfileSetup
            totalSteps={totalSteps}
            currentStep={currentStep}
            handleScrapeData={handleScrapeData}
          />
        </div>
      )}
      {currentStep === 2 && (
        <div className="h-auto min-h-[400px] w-full max-w-[1100px] sm:min-h-[500px] lg:h-[600px]">
          <ScriptingProfile
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      )}
    </div>
  );
}
