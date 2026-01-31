/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import infoIcon from "../../../../assets/image/infoIcon.png";
import { useUserData } from "../../../../context/UserDataContext";
import {
  useCreateInvitation,
  useRevokeInvitation,
} from "../../../../hooks/useUser";
import { appName } from "../../../../theme/appName";
import { colorTheme } from "../../../../theme/colorTheme";
import { BusinessUserInvitationsType } from "../../../../types/BusinessUserInvitationsTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";
import { capitalizeString } from "../../../../utils/string-utils";
import TeamMemberInvitationModal from "./TeamMemberInvitationModal";
import TeamMemberInvitationRemoveModal from "./TeamMemberInvitationRemoveModal";

interface Member {
  _id: string;
  businessId: string;
  invitationToken: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "pending" | "active" | "removed";
  createdAt: Date;
  updatedAt: Date;
}
type BusinessUserInvitationsProps = {
  businessUserInvitations: BusinessUserInvitationsType[];
};

function TeamMembersInvitation({
  businessUserInvitations,
}: BusinessUserInvitationsProps) {
  const [openModal, setOpenModal] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { userData } = useUserData();
  const createInvitation = useCreateInvitation();
  const revokeInvitation = useRevokeInvitation();

  // Handlers
  const handleModal = () => {
    setOpenModal((prev) => !prev);
    if (!openModal) {
      setSelectedMember(null);
    }
  };

  const handleDelete = (member: BusinessUserInvitationsType) => {
    setRemoveMode(true);
    setSelectedMember(member as any);
  };

  const handleRemoveModel = () => {
    setRemoveMode(false);
  };

  const handleRemoveMember = async (invitationToken: string) => {
    try {
      const response = await revokeInvitation.mutateAsync({
        invitationToken,
        businessId: userData?.businessId || "",
      });
      successToast(response.message);
      setRemoveMode(false);
    } catch (error: any) {
      errorToast(
        error?.response?.data?.error || "Failed to cancel invitation.",
      );
    }
  };

  const handleAddMember = async (member: { email: string; role: string }) => {
    try {
      const response = await createInvitation.mutateAsync({
        businessId: userData?.businessId || "",
        ...member,
      });
      successToast(response.message);
      handleModal();
    } catch (error: any) {
      errorToast(error?.response?.data?.error || "Failed to send invitation.");
    }
  };

  return (
    <>
      <div
        className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="h-full w-full divide-y divide-gray-200">
          {/* Header */}
          <div className="flex items-center space-x-3 px-4 py-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
            >
              <i className="fa-solid fa-users text-white"></i>
            </div>
            <h5 className="text-lg font-bold text-gray-900">
              Team Member Invitations
            </h5>
          </div>

          {/* Info */}
          <div className="flex gap-2 px-4 py-3">
            <img src={infoIcon} alt="Info Icon" className="h-6 w-6" />
            <p className="text-sm text-gray-700">
              People listed below have been invited to join the {appName} admin
              dashboard.
            </p>
          </div>

          {/* Actions + Members Table */}
          <div className="flex flex-col gap-6 px-4 py-4">
            {/* Add User */}
            <div className="flex flex-row items-center justify-between gap-3">
              <span className="text-lg font-bold text-gray-800">
                Invitations
              </span>
              {userData?.role !== "viewer" && (
                <div className="flex w-full justify-end sm:w-auto">
                  <button
                    onClick={handleModal}
                    className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
                  >
                    <i className="fa-solid fa-plus text-white"></i>
                    <span>Add</span>
                  </button>
                </div>
              )}
            </div>

            {/* Team Member Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Status
                    </th>
                    {userData?.role !== "viewer" && (
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {businessUserInvitations.length > 0 ? (
                    businessUserInvitations.map((member) => (
                      <tr
                        key={member._id}
                        className="transition-colors duration-150 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-gray-700">
                          {member.email}
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                            {capitalizeString(member.role)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                            {capitalizeString(member.status)}
                          </span>
                        </td>
                        {userData?.role !== "viewer" && (
                          <td className="flex items-center gap-3 px-4 py-3">
                            <button
                              onClick={() => handleDelete(member)}
                              className="inline-flex items-center justify-center rounded-md bg-red-50 p-2 text-red-600 transition-colors duration-200 hover:bg-red-100"
                              title="Delete"
                            >
                              <i className="fa-solid fa-trash text-sm"></i>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-sm font-medium text-gray-500"
                      >
                        There are no invitations yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <TeamMemberInvitationModal
          handleModel={handleModal}
          memberData={selectedMember || undefined}
          onSubmit={handleAddMember}
        />
      )}
      {removeMode && (
        <TeamMemberInvitationRemoveModal
          handleRemoveModel={handleRemoveModel}
          memberData={selectedMember || undefined}
          handleRemoveMember={handleRemoveMember}
        />
      )}
    </>
  );
}

export default TeamMembersInvitation;
