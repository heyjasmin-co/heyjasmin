import { FloatingLabel } from "flowbite-react";
import { useState } from "react";
import cancelIcon from "../../assets/image/cancelIcon.png";
import completeIcon from "../../assets/image/completeIcon.png";
import infoIcon from "../../assets/image/infoIcon.png";
import { appName } from "../../theme/appName";
import { colorTheme } from "../../theme/colorTheme";
type TrainingSourcesProps = {
  businessWebsite: string;
};

function TrainingSources({ businessWebsite }: TrainingSourcesProps) {
  const [isEditing] = useState(false);
  const [websiteValue, setWebsiteValue] = useState(businessWebsite);

  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="h-full w-full divide-y divide-gray-200">
        {/* Header Section*/}
        <div className="flex items-center space-x-3 px-4 py-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-wand-magic-sparkles text-white"></i>
          </div>

          <h5 className="text-lg font-bold text-gray-900">Training Sources</h5>
        </div>

        {/* Info */}
        <div className="flex gap-2 px-4 py-3">
          <img src={infoIcon} alt="Training Icon" className="h-6 w-6" />

          <p className="text-sm text-gray-700">
            {appName} uses these sources to learn about your business, helping
            her answer caller questions effectively. You can update these
            sources to retrain {appName} anytime.
          </p>
        </div>

        {/* Sources & Edit */}
        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Sources */}
          <div className="flex w-full flex-col gap-4">
            {/* Google Profile
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
              <span className="sm:text-md text-md shrink-0 font-bold text-gray-800 sm:w-40">
                Google Profile:
              </span>
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <FloatingLabel
                    value={profileValue}
                    onChange={(e) => setProfileValue(e.target.value)}
                    variant="standard"
                    label="Google Profile"
                    className="w-full text-sm text-gray-800 focus:text-black focus:outline-none"
                    style={{
                      backgroundColor: colorTheme.secondaryColor(0.05),
                      color: "black",
                      padding: "6px 10px",
                      transition: "all 0.3s ease",
                    }}
                  />
                ) : profileValue ? (
                  <div className="flex items-center gap-2 break-words text-gray-600">
                    <img
                      src={completeIcon}
                      alt="Website Icon"
                      className="h-5 w-5 shrink-0"
                    />
                    <span className="text-sm font-semibold break-words">
                      {profileValue}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <img
                      src={cancelIcon}
                      alt="No Website Icon"
                      className="h-5 w-5 shrink-0 opacity-70"
                    />
                    <span className="text-sm">There is no Google Profile</span>
                  </div>
                )}
              </div>
            </div> */}

            {/* Business Website */}
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
              <span className="sm:text-md text-md shrink-0 font-bold text-gray-800 sm:w-40">
                Business Website:
              </span>
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <FloatingLabel
                    value={websiteValue}
                    onChange={(e) => setWebsiteValue(e.target.value)}
                    variant="standard"
                    label="Business Website"
                    className="w-full text-sm text-gray-800 focus:text-black focus:outline-none"
                    style={{
                      backgroundColor: colorTheme.secondaryColor(0.05),
                      color: "black",
                      padding: "6px 10px",
                      transition: "all 0.3s ease",
                    }}
                  />
                ) : websiteValue ? (
                  <div className="flex items-center gap-2 break-words text-gray-600">
                    <img
                      src={completeIcon}
                      alt="Website Icon"
                      className="h-5 w-5 shrink-0"
                    />
                    <span className="text-sm font-semibold break-words">
                      {websiteValue}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <img
                      src={cancelIcon}
                      alt="No Website Icon"
                      className="h-5 w-5 shrink-0 opacity-70"
                    />
                    <span className="text-sm">
                      There is no Business Website
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit / Save Button
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
          )} */}
        </div>
      </div>
    </div>
  );
}

export default TrainingSources;
