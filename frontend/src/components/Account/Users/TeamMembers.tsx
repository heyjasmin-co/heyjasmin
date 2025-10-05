import { useState } from "react";
import infoIcon from "../../../assets/image/infoIcon.png";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";
import TeamMemberModal from "./TeamMemberModal";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
}

function TeamMembers() {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Ahsan", email: "imahsan600@gmail.com", role: "Admin" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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

  const handleSubmit = (member: { name: string; email: string; role: string }) => {
    if (editMode && selectedMember) {
      // Update existing member
      setMembers((prev) =>
        prev.map((m) => (m.id === selectedMember.id ? { ...m, ...member } : m))
      );
    } else {
      // Add new member
      const newMember: Member = {
        id: Date.now(), // simple id
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
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Role</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-3 font-medium text-gray-900">{member.name}</td>
                      <td className="px-4 py-3 text-gray-700">{member.email}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-sm font-semibold text-red-500 hover:text-red-700"
                        >
                          Edit
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
    </>
  );
}

export default TeamMembers;
