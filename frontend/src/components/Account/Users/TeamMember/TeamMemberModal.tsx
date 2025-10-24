/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react";
import infoIcon from "../../../../assets/image/infoIcon.png";
import { appName } from "../../../../theme/appName";
import { colorTheme } from "../../../../theme/colorTheme";
import { BusinessUserType } from "../../../../types/BusinessUsersTypes";

interface TeamMemberModalProps {
  handleModel: () => void;
  editMode: boolean;
  memberData?: BusinessUserType;
  handleSubmit: (member: {
    businessUserId: string;
    role: string;
  }) => Promise<void>;
}

function TeamMemberModal({
  handleModel,
  editMode,
  memberData,
  handleSubmit,
}: TeamMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (editMode && memberData) {
      setName(memberData.name);
      setEmail(memberData.email);
      setRole(memberData.role);
    }
  }, [editMode, memberData]);

  const handleAddMember = async (businessUserId: string) => {
    try {
      setLoading(true);
      if (!name.trim() || !email.trim()) {
        setError("Name and Email are required.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      await handleSubmit({ businessUserId, role: role });
      setName("");
      setEmail("");
      setRole("Admin");
      setError("");
      handleModel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
              <i className="fa-solid fa-user-plus text-sm text-white"></i>
            </div>
            <h5 className="text-lg font-bold text-gray-900">
              {editMode ? "Edit Member" : "Add Member"}
            </h5>
          </div>
          <button
            onClick={handleModel}
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
            {editMode
              ? `Edit the member details for the ${appName} admin dashboard.`
              : `Add new members to the ${appName} admin dashboard by entering their email and assigning a role.`}
          </p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4 px-4 py-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              disabled={editMode}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                editMode ? "cursor-not-allowed bg-gray-200" : "bg-white"
              }`}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              disabled={editMode}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                editMode ? "cursor-not-allowed bg-gray-200" : "bg-white"
              }`}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value={"admin"}>Admin</option>
              <option value={"editor"}>Editor</option>
              <option value={"viewer"}>Viewer</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                handleAddMember(memberData?._id!);
              }}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all sm:w-auto ${loading ? "cursor-not-allowed bg-purple-400" : "bg-purple-600 hover:bg-purple-700 active:scale-95"}`}
            >
              <i className="fa-solid fa-plus text-white"></i>
              <span>
                {editMode
                  ? loading
                    ? "Saving..."
                    : "Save Changes"
                  : "Add Member"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberModal;
