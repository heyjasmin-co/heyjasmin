import { useState } from "react";
import editIcon from "../../assets/image/editIcon.png";
import infoIcon from "../../assets/image/infoIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import { appName } from "../../theme/appName";
import { colorTheme } from "../../theme/colorTheme";

type BusinessInfoProps = {
  businessProfile: string;
  businessWebsite: string;
  onSave?: (profile: string, website: string, hours?: any) => void;
};

function BusinessInfo({
  businessProfile,
  businessWebsite,
  onSave,
}: BusinessInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState(businessProfile);
  const [overview, setOverview] = useState("");
  const [address, setAddress] = useState(businessWebsite);

  const [services, setServices] = useState<string[]>([
    "Bed Bug Control",
    "Rodent Control",
    "Ant Control",
    "Wasp Control",
    "Spider Control",
  ]);
  const [newService, setNewService] = useState("");

  const [businessHours, setBusinessHours] = useState([
    { day: "Monday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Tuesday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Wednesday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Thursday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Friday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Saturday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Sunday", start: "08:00", end: "20:00", isOpen: false },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) onSave(businessName, address, businessHours);
  };

  const handleAddService = () => {
    if (newService.trim() !== "") {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleToggleDay = (index: number) => {
    if (!isEditing) return;
    const updated = [...businessHours];
    updated[index].isOpen = !updated[index].isOpen;
    setBusinessHours(updated);
  };

  const handleTimeChange = (
    index: number,
    field: "start" | "end",
    value: string,
  ) => {
    const updated = [...businessHours];
    updated[index][field] = value;
    setBusinessHours(updated);
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="divide-y divide-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-briefcase text-white"></i>
          </div>
          <h5 className="text-lg font-bold text-gray-900">
            Business Information
          </h5>
        </div>

        {/* Info Text */}
        <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start">
          <img src={infoIcon} alt="Info Icon" className="h-6 w-6 shrink-0" />
          <p className="text-sm text-gray-700">{`This business information gives ${appName} the context to handle your calls. You can update or add to it anytime — this is just the starting point.`}</p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-5 px-4 py-4">
          {/* Business Name */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40">
              Business Name:
            </span>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Business Overview */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40 sm:pt-2">
              Business Overview:
            </span>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Write a short overview of your business"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Primary Address */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40">
              Primary Address:
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter business address"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Core Services */}
        <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-start sm:gap-6">
          <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40">
            Core Service:
          </span>
          <div className="flex flex-1 flex-wrap gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            {services.map((tag, index) => (
              <div
                key={index}
                className="flex max-w-full min-w-0 items-center gap-4 rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700"
              >
                <span className="break-all">{tag}</span>
                <button
                  onClick={() => handleRemoveService(index)}
                  className="text-gray-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Add service"
              className="w-40 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <button
              onClick={handleAddService}
              className="rounded-md bg-purple-600 px-3 py-1 text-sm font-medium text-white hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Business Hours Section */}
        <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-start sm:gap-6">
          <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40 sm:pt-3">
            Business Hours:
          </span>
          <div className="flex flex-1 flex-col gap-3">
            {businessHours.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all sm:flex-row sm:items-center sm:justify-between"
                style={{
                  opacity: hour.isOpen ? 1 : 0.6,
                  backgroundColor: hour.isOpen ? "#F9FAFB" : "#F3F4F6",
                }}
              >
                <div className="flex items-center gap-3">
                  {isEditing && (
                    <button
                      onClick={() => handleToggleDay(index)}
                      className="relative h-6 w-11 rounded-full transition-colors"
                      style={{
                        backgroundColor: hour.isOpen
                          ? colorTheme.secondaryColor(1)
                          : "#D1D5DB",
                      }}
                    >
                      <span
                        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform"
                        style={{
                          left: hour.isOpen ? "calc(100% - 22px)" : "2px",
                        }}
                      />
                    </button>
                  )}
                  <span className="min-w-[100px] text-sm font-semibold text-gray-800">
                    {hour.day}
                  </span>
                </div>

                {hour.isOpen ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="time"
                          value={hour.start}
                          onChange={(e) =>
                            handleTimeChange(index, "start", e.target.value)
                          }
                          className="w-full max-w-[120px] rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none sm:w-auto"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={hour.end}
                          onChange={(e) =>
                            handleTimeChange(index, "end", e.target.value)
                          }
                          className="w-full max-w-[120px] rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none sm:w-auto"
                        />
                      </>
                    ) : (
                      <span className="text-sm text-gray-700">
                        {formatTime(hour.start)} - {formatTime(hour.end)}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm font-medium text-gray-500">
                    Closed
                  </span>
                )}
              </div>
            ))}
          </div>
          {/* Save / Edit Buttons */}
          <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:justify-end sm:gap-4">
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

export default BusinessInfo;
