/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import celebIcon from "../../../../assets/image/celebIcon.png";
import loadingGif from "../../../../assets/image/loadingGif.gif";
import websiteIcon from "../../../../assets/image/websiteIcon.png";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import BusinessInfo from "../../../../components/dashboard/BusinessInfo";
import InfoCard from "../../../../components/dashboard/InfoCard";
import TalkToAgent from "../../../../components/dashboard/TalkToAgent";
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import { useUserData } from "../../../../context/UserDataContext";
import { useApiClient } from "../../../../lib/axios";
import { appName } from "../../../../theme/appName";
import { BusinessDetailsType } from "../../../../types/BusinessTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";
export default function Dashboard() {
  const [guideStep, setGuideStep] = useState(0);
  const apiClient = useApiClient();
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetailsType | null>(null);

  const fetchBusinessDetails = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + userData?.businessId);

      setBusinessDetails(response.data.data);
      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response.data.error;
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };
  const handleStep = () => {
    if (!(guideStep < 3)) {
      return;
    }
    setGuideStep(guideStep + 1);
  };

  // UseEffect
  useEffect(() => {
    fetchBusinessDetails();
  }, []);
  useEffect(() => {
    if (businessDetails) {
      if (businessDetails.aiAgentSettings.agentNumber) {
        setGuideStep(1);
      }
    }
  }, [businessDetails]);
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {/* Container */}
      {loading && !businessDetails ? (
        <div className="w-hull bg-blue flex h-full items-center justify-center">
          <img src={loadingGif} />
        </div>
      ) : (
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
              {businessDetails && (
                <>
                  <TrainingSources businessWebsite={businessDetails.website} />
                  <BusinessInfo
                    businessDetails={businessDetails}
                    setBusinessDetails={setBusinessDetails}
                  />
                </>
              )}
            </>
          )}
          {guideStep === 1 && <TalkToAgent handleStep={handleStep} />}
          {guideStep === 2 && (
            <InfoCard
              icon={celebIcon}
              title={`Ready to Launch`}
              subtitle={` Well done! Forward your business number to ${appName} so she can start answering your calls.`}
            />
          )}

          {/* Talk to Jasmin */}

          {/* {guideStep !== 2 && (
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
        )} */}
        </div>
      )}
    </div>
  );
}
