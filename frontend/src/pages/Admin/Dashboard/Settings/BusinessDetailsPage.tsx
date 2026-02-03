import TrainingSources from "@/components/dashboard/TrainingSources";
import Loading from "@/components/Loading";
import BusinessDetails from "@/components/settings/BusinessDetails";
import BusinessHours from "@/components/settings/BusinessHours";
import BusinessTitleCard from "@/components/settings/BusinessTitleCard";
import CoreService from "@/components/settings/CoreService";
import { useUserData } from "@/context/UserDataContext";
import { useBusinessDetails, useUpdateAssistant } from "@/hooks/useBusiness";
import { appName } from "@/theme/appName";
import { BusinessDetailsType } from "@/types/BusinessTypes";
import { errorToast, successToast } from "@/utils/react-toast";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function BusinessDetailsPage() {
  const { userData } = useUserData();
  const [businessInfo, setBusinessInfo] = useState<BusinessDetailsType | null>(
    null,
  );
  const { data: businessDetails, isLoading } = useBusinessDetails(
    userData?.businessId || "",
  );
  const {
    isPending: updateAssistantPending,
    mutateAsync: updateAssistantMutation,
  } = useUpdateAssistant(userData?.businessId || "");

  useEffect(() => {
    if (businessDetails) {
      setBusinessInfo(businessDetails);
    }
  }, [businessDetails]);

  if (!userData?.businessId) {
    return <Loading />;
  }

  const handleUpdateAgent = async () => {
    updateAssistantMutation(undefined, {
      onSuccess: (data: BusinessDetailsType) => {
        setBusinessInfo(data);
        successToast("AI Agent updated successfully");
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ error: string }>;
        const message = axiosError.response?.data?.error || "Update failed";
        errorToast(message);
      },
    });
  };

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {isLoading && !businessInfo ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          {businessInfo && (
            <>
              <BusinessTitleCard
                businessDetails={businessInfo}
                title="Business Information"
                canEdit={userData?.role !== "viewer"}
                isLoading={updateAssistantPending}
                handleUpdateAgent={handleUpdateAgent}
                subtitle={`This business information gives ${appName} the context to handle your calls.`}
              />
              <TrainingSources businessWebsite={businessInfo.website!} />
              <BusinessDetails
                setBusinessDetails={setBusinessInfo}
                businessOverview={businessInfo.overview!}
                businessName={businessInfo.name}
                businessAddress={businessInfo.address!}
                canEdit={userData?.role !== "viewer"}
              />
              <CoreService
                businessServices={businessInfo.services}
                setBusinessDetails={setBusinessInfo}
                canEdit={userData?.role !== "viewer"}
              />
              <BusinessHours
                hours={businessInfo.businessHours}
                setBusinessDetails={setBusinessInfo}
                canEdit={userData?.role !== "viewer"}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
