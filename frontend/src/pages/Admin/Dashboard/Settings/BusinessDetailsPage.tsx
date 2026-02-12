import {
  useBusinessDetails,
  useUpdateAssistant,
} from "../../../../api/hooks/useBusinessQueries";
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import Loading from "../../../../components/Loading";
import BusinessDetails from "../../../../components/settings/BusinessDetails";
import BusinessHours from "../../../../components/settings/BusinessHours";
import BusinessTitleCard from "../../../../components/settings/BusinessTitleCard";
import CoreService from "../../../../components/settings/CoreService";
import { useUserData } from "../../../../context/UserDataContext";
import { appName } from "../../../../theme/appName";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function BusinessDetailsPage() {
  const { userData } = useUserData();

  const {
    data: businessResponse,
    isLoading,
    refetch: fetchBusinessDetails,
  } = useBusinessDetails(userData?.businessId);

  const updateAssistantMutation = useUpdateAssistant();

  const businessDetails = businessResponse?.data || null;

  const handleUpdateAgent = async () => {
    try {
      const response = await updateAssistantMutation.mutateAsync(
        userData?.businessId || "",
      );
      successToast(response.message);
    } catch (error: unknown) {
      let errorMessage = "Failed to update assistant";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response: { data: { error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error || "Failed to update assistant";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      errorToast(errorMessage);
    }
  };

  const handleRefetch = async () => {
    await fetchBusinessDetails();
  };

  if (isLoading && !businessDetails)
    return (
      <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
        <Loading />
      </div>
    );

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div className="flex flex-col gap-5">
        {businessDetails && (
          <>
            <BusinessTitleCard
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
              refetch={handleRefetch}
            />
            <CoreService
              businessServices={businessDetails.services}
              canEdit={userData?.role !== "viewer"}
              refetch={handleRefetch}
            />
            <BusinessHours
              hours={businessDetails.businessHours}
              canEdit={userData?.role !== "viewer"}
              refetch={handleRefetch}
            />
          </>
        )}
      </div>
    </div>
  );
}
