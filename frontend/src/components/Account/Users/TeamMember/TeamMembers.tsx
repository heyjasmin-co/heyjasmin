/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import infoIcon from "../../../../assets/image/infoIcon.png";
import { useUserData } from "../../../../context/UserDataContext";
import { useApiClient } from "../../../../lib/axios";
import { appName } from "../../../../theme/appName";
import { colorTheme } from "../../../../theme/colorTheme";
import {
  BusinessUsersDetailsType,
  BusinessUserType,
} from "../../../../types/BusinessUsersTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";
import { canEdit } from "../../../../utils/role-base";
import { capitalizeString } from "../../../../utils/string-utils";
import TeamMemberModal from "./TeamMemberModal";
import TeamMemberRemoveModal from "./TeamMemberRemoveModal";

interface Member {
  _id: string;
  role: string;
  status: string;
  email: string;
  name: string;
  businessName: string;
}
type BusinessUsersProps = {
  businessUsers: BusinessUsersDetailsType;
};

function TeamMembers({ businessUsers }: BusinessUsersProps) {
  const [members, setMembers] = useState(businessUsers);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { userData } = useUserData();
  const apiClient = useApiClient();

  // Handlers
  const handleModal = () => {
    setOpenModal((prev) => !prev);
    if (!openModal) {
      setEditMode(false);
      setSelectedMember(null);
    }
  };

  const handleEdit = (member: Member) => {
    if (!canEdit(member.role, userData)) {
      errorToast("You don't have permission to edit this member.");
      return;
    }
    setEditMode(true);
    setSelectedMember(member);
    setOpenModal(true);
  };

  const handleDelete = (member: Member) => {
    if (!canEdit(member.role, userData)) {
      errorToast("You don't have permission to remove this member.");
      return;
    }
    setRemoveMode(true);
    setSelectedMember(member);
  };

  const handleRemoveModel = async () => {
    setRemoveMode(false);
  };

  const handleSubmit = async (member: {
    businessUserId: string;
    role: string;
  }) => {
    try {
      const { businessUserId, role } = member;
      const response = await apiClient.patch<{
        message: string;
        success: boolean;
        data: BusinessUserType;
      }>(`/business-users/${businessUserId}`, { role });

      const updatedUser = response.data.data;
      setMembers((prevMembers) =>
        prevMembers.map((m) =>
          m._id === updatedUser._id ? { ...m, ...updatedUser } : m,
        ),
      );
      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response?.data?.error || "Something went wrong.";
      errorToast(message);
    }
  };

  const handleRemoveMember = async (businessUserId: string) => {
    try {
      const response = await apiClient.delete<{
        message: string;
        success: boolean;
        data: BusinessUserType;
      }>("/business-users/" + businessUserId);
      const user = response.data.data;

      setMembers(members.filter((member) => member._id !== user._id));
      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response?.data?.error || "Something went wrong.";
      errorToast(message);
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
            <h5 className="text-lg font-bold text-gray-900">Team Members</h5>
          </div>

          {/* Info */}
          <div className="flex gap-2 px-4 py-3">
            <img src={infoIcon} alt="Info Icon" className="h-6 w-6" />
            <p className="text-sm text-gray-700">
              Anyone added below can log in to the {appName} admin dashboard.
            </p>
          </div>

          {/* Members Table */}
          <div className="flex flex-col gap-6 px-4 py-4">
            <span className="text-lg font-bold text-gray-800">Users</span>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Name
                    </th>
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
                  {members.map((member) => (
                    <tr key={member._id}>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {member.name}
                      </td>
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

                      {/* Actions */}
                      {userData?.role !== "viewer" && (
                        <td className="flex items-center gap-3 px-4 py-3">
                          {canEdit(member.role, userData) && (
                            <>
                              {/* Edit Button */}
                              <button
                                onClick={() => handleEdit(member)}
                                className="inline-flex items-center justify-center rounded-md bg-blue-50 p-2 text-blue-600 transition-colors duration-200 hover:bg-blue-100"
                                title="Edit"
                              >
                                <i className="fa-solid fa-pen text-sm"></i>
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(member)}
                                className="inline-flex items-center justify-center rounded-md bg-red-50 p-2 text-red-600 transition-colors duration-200 hover:bg-red-100"
                                title="Delete"
                              >
                                <i className="fa-solid fa-trash text-sm"></i>
                              </button>
                            </>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <TeamMemberModal
          handleModel={handleModal}
          editMode={editMode}
          memberData={selectedMember || undefined}
          handleSubmit={handleSubmit}
        />
      )}
      {removeMode && (
        <TeamMemberRemoveModal
          handleRemoveModel={handleRemoveModel}
          memberData={selectedMember || undefined}
          handleRemoveMember={handleRemoveMember}
        />
      )}
    </>
  );
}

export default TeamMembers;
