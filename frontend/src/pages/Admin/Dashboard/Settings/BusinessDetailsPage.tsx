/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import Loading from "../../../../components/Loading";
import BusinessDetails from "../../../../components/settings/BusinessDetails";
import BusinessHours from "../../../../components/settings/BusinessHours";
import BusinessTitleCard from "../../../../components/settings/BusinessTitleCard";
import CoreService from "../../../../components/settings/CoreService";
import { useUserData } from "../../../../context/UserDataContext";
import { useUpdateAssistant } from "../../../../hooks/api/useBusinessMutations";
import { useGetBusinessDetails } from "../../../../hooks/api/useBusinessQueries";
import { appName } from "../../../../theme/appName";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function BusinessDetailsPage() {
  const { userData } = useUserData();

  const { data: businessDetails, isLoading: loadingBusiness } =
    useGetBusinessDetails(userData?.businessId || null);

  const { mutateAsync: updateAssistant } = useUpdateAssistant();

  const handleUpdateAgent = async () => {
    if (!userData?.businessId) return;
    try {
      const response = await updateAssistant(userData.businessId);
      successToast(response.message);
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Failed to update assistant";
      errorToast(message);
    }
  };

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loadingBusiness && !businessDetails ? (
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
                businessOverview={businessDetails.overview!}
                businessName={businessDetails.name}
                businessAddress={businessDetails.address!}
                canEdit={userData?.role !== "viewer"}
              />
              <CoreService
                businessServices={businessDetails.services}
                canEdit={userData?.role !== "viewer"}
              />
              <BusinessHours
                hours={businessDetails.businessHours}
                canEdit={userData?.role !== "viewer"}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
