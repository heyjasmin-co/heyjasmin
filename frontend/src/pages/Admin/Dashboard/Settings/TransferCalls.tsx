import BusinessTitleCard from "@/components/settings/BusinessTitleCard";
import TransferCallsContent from "@/components/settings/TransferCalls/TransferCallsContent";
import { appName } from "@/theme/appName";
import { errorToast, successToast } from "@/utils/react-toast";
import {
  useBusinessDetails,
  useUpdateAssistant,
} from "../../../../api/hooks/useBusinessQueries";
import { useUserData } from "../../../../context/UserDataContext";

export default function TransferCalls() {
  const { userData } = useUserData();

  const { data: businessResponse, refetch: fetchBusinessDetails } =
    useBusinessDetails(userData?.businessId);

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

  const subscriptionPlan = userData?.subscription?.plan;
  const hasAccess = subscriptionPlan === "pro" || subscriptionPlan === "plus";

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-2 py-6 shadow-lg sm:px-6">
      {businessDetails && (
        <div className="flex flex-col gap-5">
          <BusinessTitleCard
            businessDetails={businessDetails}
            title="Transfer Calls"
            canEdit={hasAccess && userData?.role !== "viewer"}
            handleUpdateAgent={handleUpdateAgent}
            subtitle={`Allow ${appName} to transfer a call.`}
          />

          <TransferCallsContent
            businessDetails={businessDetails}
            canEdit={userData?.role !== "viewer"}
            hasAccess={hasAccess}
            refetch={handleRefetch}
          />
        </div>
      )}
    </div>
  );
}
