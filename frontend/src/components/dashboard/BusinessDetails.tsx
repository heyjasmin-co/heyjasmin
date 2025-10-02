import { Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import editIcon from "../../assets/image/editIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import businessIcon from "../../assets/image/businessIcon.png";
import { colorTheme } from "../../theme/colorTheme";

type BusinessDetailsProps = {
  businessProfile: string;
  businessWebsite: string;
  onSave?: (profile: string, website: string) => void;
};

function BusinessDetails({
  businessProfile,
  businessWebsite,
  onSave,
}: BusinessDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState(businessProfile);
  const [overview, setOverview] = useState("");
  const [address, setAddress] = useState(businessWebsite);

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(businessName, address);
    }
  };

  return (
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
            <img src={businessIcon} alt="Business Icon" className="h-6 w-6" />
          </div>
          <h5 className="text-lg font-bold text-gray-900">
            Business Information
          </h5>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4 px-4 py-3">
          {/* Business Name */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Business Name:
            </span>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <TextInput
                  value={businessName}
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name"
                  className="w-full rounded-lg text-sm text-gray-800 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <span className="block text-sm font-medium break-words whitespace-normal text-gray-600">
                  {businessName || "No Business Name"}
                </span>
              )}
            </div>
          </div>

          {/* Business Overview */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Business Overview:
            </span>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <Textarea
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Write a short overview of your business"
                  rows={3}
                  style={{ backgroundColor: "white", color: "black" }}
                  className="w-full resize-y rounded-lg text-sm text-gray-800 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <span className="block text-sm font-medium break-words whitespace-normal text-gray-600">
                  {overview || "No Overview Provided"}
                </span>
              )}
            </div>
          </div>

          {/* Business Address */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Primary Address:
            </span>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <TextInput
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter business address"
                  style={{ backgroundColor: "white", color: "black" }}
                  className="w-full rounded-lg text-sm text-gray-800 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <span className="block text-sm font-medium break-words whitespace-normal text-gray-600">
                  {address || "No Address Provided"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 px-4 py-2 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex w-full flex-col justify-end sm:flex-row sm:justify-end">
            {isEditing ? (
              <div
                onClick={handleSave}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 sm:w-auto"
              >
                <img
                  src={saveIcon}
                  alt="Save Icon"
                  className="h-5 w-5 opacity-90"
                />
                <span>Save</span>
              </div>
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 sm:w-auto"
              >
                <img src={editIcon} alt="Edit Icon" className="h-5 w-5" />
                <span>Edit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetails;
