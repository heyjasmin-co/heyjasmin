import { useState } from "react";
import infoIcon from "../../assets/image/infoIcon.png";
import nextIcon from "../../assets/image/nextIcon.png";
import phoneIcon from "../../assets/image/phoneIcon.png";
import { appName } from "../../theme/appName";
import { colorTheme } from "../../theme/colorTheme";
import { BusinessDetailsType } from "../../types/BusinessTypes";
import { formatPhoneNumber } from "../../utils/string-utils";

type TalkToAgentProps = {
  handleLaunchAgent: () => Promise<void>;
  businessDetails: BusinessDetailsType;
};
function TalkToAgent({ handleLaunchAgent, businessDetails }: TalkToAgentProps) {
  const [loading, setLoading] = useState(false);
  const handleStep = async () => {
    setLoading(true);
    await handleLaunchAgent();
    setLoading(false);
  };
  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="divide-y divide-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <img src={phoneIcon} alt="phone Icon" className="h-6 w-6" />
          </div>
          <h5 className="text-lg font-bold text-gray-900">Call {appName}</h5>
        </div>

        {/* Info */}
        <div className="flex gap-2 px-4 py-3">
          <img src={infoIcon} alt="Info Icon" className="h-6 w-6" />
          <p className="text-sm text-gray-700">
            No need to change your existing business phone number. Forward calls
            to your {appName} number during the hours you'd like her to answer.
          </p>
        </div>

        {/* Call Instructions */}
        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Title + Subtitle */}
          <div className="flex flex-col gap-1 sm:flex-1">
            <span className="text-md font-bold text-gray-800">
              Call {appName} from your phone
            </span>
            <span className="text-sm text-gray-700">
              Forward your phone calls to this number when you want {appName} to
              answer.
            </span>
          </div>

          {/* Phone Number */}
          <div className="mt-2 flex justify-center sm:mt-0 sm:justify-start">
            <div
              className="flex items-center justify-center rounded-3xl px-4 py-2 sm:px-6 sm:py-3"
              style={{
                backgroundColor: colorTheme.secondaryColor(0.9),
              }}
            >
              <span className="text-md text-center font-bold text-white">
                {formatPhoneNumber(
                  businessDetails.aiAgentSettings.twilioNumber!,
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:justify-end">
          <button
            onClick={handleStep}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all sm:w-auto ${loading ? "cursor-not-allowed bg-purple-400" : "bg-purple-600 hover:bg-purple-700 active:scale-95"} `}
          >
            <span className="text-xl font-bold">
              {loading ? "Launching..." : "Continue"}
            </span>
            {!loading && (
              <img src={nextIcon} alt="Next Icon" className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TalkToAgent;
