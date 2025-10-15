import { useState } from "react";
import { toast } from "react-toastify";
import ScriptingProfile from "../../../components/ProfileSetup/ScriptingProfile";
import WebsiteProfileSetup from "../../../components/ProfileSetup/WebsiteProfileSetup";
import { useScrapeApiClient } from "../../../lib/axios";

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const scrapeApiClient = useScrapeApiClient();
  const [loading, setLoading] = useState(false);
  const handleScrapeData = async (websiteUrl: string) => {
    setLoading(true);
    try {
      setCurrentStep(2);
      const response = await scrapeApiClient.post(`/scrape`, {
        websiteUrl,
      });
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      toast.error("Failed to train the agent. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
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
            loading={loading}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      )}
    </div>
  );
}
