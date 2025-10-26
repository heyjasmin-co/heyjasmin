import { useEffect, useState } from "react";
import infoIcon from "../../../../assets/image/infoIcon.png";
import { appName } from "../../../../theme/appName";
import { colorTheme } from "../../../../theme/colorTheme";
import { BusinessUserInvitationsType } from "../../../../types/BusinessUserInvitationsTypes";

interface TeamMemberInvitationModalProps {
  handleModel: () => void;
  memberData?: BusinessUserInvitationsType;
  onSubmit: (member: { email: string; role: string }) => Promise<void>;
}

function TeamMemberInvitationModal({
  handleModel,
  memberData,
  onSubmit,
}: TeamMemberInvitationModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (memberData) {
      setEmail(memberData.email);
      setRole(memberData.role);
    }
  }, [memberData]);

  const handleAddMember = async () => {
    setLoading(true);
    if (!email.trim()) {
      setError("Email are required.");
      setLoading(false);

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    await onSubmit({ email: email.trim(), role });
    setEmail("");
    setRole("Admin");
    setError("");
    setLoading(false);

    handleModel();
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
            <h5 className="text-lg font-bold text-gray-900">Add Member</h5>
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
            Add new members to the {appName} admin dashboard by entering their
            email and assigning a role.
          </p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4 px-4 py-4">
          <div className="flex flex-col gap-3">
            {/* <input
              type="text"
              placeholder="Full Name"
              value={name}
              disabled={editMode}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                editMode ? "cursor-not-allowed bg-gray-200" : "bg-white"
              }`}
            /> */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none`}
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
              onClick={handleAddMember}
              disabled={loading}
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all ${loading ? "cursor-not-allowed bg-gray-300" : "bg-purple-600 hover:bg-purple-700 active:scale-95"}`}
            >
              <i className="fa-solid fa-plus text-white"></i>
              <span>{loading ? "Adding..." : "Add Member"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberInvitationModal;
