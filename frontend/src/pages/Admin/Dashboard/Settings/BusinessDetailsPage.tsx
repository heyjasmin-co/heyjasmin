import { useEffect, useState } from "react";
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import Loading from "../../../../components/Loading";
import BusinessDetails from "../../../../components/settings/BusinessDetails";
import BusinessHours from "../../../../components/settings/BusinessHours";
import BusinessTitleCard from "../../../../components/settings/BusinessTitleCard";
import CoreService from "../../../../components/settings/CoreService";
import { useUserData } from "../../../../context/UserDataContext";
import {
  useBusinessDetails,
  useUpdateAssistant,
} from "../../../../hooks/useBusiness";
import { useTeammates } from "../../../../hooks/useUser";
import { appName } from "../../../../theme/appName";
import { BusinessDetailsType } from "../../../../types/BusinessTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function BusinessDetailsPage() {
  const { userData } = useUserData();
  const [businessDetailsState, setBusinessDetailsState] =
    useState<BusinessDetailsType | null>(null);

  const { data: businessDetails, isLoading } = useBusinessDetails(
    userData?.businessId || undefined,
  );
  const { data: businessUsers } = useTeammates(
    userData?.businessId || undefined,
  );
  console.log(businessDetailsState, businessUsers); // avoid unused warnings
  const updateAssistantMutation = useUpdateAssistant(userData?.businessId);

  useEffect(() => {
    if (businessDetails) {
      setBusinessDetailsState(businessDetails);
    }
  }, [businessDetails]);

  const handleUpdateAgent = async () => {
    updateAssistantMutation.mutate(undefined, {
      onSuccess: (data: any) => {
        setBusinessDetailsState(data);
        successToast("AI Agent updated successfully");
      },
      onError: (error: any) => {
        const message = error.response?.data?.error || "Update failed";
        errorToast(message);
      },
    });
  };

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {isLoading && !businessDetails ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          {businessDetails && (
            <>
              <BusinessTitleCard
                checkBusinessDetails={businessDetails}
                businessDetails={businessDetails}
                title="Business Information"
                canEdit={userData?.role !== "viewer"}
                handleUpdateAgent={handleUpdateAgent}
                subtitle={`This business information gives ${appName} the context to handle your calls.`}
              />
              <TrainingSources businessWebsite={businessDetails.website!} />
              <BusinessDetails
                setBusinessDetails={setBusinessDetailsState}
                businessOverview={businessDetails.overview!}
                businessName={businessDetails.name}
                businessAddress={businessDetails.address!}
                canEdit={userData?.role !== "viewer"}
              />
              <CoreService
                businessServices={businessDetails.services}
                setBusinessDetails={setBusinessDetailsState}
                canEdit={userData?.role !== "viewer"}
              />
              <BusinessHours
                hours={businessDetails.businessHours}
                setBusinessDetails={setBusinessDetailsState}
                canEdit={userData?.role !== "viewer"}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
