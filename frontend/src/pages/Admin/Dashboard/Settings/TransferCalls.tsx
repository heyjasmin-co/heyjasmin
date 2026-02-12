/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import BusinessTitleCard from "@/components/settings/BusinessTitleCard";
import TransferCallsContent from "@/components/settings/TransferCalls/TransferCallsContent";
import { useApiClient } from "@/lib/axios";
import { appName } from "@/theme/appName";
import { BusinessDetailsType } from "@/types/BusinessTypes";
import { errorToast, successToast } from "@/utils/react-toast";
import { useEffect, useState } from "react";
import { useUserData } from "../../../../context/UserDataContext";

export default function TransferCalls() {
  const { userData } = useUserData();
  const apiClient = useApiClient();
  const [loading, setLoading] = useState(false);
  const [checkBusinessDetails, setCheckBusinessDetails] =
    useState<BusinessDetailsType | null>(() => {
      const stored = localStorage.getItem("businessTransferDetails");
      try {
        return stored ? (JSON.parse(stored) as BusinessDetailsType) : null;
      } catch {
        return null;
      }
    });
  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetailsType | null>(null);

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + userData?.businessId);

      const accountInfo = response.data.data;
      if (!localStorage.getItem("businessTransferDetails")) {
        localStorage.setItem(
          "businessTransferDetails",
          JSON.stringify(response.data.data),
        );
      }
      setCheckBusinessDetails(accountInfo);
      setBusinessDetails(accountInfo);
    } catch (error: any) {
      const message = error.response?.data?.error || "Failed to fetch info";
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAgent = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/update-assistant/" + userData?.businessId);

      // Update both local states after successful publish
      setCheckBusinessDetails(response.data.data);
      setBusinessDetails(response.data.data);
      localStorage.setItem(
        "businessTransferDetails",
        JSON.stringify(response.data.data),
      );

      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response?.data?.error || "Failed to publish";
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  const subscriptionPlan = userData?.subscription?.plan;
  const hasAccess = subscriptionPlan === "pro" || subscriptionPlan === "plus";

  useEffect(() => {
    fetchAccountDetails();
  }, [userData?.businessId]);

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-2 py-6 shadow-lg sm:px-6">
      {loading && !businessDetails ? (
        <Loading />
      ) : (
        businessDetails &&
        checkBusinessDetails && (
          <div className="flex flex-col gap-5">
            <BusinessTitleCard
              checkBusinessDetails={checkBusinessDetails}
              businessDetails={businessDetails}
              title="Transfer Calls"
              canEdit={userData?.role !== "viewer"}
              handleUpdateAgent={handleUpdateAgent}
              subtitle={`Allow ${appName} to transfer a call.`}
            />

            <TransferCallsContent
              businessDetails={businessDetails}
              setBusinessDetails={setBusinessDetails}
              canEdit={userData?.role !== "viewer"}
              hasAccess={hasAccess}
            />
          </div>
        )
      )}
    </div>
  );
}
