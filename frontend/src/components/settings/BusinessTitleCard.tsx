/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserData } from "@/context/UserDataContext";
import { colorTheme } from "@/theme/colorTheme";
import { BusinessDetailsType } from "../../types/BusinessTypes";

function BusinessTitleCard({
  title,
  subtitle,
  checkBusinessDetails: _checkBusinessDetails,
  businessDetails,
  canEdit,
  handleUpdateAgent,
  isLoading,
}: {
  title: string;
  subtitle: string;
  checkBusinessDetails?: BusinessDetailsType;
  businessDetails: BusinessDetailsType;
  canEdit: boolean;
  handleUpdateAgent: () => Promise<void>;
  isLoading: boolean;
}) {
  const hasChanges = businessDetails.hasPendingChanges;
  const { userData } = useUserData();
  const handlePublishAgent = async () => {
    await handleUpdateAgent();
  };
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6 sm:py-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Subtitle */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-semibold text-gray-800 sm:text-xl"
              style={{ fontFamily: "'robot', sans-serif" }}
            >
              {title}
            </span>
          </div>
          <span className="text-sm text-gray-500 sm:text-base">{subtitle}</span>
        </div>

        {/* Button */}
        {userData?.assistantNumber && canEdit && (
          <button
            disabled={!hasChanges || isLoading}
            onClick={handlePublishAgent}
            style={{
              backgroundColor:
                !isLoading && hasChanges ? colorTheme.secondaryColor(0.8) : "",
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-600 active:scale-95 disabled:bg-gray-400 sm:w-auto ${isLoading ? "bg-gray-400" : "bg-orange-600"} `}
          >
            <span
              className="text-base font-bold sm:text-lg"
              style={{
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <span>{isLoading ? "Publishing..." : "Publish"}</span>
            </span>
            <i className="fa-solid fa-paper-plane text-base text-white"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default BusinessTitleCard;
