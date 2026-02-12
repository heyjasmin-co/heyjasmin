/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import Loading from "../../../../components/Loading";
import BusinessDetails from "../../../../components/settings/BusinessDetails";
import BusinessHours from "../../../../components/settings/BusinessHours";
import BusinessTitleCard from "../../../../components/settings/BusinessTitleCard";
import CoreService from "../../../../components/settings/CoreService";
import { useUserData } from "../../../../context/UserDataContext";
import { useApiClient } from "../../../../lib/axios";
import { appName } from "../../../../theme/appName";
import { BusinessDetailsType } from "../../../../types/BusinessTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function BusinessDetailsPage() {
  const apiClient = useApiClient();
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetailsType | null>(null);
  const fetchBusinessDetails = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + userData?.businessId);

      setBusinessDetails(response.data.data);
      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response.data.error;
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
      setBusinessDetails(response.data.data);
      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response.data.error;
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const fetch = async () => {
      await fetchBusinessDetails();
    };
    fetch();
  }, [userData?.businessId]);

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !businessDetails ? (
        <Loading />
      ) : (
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
                setBusinessDetails={setBusinessDetails}
                businessOverview={businessDetails.overview!}
                businessName={businessDetails.name}
                businessAddress={businessDetails.address!}
                canEdit={userData?.role !== "viewer"}
                refetch={fetchBusinessDetails}
              />
              <CoreService
                businessServices={businessDetails.services}
                setBusinessDetails={setBusinessDetails}
                canEdit={userData?.role !== "viewer"}
                refetch={fetchBusinessDetails}
              />
              <BusinessHours
                hours={businessDetails.businessHours}
                setBusinessDetails={setBusinessDetails}
                canEdit={userData?.role !== "viewer"}
                refetch={fetchBusinessDetails}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
