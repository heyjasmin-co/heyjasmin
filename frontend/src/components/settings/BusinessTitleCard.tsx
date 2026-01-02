/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserData } from "@/context/UserDataContext";
import { isEqual } from "lodash";
import { useState } from "react";
import { BusinessDetailsType } from "../../types/BusinessTypes";

function BusinessTitleCard({
  title,
  subtitle,
  checkBusinessDetails,
  businessDetails,
  canEdit,
  handleUpdateAgent,
}: {
  title: string;
  subtitle: string;
  checkBusinessDetails: BusinessDetailsType;
  businessDetails: BusinessDetailsType;
  canEdit: boolean;
  handleUpdateAgent: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const hasChanges = !isEqual(businessDetails, checkBusinessDetails);
  const { userData } = useUserData();
  const handlePublishAgent = async () => {
    setLoading(true);
    await handleUpdateAgent();
    setLoading(false);
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
        {userData?.assistantNumber && canEdit && (
          <button
            disabled={!hasChanges || loading}
            onClick={handlePublishAgent}
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
