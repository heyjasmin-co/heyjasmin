/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import sparklesIcon from "../../assets/image/sparklesIcon.png";
import { appName } from "../../theme/appName";
import { GooglePlaceDetails } from "../../types/GooglePlaceDetails";

export default function ConfirmBusinessProfileSetup({
  googleBusinessData,
  setGoogleBusinessData,
  handleGoogleProfileData,
}: {
  googleBusinessData: GooglePlaceDetails;
  setGoogleBusinessData: Dispatch<SetStateAction<GooglePlaceDetails | null>>;
  handleGoogleProfileData: () => Promise<void>;
}) {
  const handleSubmitClick = async () => {
    await handleGoogleProfileData();
  };

  const handleSearchAgain = () => {
    setGoogleBusinessData(null);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 rounded-2xl bg-white px-6 py-10 shadow-lg sm:px-10 lg:w-1/2">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
        Is this your Google Business profile?
      </h2>

      {/* Business card */}
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-4">
          {/* Business icon */}
          {googleBusinessData.icon && (
            <img
              src={googleBusinessData.icon}
              alt="Business Icon"
              className="h-12 w-12 rounded-md border border-gray-300 bg-white p-2"
            />
          )}

          {/* Business info */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800">
              {googleBusinessData.name}
            </h3>
            <p className="flex items-center gap-3 text-sm text-gray-500">
              <i className="fa-solid fa-location-dot text-purple-500"></i>
              {googleBusinessData.formatted_address}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full max-w-md flex-col gap-4">
        <button
          onClick={handleSubmitClick}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 active:scale-95"
        >
          Yes, Train {appName}
          <img src={sparklesIcon} alt="Sparkles" className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={handleSearchAgain}
          className="flex items-center justify-center gap-2 text-lg font-medium text-purple-600 transition-all duration-200 hover:text-purple-700 active:scale-95"
        >
          Search again
        </button>
      </div>
    </div>
  );
}
