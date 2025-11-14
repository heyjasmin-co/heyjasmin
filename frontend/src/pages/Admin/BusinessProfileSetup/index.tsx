/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleBusinessProfileSetup from "../../../components/ProfileSetup/GoogleBusinessProfile";
import PreviewAgentVoice from "../../../components/ProfileSetup/PreviewAgentVoice";
import ScriptingProfile from "../../../components/ProfileSetup/ScriptingProfile";
import WebsiteProfileSetup from "../../../components/ProfileSetup/WebsiteProfileSetup";
import { useUserData } from "../../../context/UserDataContext";
import { useScrapeApiClient } from "../../../lib/axios";
import { BusinessCreationType } from "../../../types/BusinessTypes";
import { errorToast, successToast } from "../../../utils/react-toast";

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const scrapeApiClient = useScrapeApiClient();
  const [loading, setLoading] = useState(false);
  const [scrapeType, setScrapeType] = useState("business");
  const { userData } = useUserData();
  const [businessDetails, setBusinessDetails] =
    useState<BusinessCreationType | null>(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (userData?.businessId) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [userData, navigate]);
  const handleScrapeData = async (websiteUrl: string) => {
    setLoading(true);
    try {
      setCurrentStep(3);
      const response = await scrapeApiClient.post<{
        message: string;
        data: {
          name: string;
          messageAudio: any;
          greetingAudio: any;
        };
        success: boolean;
      }>(`/scrape`, {
        websiteUrl,
      });
      successToast(response.data.message);
      setCurrentStep(4);
      setBusinessDetails(response.data.data);
    } catch (_error) {
      errorToast("Failed to train the agent. Please try again.");
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto p-4 sm:p-6 lg:p-8">
      {/* Centered container */}
      {currentStep === 1 && scrapeType === "business" && (
        <div className="h-auto min-h-[400px] w-full max-w-[1100px] sm:min-h-[500px] lg:h-[600px]">
          <GoogleBusinessProfileSetup
            totalSteps={totalSteps}
            currentStep={currentStep}
            setBusinessDetails={setBusinessDetails}
            setLoading={setLoading}
            setCurrentStep={setCurrentStep}
            setScrapeType={setScrapeType}
          />
        </div>
      )}

      {currentStep === 1 && scrapeType === "website" && (
        <div className="h-auto min-h-[400px] w-full max-w-[1100px] sm:min-h-[500px] lg:h-[600px]">
          <WebsiteProfileSetup
            totalSteps={totalSteps}
            currentStep={currentStep}
            handleScrapeData={handleScrapeData}
            setScrapeType={setScrapeType}
          />
        </div>
      )}
      {currentStep === 3 && (
        <div className="h-auto min-h-[400px] w-full max-w-[1100px] sm:min-h-[500px] lg:h-[600px]">
          <ScriptingProfile
            loading={loading}
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      )}
      {currentStep === 4 && businessDetails && (
        <div className="h-auto min-h-[400px] w-full max-w-[1100px] sm:min-h-[500px] lg:h-[600px]">
          <PreviewAgentVoice
            businessDetails={businessDetails}
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
        </div>
      )}
    </div>
  );
}
