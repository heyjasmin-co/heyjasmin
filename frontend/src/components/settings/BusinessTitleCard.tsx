/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from "lodash";
import { useState } from "react";
import { BusinessDetailsType } from "../../types/BusinessTypes";
import { errorToast, successToast } from "../../utils/react-toast";

function BusinessTitleCard({
  title,
  subtitle,
  checkBusinessDetails,
  businessDetails,
  canEdit,
  setCheckBusinessDetails,
}: {
  title: string;
  subtitle: string;
  checkBusinessDetails: BusinessDetailsType;
  businessDetails: BusinessDetailsType;
  canEdit: boolean;
  setCheckBusinessDetails: React.Dispatch<
    React.SetStateAction<BusinessDetailsType | null>
  >;
}) {
  const [loading, setLoading] = useState(false);
  const hasChanges = !isEqual(businessDetails, checkBusinessDetails);

  const handleUpdateAgent = async () => {
    try {
      setLoading(true);
      localStorage.clear();
      setCheckBusinessDetails(businessDetails);
      successToast("Agent Update Successfully");
    } catch (error: any) {
      errorToast(
        error?.response?.data?.error || "Failed to update business hours.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6 sm:py-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Subtitle */}
        <div className="flex flex-col">
          <span
            className="text-lg font-semibold text-gray-800 sm:text-xl"
            style={{ fontFamily: "'robot', sans-serif" }}
          >
            {title}
          </span>
          <span className="text-sm text-gray-500 sm:text-base">{subtitle}</span>
        </div>

        {/* Button */}
        {canEdit && (
          <button
            disabled={!hasChanges || loading}
            onClick={handleUpdateAgent}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 sm:w-auto"
            style={{
              backgroundColor: !hasChanges || loading ? "grey" : "",
              cursor: !hasChanges || loading ? "not-allowed" : "pointer",
            }}
          >
            <span
              className="text-base font-bold sm:text-lg"
              style={{
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <span>{loading ? "Publishing..." : "Publish"}</span>
            </span>
            <i className="fa-solid fa-caret-right text-lg text-white sm:text-xl"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default BusinessTitleCard;
