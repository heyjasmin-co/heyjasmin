/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import AppointmentDetails from "@/components/settings/Appointment/AppointmentDetails";
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
  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetailsType | null>(null);

  const subscriptionPlan = userData?.subscription?.plan; // essential / pro / plus / trial
  const hasAccess = subscriptionPlan === "pro" || subscriptionPlan === "plus";
  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + userData?.businessId);

      setBusinessDetails(response.data.data);
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
    const fetch = async () => {
      await fetchAccountDetails();
    };
    fetch();
  }, [userData?.businessId]);

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !businessDetails ? (
        <Loading />
      ) : (
        businessDetails && (
          <div className="flex flex-col gap-5">
            <BusinessTitleCard
              businessDetails={businessDetails}
              title="Appointments"
              canEdit={userData?.role !== "viewer"}
              handleUpdateAgent={handleUpdateAgent}
              subtitle="Allow your agent to handle appointments"
            />

            <AppointmentDetails
              setBusinessDetails={setBusinessDetails}
              hasAccess={hasAccess}
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
              refetch={fetchAccountDetails}
            />
          </div>
        )
      )}
    </div>
  );
}
