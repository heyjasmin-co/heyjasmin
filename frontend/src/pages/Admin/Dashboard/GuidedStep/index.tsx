import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  useBusinessDetails,
  useUpdateAssistantSetup,
} from "../../../../api/hooks/useBusinessQueries";
import celebIcon from "../../../../assets/image/celebIcon.png";
import websiteIcon from "../../../../assets/image/websiteIcon.png";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import BusinessInfo from "../../../../components/dashboard/BusinessInfo";
import InfoCard from "../../../../components/dashboard/InfoCard";
import TalkToAgent from "../../../../components/dashboard/TalkToAgent";
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import Loading from "../../../../components/Loading";
import { useUserData } from "../../../../context/UserDataContext";
import { appName } from "../../../../theme/appName";
import { BusinessDetailsType } from "../../../../types/BusinessTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function Dashboard() {
  const [guideStep, setGuideStep] = useState(0);
  const { userData } = useUserData();
  const {
    data: businessDetailsResponse,
    isLoading: isFetching,
    refetch,
  } = useBusinessDetails(userData?.businessId);
  const { mutate: updateAssistantSetup } = useUpdateAssistantSetup();

  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetailsType | null>(null);

  useEffect(() => {
    if (businessDetailsResponse?.data) {
      setBusinessDetails(businessDetailsResponse.data);
    }
  }, [businessDetailsResponse]);

  const handleLaunchAgent = async (assistantSetup: string) => {
    updateAssistantSetup(
      {
        businessId: userData?.businessId || "",
        data: { assistantSetup },
      },
      {
        onSuccess: (response) => {
          const aiAgentSettings = response.data.aiAgentSettings;
          setBusinessDetails((prev) =>
            prev ? { ...prev, aiAgentSettings } : prev,
          );
          successToast(response.message);
          refetch(); // Ensure alignment
        },
        onError: (error: unknown) => {
          const apiError = error as AxiosError<{ error: string }>;
          errorToast(
            apiError.response?.data?.error || "Failed to update setup",
          );
        },
      },
    );
  };

  useEffect(() => {
    if (businessDetails) {
      const { assistantSetup, twilioNumber } =
        businessDetails.aiAgentSettings || {};
      if (assistantSetup === "testing" && twilioNumber) {
        setGuideStep(1);
      } else if (assistantSetup === "completed" && twilioNumber) {
        setGuideStep(2);
      } else {
        setGuideStep(0);
      }
    }
  }, [businessDetails]);

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {/* Container */}
      {isFetching && !businessDetails ? (
        <Loading />
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
                  <TrainingSources businessWebsite={businessDetails.website!} />
                  <BusinessInfo
                    businessDetails={businessDetails}
                    setBusinessDetails={setBusinessDetails}
                    canEdit={userData?.role !== "viewer"}
                  />
                </>
              )}
            </>
          )}
          {guideStep === 1 && businessDetails && (
            <TalkToAgent
              businessDetails={businessDetails}
              handleLaunchAgent={handleLaunchAgent}
            />
          )}
          {guideStep === 2 && (
            <InfoCard
              icon={celebIcon}
              title={`Ready to Launch`}
              subtitle={` Well done! Forward your business number to ${appName} so she can start answering your calls.`}
            />
          )}
        </div>
      )}
    </div>
  );
}
