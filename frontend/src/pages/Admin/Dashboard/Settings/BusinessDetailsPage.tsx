/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
  const [checkBusinessDetails, setCheckBusinessDetails] =
    useState<BusinessDetailsType | null>(() => {
      const stored = localStorage.getItem("businessDetails");
      try {
        return stored ? (JSON.parse(stored) as BusinessDetailsType) : null;
      } catch {
        return null;
      }
    });
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

      //Set to localStorage for future use
      if (!localStorage.getItem("businessDetails")) {
        localStorage.setItem(
          "businessDetails",
          JSON.stringify(response.data.data),
        );
        setCheckBusinessDetails(response.data.data);
      }
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
  useEffect(() => {
    localStorage.setItem("businessDetails", JSON.stringify(businessDetails));
  }, [businessDetails]);

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !BusinessDetails ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          {businessDetails && checkBusinessDetails && (
            <>
              <BusinessTitleCard
                checkBusinessDetails={checkBusinessDetails}
                businessDetails={businessDetails}
                setCheckBusinessDetails={setCheckBusinessDetails}
                title="Business Information"
                subtitle={`This business information gives ${appName} the context to handle your calls.`}
              />
              <TrainingSources businessWebsite={businessDetails.website} />
              <BusinessDetails
                setBusinessDetails={setBusinessDetails}
                businessOverview={businessDetails.overview!}
                businessName={businessDetails.name}
                businessAddress={businessDetails.address!}
              />
              <CoreService
                businessServices={businessDetails.services}
                setBusinessDetails={setBusinessDetails}
              />
              <BusinessHours
                hours={businessDetails.businessHours}
                setBusinessDetails={setBusinessDetails}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
