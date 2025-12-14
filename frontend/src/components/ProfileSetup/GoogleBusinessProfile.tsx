/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useState } from "react";
import completeIcon from "../../assets/image/completeIcon.png";
import websiteIcon from "../../assets/image/websiteIcon.png";
import { useScrapeApiClient } from "../../lib/axios";
import { appName } from "../../theme/appName";
import { BusinessCreationType } from "../../types/BusinessTypes";
import { GooglePlaceDetails } from "../../types/GooglePlaceDetails";
import { errorToast, successToast } from "../../utils/react-toast";
import BusinessProfileSetup from "./BusinessProfileSetup";
import ConfirmBusinessProfileSetup from "./ConfirmBusinessProfileSetup";
import LeftInfoPanel from "./LeftInfoPanel";
// Import your Publishable Key
const VITE_GOOGLE_MAP_API = import.meta.env.VITE_GOOGLE_MAP_API;

if (!VITE_GOOGLE_MAP_API) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
export default function GoogleBusinessProfileSetup({
  currentStep,
  totalSteps,
  placeId,
  setCurrentStep,
  setScrapeType,
  setLoading,
  setBusinessDetails,
}: {
  currentStep: number;
  totalSteps: number;
  placeId?: string;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setScrapeType: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setBusinessDetails: Dispatch<SetStateAction<BusinessCreationType | null>>;
}) {
  const [googleBusinessData, setGoogleBusinessData] =
    useState<GooglePlaceDetails | null>(null);
  console.log("googleBusinessData", googleBusinessData);
  const scrapeApiClient = useScrapeApiClient();
  const handleGoogleProfileData = async () => {
    setLoading(true);
    if (!googleBusinessData) {
      errorToast("");
      return;
    }

    try {
      setCurrentStep(3);
      const formatData = {
        address: googleBusinessData.formatted_address,
        name: googleBusinessData.name,
        website: googleBusinessData.website,
        overview: googleBusinessData.editorial_summary?.overview,
        service: googleBusinessData.types,
        business_hours: googleBusinessData.current_opening_hours?.weekday_text,
      };

      const response = await scrapeApiClient.post<{
        message: string;
        success: boolean;
        data: BusinessCreationType;
      }>(`/businesses`, formatData);
      successToast(response.data.message);
      setBusinessDetails(response.data.data);
      setCurrentStep(4);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: any) {
      const message = _error.response.data.message;
      errorToast(message);
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-2xl lg:h-full lg:flex-row">
      {/* Left info section */}
      <LeftInfoPanel
        currentStep={googleBusinessData ? 2 : currentStep}
        totalSteps={totalSteps}
        heading={
          <>
            Train {appName} with your{" "}
            <span className="text-purple-200"> Google Business Profile</span>
          </>
        }
        listItems={[
          {
            icon: "fa-solid fa-magnifying-glass",
            text: "Find your profile by entering your business name.",
          },
          {
            iconImage: websiteIcon,
            icon: "fa-solid fa-robot",
            text: `${appName} will be trained on your Google profile.`,
          },
          {
            icon: "fa-solid fa-clock",
            text: "Takes less than a minute!",
          },
        ]}
        trialText={
          <div className="flex gap-2">
            <img
              src={completeIcon}
              alt="Website Icon"
              className="h-5 w-5 shrink-0"
            />{" "}
            <span>
              Start risk-free:{" "}
              <span className="font-semibold">7-day trial</span> with all
              features
            </span>
          </div>
        }
      />
      {!googleBusinessData && (
        <BusinessProfileSetup
          setScrapeType={setScrapeType}
          setGoogleBusinessData={setGoogleBusinessData}
          placeId={placeId}
        />
      )}
      {googleBusinessData && (
        <ConfirmBusinessProfileSetup
          googleBusinessData={googleBusinessData}
          handleGoogleProfileData={handleGoogleProfileData}
          setGoogleBusinessData={setGoogleBusinessData}
        />
      )}
    </div>
  );
}
