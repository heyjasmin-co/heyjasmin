/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import AppointmentDetails from "@/components/settings/AppointmentDetails";
import AppointmentLockCard from "@/components/settings/AppointmentLockCard";
import BusinessTitleCard from "@/components/settings/BusinessTitleCard";
import { BusinessDetailsType } from "@/types/BusinessTypes";
import { errorToast, successToast } from "@/utils/react-toast";
import { useEffect, useState } from "react";
import { useUserData } from "../../../../context/UserDataContext";
import {
  useBusinessDetails,
  useUpdateAssistant,
} from "../../../../hooks/useBusiness";

export default function AppointmentInfo() {
  const { userData } = useUserData();
  const [appointmentInfo, setAppointmentInfo] =
    useState<BusinessDetailsType | null>(null);
  const subscriptionPlan = userData?.subscription?.plan; // essential / pro / plus / trial
  const hasAccess = subscriptionPlan === "pro" || subscriptionPlan === "plus";
  const isTrial = subscriptionPlan === "trial";

  if (!userData?.businessId) {
    return <Loading />;
  }
  const { data: fetchedAppointmentInfo, isLoading } = useBusinessDetails(
    userData.businessId!,
  );
  const updateAssistantMutation = useUpdateAssistant(userData.businessId!);

  useEffect(() => {
    if (fetchedAppointmentInfo) {
      setAppointmentInfo(fetchedAppointmentInfo);
    }
  }, [fetchedAppointmentInfo]);

  const handleUpdateAgent = async () => {
    updateAssistantMutation.mutate(undefined, {
      onSuccess: (data: any) => {
        setAppointmentInfo(data);
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
      {isLoading && !appointmentInfo ? (
        <Loading />
      ) : hasAccess && appointmentInfo ? (
        <div className="flex flex-col gap-5">
          <BusinessTitleCard
            checkBusinessDetails={fetchedAppointmentInfo || appointmentInfo}
            businessDetails={appointmentInfo}
            title="Appointments"
            canEdit={userData?.role !== "viewer"}
            handleUpdateAgent={handleUpdateAgent}
            subtitle="Allow your agent to handle appointments"
          />

          <AppointmentDetails
            setBusinessDetails={setAppointmentInfo}
            appointmentMessage={
              appointmentInfo?.appointmentSettings.appointmentMessage || ""
            }
            schedulingLink={
              appointmentInfo?.appointmentSettings.schedulingLink || ""
            }
            appointmentEnabled={
              appointmentInfo?.appointmentSettings.appointmentEnabled
            }
            canEdit={userData?.role !== "viewer"}
          />
        </div>
      ) : (
        <AppointmentLockCard
          subscriptionPlan={subscriptionPlan || ""}
          isTrial={isTrial}
        />
      )}
    </div>
  );
}
