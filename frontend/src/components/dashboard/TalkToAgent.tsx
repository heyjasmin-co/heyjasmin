import infoIcon from "../../assets/image/infoIcon.png";
import phoneIcon from "../../assets/image/phoneIcon.png";
import { appName } from "../../theme/appName";
import { colorTheme } from "../../theme/colorTheme";

function TalkToAgent() {
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
          <div className="flex justify-center sm:justify-start mt-2 sm:mt-0">
            <div
              className="flex items-center justify-center rounded-3xl px-4 py-2 sm:px-6 sm:py-3"
              style={{
                backgroundColor: colorTheme.secondaryColor(0.9),
              }}
            >
              <span className="text-md font-bold text-white text-center">
                (252) 489-4419
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalkToAgent;
