import Loading from "@/components/Loading";
import AppointmentDetails from "@/components/settings/Appointment/AppointmentDetails";
import BusinessTitleCard from "@/components/settings/BusinessTitleCard";
import { errorToast, successToast } from "@/utils/react-toast";
import {
  useBusinessDetails,
  useUpdateAssistant,
} from "../../../../api/hooks/useBusinessQueries";
import { useUserData } from "../../../../context/UserDataContext";

export default function AppointmentInfo() {
  const { userData } = useUserData();

  const {
    data: businessResponse,
    isLoading,
    refetch: fetchBusinessDetails,
  } = useBusinessDetails(userData?.businessId);

  const updateAssistantMutation = useUpdateAssistant();

  const businessDetails = businessResponse?.data || null;

  const subscriptionPlan = userData?.subscription?.plan; // essential / pro / plus / trial
  const hasAccess = subscriptionPlan === "pro" || subscriptionPlan === "plus";

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
      {businessDetails && (
        <div className="flex flex-col gap-5">
          <BusinessTitleCard
            businessDetails={businessDetails}
            title="Appointments"
            canEdit={userData?.role !== "viewer"}
            handleUpdateAgent={handleUpdateAgent}
            subtitle="Allow your agent to handle appointments"
          />

          <AppointmentDetails
            hasAccess={hasAccess}
            appointmentMessage={
              businessDetails?.appointmentSettings?.appointmentMessage || ""
            }
            schedulingLink={
              businessDetails?.appointmentSettings?.schedulingLink || ""
            }
            appointmentEnabled={
              !!businessDetails?.appointmentSettings?.appointmentEnabled
            }
            canEdit={userData?.role !== "viewer"}
            refetch={handleRefetch}
          />
        </div>
      )}
    </div>
  );
}
