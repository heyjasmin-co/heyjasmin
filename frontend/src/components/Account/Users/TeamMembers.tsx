import { useState } from "react";
import infoIcon from "../../../assets/image/infoIcon.png";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";
import { BusinessUsersDetailsType } from "../../../types/BusinessUsersTypes";
import { capitalizeString } from "../../../utils/string-utils";
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

  // Handlers
  const handleModal = () => {
    setOpenModal((prev) => !prev);
    if (!openModal) {
      // Reset when opening modal for add
      setEditMode(false);
      setSelectedMember(null);
    }
  };

  const handleEdit = (member: Member) => {
    setEditMode(true);
    setSelectedMember(member);
    setOpenModal(true);
  };
  const handleDelete = (member: Member) => {
    setRemoveMode(true);
    setSelectedMember(member);
  };
  const handleRemoveModel = () => {
    setRemoveMode(false);
  };
  const handleSubmit = (member: {
    name: string;
    email: string;
    role: string;
  }) => {
    if (editMode && selectedMember) {
      // Update existing member
      setMembers((prev) =>
        prev.map((m) =>
          m._id === selectedMember._id ? { ...m, ...member } : m,
        ),
      );
    } else {
      // Add new member
      const newMember: Member = member;
      setMembers((prev) => [...prev, newMember]);
    }
  };
  const handleRemoveMember = (member: {
    name: string;
    email: string;
    role: string;
  }) => {
    if (editMode && selectedMember) {
      // Update existing member
      setMembers((prev) =>
        prev.map((m) =>
          m._id === selectedMember._id ? { ...m, ...member } : m,
        ),
      );
    } else {
      // Add new member
      const newMember: Member = {
        _id: Date.now() + "",
        ...member,
      };
      setMembers((prev) => [...prev, newMember]);
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

          {/* Actions + Members Table */}
          <div className="flex flex-col gap-6 px-4 py-4">
            {/* Add User */}
            <div className="flex flex-row items-center justify-between gap-3">
              <span className="text-lg font-bold text-gray-800">Users</span>
              <div className="flex w-full justify-end sm:w-auto">
                <button
                  onClick={handleModal}
                  className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
                >
                  <i className="fa-solid fa-plus text-white"></i>
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Team Member Table */}
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
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Actions
                    </th>
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
                      <td className="flex items-center gap-3 px-4 py-3">
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
                      </td>
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
          onSubmit={handleSubmit}
        />
      )}
      {removeMode && (
        <TeamMemberRemoveModal
          handleRemoveModel={handleRemoveModel}
          memberData={selectedMember || undefined}
          onRemove={handleRemoveMember}
        />
      )}
    </>
  );
}

export default TeamMembers;
