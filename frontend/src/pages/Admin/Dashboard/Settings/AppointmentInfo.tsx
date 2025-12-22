/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import AppointmentDetails from "@/components/settings/AppointmentDetails";
import AppointmentLockCard from "@/components/settings/AppointmentLockCard";
import BusinessTitleCard from "@/components/settings/BusinessTitleCard";
import { useApiClient } from "@/lib/axios";
import { BusinessDetailsType } from "@/types/BusinessTypes";
import { errorToast, successToast } from "@/utils/react-toast";
import { useEffect, useState } from "react";
import { useUserData } from "../../../../context/UserDataContext";

export default function AppointmentInfo() {
  const { userData } = useUserData();
  const apiClient = useApiClient();
  const [loading, setLoading] = useState(false);
  const [checkBusinessDetails, setCheckBusinessDetails] =
    useState<BusinessDetailsType | null>(() => {
      const stored = localStorage.getItem("businessAppointmentDetails");
      try {
        return stored ? (JSON.parse(stored) as BusinessDetailsType) : null;
      } catch {
        return null;
      }
    });
  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetailsType | null>(null);
  

  const subscriptionPlan = userData?.subscription?.plan; // essential / pro / plus / trial
  const hasAccess = subscriptionPlan === "trial" || subscriptionPlan === "plus";
  const isTrial = subscriptionPlan === "trial";

  const fetchAccountDetails = async () => {
    if (!hasAccess) return;
    try {
      setLoading(true);
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + userData?.businessId);

      const accountInfo = response.data.data;
      if (!localStorage.getItem("businessDetails")) {
        localStorage.setItem(
          "businessAppointmentDetails",
          JSON.stringify(response.data.data),
        );
      }
      setCheckBusinessDetails(accountInfo);
      setBusinessDetails(accountInfo);
      successToast("Appointment info fetched successfully");
    } catch (error: any) {
      const message = error.response.data.error;
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  //handleUpdateAgent
  const handleUpdateAgent = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/update-assistant/" + userData?.businessId);
      localStorage.clear();
      setCheckBusinessDetails(response.data.data);
      setBusinessDetails(response.data.data);
      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response.data.error;
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };
  // UseEffect
  useEffect(() => {
    fetchAccountDetails();
  }, [subscriptionPlan]);

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !businessDetails ? (
        <Loading />
      ) : hasAccess && businessDetails && checkBusinessDetails ? (
        <div className="flex flex-col gap-5">
          <BusinessTitleCard
            checkBusinessDetails={checkBusinessDetails}
            businessDetails={businessDetails}
            title="Appointments"
            canEdit={userData?.role !== "viewer"}
            handleUpdateAgent={handleUpdateAgent}
            subtitle="Allow your agent to handle appointments"
          />

          <AppointmentDetails
            setBusinessDetails={setBusinessDetails}
            appointmentMessage={
              businessDetails?.appointmentSettings.appointmentMessage || ""
            }
            schedulingLink={
              businessDetails?.appointmentSettings.schedulingLink || ""
            }
            appointmentEnabled={
              businessDetails?.appointmentSettings.appointmentEnabled
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
