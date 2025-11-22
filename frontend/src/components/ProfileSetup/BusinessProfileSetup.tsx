/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";
import { GooglePlaceDetails } from "../../types/GooglePlaceDetails";
import { errorToast } from "../../utils/react-toast";

const VITE_GOOGLE_MAP_API = import.meta.env.VITE_GOOGLE_MAP_API;

if (!VITE_GOOGLE_MAP_API) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function BusinessProfileSetup({
  setGoogleBusinessData,
  setScrapeType,
  placeId,
}: {
  setGoogleBusinessData: Dispatch<SetStateAction<GooglePlaceDetails | null>>;
  setScrapeType: Dispatch<SetStateAction<string>>;
  placeId?: string;
}) {
  const [businessId, setBusinessId] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  // Google Places Autocomplete
  const { ref: placesRef } = usePlacesWidget({
    apiKey: VITE_GOOGLE_MAP_API,
    onPlaceSelected: (place) => {
      if (!place || !place.place_id) {
        errorToast("Please select a valid business from the suggestions.");
        return;
      }
      setBusinessId(place.place_id);
    },
    options: {
      types: ["establishment"],
      componentRestrictions: { country: "ca" },
    },
  }) as any;

  // Prefill the input if placeId exists
  useEffect(() => {
    if (!placeId) return;

    const service = new google.maps.places.PlacesService(
      document.createElement("div"),
    );
    service.getDetails(
      {
        placeId,
        fields: [
          "editorial_summary",
          "formatted_address",
          "name",
          "website",
          "current_opening_hours",
          "icon",
          "types",
        ],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          // Autofill input
          if (inputRef.current) inputRef.current.value = place.name || "";
          setBusinessId(place.place_id);
          setGoogleBusinessData(place as GooglePlaceDetails);
          navigate(location.pathname, { replace: true, state: {} });
        }
      },
    );
  }, [placeId]);

  // Fetch full place details
  const getPlaceDetails = async (
    placeId: string,
  ): Promise<GooglePlaceDetails> => {
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(
        document.createElement("div"),
      );
      service.getDetails(
        {
          placeId,
          fields: [
            "editorial_summary",
            "formatted_address",
            "name",
            "website",
            "current_opening_hours",
            "icon",
            "types",
          ],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            resolve(place as GooglePlaceDetails);
          } else {
            reject(new Error(`Failed to get place details: ${status}`));
          }
        },
      );
    });
  };

  const handleSubmitClick = async () => {
    setLoading(true);
    try {
      if (
        !businessId ||
        (inputRef.current && inputRef.current.value.trim() === "")
      ) {
        setError("Please select a valid business from the suggestions.");
        return;
      }

      setError("");
      const businessData = await getPlaceDetails(businessId);
      setGoogleBusinessData(businessData);
    } catch (error) {
      errorToast("Failed to fetch business details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-8 sm:px-8 lg:w-1/2">
      <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
        Find your Google Business Profile
      </h2>

      <div className="flex w-full max-w-md flex-col gap-6">
        {/* Google Places Autocomplete Input */}
        <div className="relative w-full">
          <input
            ref={placesRef}
            placeholder="Search your business..."
            className="w-full rounded-full border border-gray-300 px-6 py-4 pr-12 text-lg text-gray-800 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 right-5 -translate-y-1/2 text-gray-400"></i>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Continue Button */}
        <button
          onClick={handleSubmitClick}
          disabled={loading}
          className={`flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 active:scale-95 ${
            businessId && !loading
              ? "bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
              : "cursor-not-allowed bg-gray-300 text-gray-100"
          }`}
        >
          {loading ? "Continuing... " : "Continue"}
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </button>

        {/* Use Website Button */}
        <button
          type="button"
          onClick={() => setScrapeType("website")}
          className="flex items-center justify-center gap-2 text-lg font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700 active:scale-95"
        >
          Use my website instead
          <i className="fa-solid fa-arrow-right text-sm"></i>
        </button>
      </div>
    </div>
  );
}
