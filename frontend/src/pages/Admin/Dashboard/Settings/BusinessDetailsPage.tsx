/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import loadingGif from "../../../../assets/image/loadingGif.gif";
import TrainingSources from "../../../../components/dashboard/TrainingSources";
import BusinessDetails from "../../../../components/settings/BusinessDetails";
import BusinessHours from "../../../../components/settings/BusinessHours";
import CoreService from "../../../../components/settings/CoreService";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { useApiClient } from "../../../../lib/axios";
import { appName } from "../../../../theme/appName";
import { errorToast, successToast } from "../../../../utils/react-toast";
import { BusinessDetailsType } from "../GuidedStep/types";

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
  // UseEffect
  useEffect(() => {
    fetchBusinessDetails();
  }, []);
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !BusinessDetails ? (
        <div className="w-hull bg-blue flex h-full items-center justify-center">
          <img src={loadingGif} />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <TitleCard
            title="Business Information"
            subtitle={`This business information gives ${appName} the context to handle your calls.`}
          />
          {businessDetails && (
            <>
              <TrainingSources businessWebsite={businessDetails.website} />
              <BusinessDetails
                setBusinessDetails={setBusinessDetails}
                businessOverview={businessDetails.overview!}
                businessName={businessDetails.name}
                businessAddress={businessDetails.address!}
              />
              <CoreService businessServices={businessDetails.services} />
              <BusinessHours hours={businessDetails.businessHours} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
