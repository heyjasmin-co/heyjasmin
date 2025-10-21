/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import infoIcon from "../../../../assets/image/infoIcon.png";
import { colorTheme } from "../../../../theme/colorTheme";
import { BusinessUsersDetailsType } from "../../../../types/BusinessUsersTypes";
import { capitalizeString } from "../../../../utils/string-utils";

interface TeamMemberRemoveModalProps {
  handleRemoveModel: () => void;
  memberData?: BusinessUsersDetailsType[0];
  onRemove: (member: BusinessUsersDetailsType[0]) => void;
}

function TeamMemberRemoveModal({
  handleRemoveModel,
  memberData,
  onRemove,
}: TeamMemberRemoveModalProps) {
  const handleRemove = () => {
    if (memberData) {
      onRemove(memberData);
      handleRemoveModel(); // Close modal
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-lg"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
            >
              <i className="fa-solid fa-user-minus text-sm text-white"></i>
            </div>
            <h5 className="text-lg font-bold text-gray-900">Remove Member</h5>
          </div>
          <button
            onClick={handleRemoveModel}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center">
          <img
            src={infoIcon}
            alt="Info Icon"
            className="h-6 w-6 flex-shrink-0"
          />
          <p className="text-sm text-gray-700">
            Are you sure you want to remove this member from the{" "}
            <span className="font-xl font-bold text-red-700">
              {memberData?.businessName}
            </span>{" "}
            team?
          </p>
        </div>

        {/* Member Info Display */}
        <div className="flex flex-col gap-3 px-4 py-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {memberData?.name || "Unknown"}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {memberData?.email || "Unknown"}
          </div>
          <div>
            <span className="font-semibold">Role:</span>{" "}
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
              {capitalizeString(memberData?.role!)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-4 py-3">
          <button
            onClick={handleRemoveModel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
          >
            <i className="fa-solid fa-trash"></i>
            <span>Remove Member</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberRemoveModal;
