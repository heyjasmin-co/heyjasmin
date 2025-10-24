/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useState } from "react";
import infoIcon from "../../../../assets/image/infoIcon.png";
import { colorTheme } from "../../../../theme/colorTheme";
import { BusinessUserInvitationsType } from "../../../../types/BusinessUserInvitationsTypes";
import { capitalizeString } from "../../../../utils/string-utils";

interface TeamMemberInvitationRemoveModalProps {
  handleRemoveModel: () => void;
  memberData?: BusinessUserInvitationsType;
  handleRemoveMember: (clerkInvitationId: string) => Promise<void>;
}

function TeamMemberInvitationRemoveModal({
  handleRemoveModel,
  memberData,
  handleRemoveMember,
}: TeamMemberInvitationRemoveModalProps) {
  const [loading, setLoading] = useState(false);
  const handleRemove = async (clerkInvitationId: string) => {
  
    if (clerkInvitationId) {
      setLoading(true);
      await handleRemoveMember(clerkInvitationId);
      setLoading(false);

      handleRemoveModel();
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
            Are you sure you want to cancelled this member invitation
          </p>
        </div>

        {/* Member Info Display */}
        <div className="flex flex-col gap-3 px-4 py-4 text-sm text-gray-700">
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
            onClick={() => handleRemove(memberData?.clerKInvitationId!)}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all ${loading ? "cursor-not-allowed bg-gray-300" : "bg-red-600 hover:bg-red-700 active:scale-95"}`}
          >
            <i className="fa-solid fa-trash"></i>
            <span>{loading ? "Canceling..." : "Cancel"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberInvitationRemoveModal;
