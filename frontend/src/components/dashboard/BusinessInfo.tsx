/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import editIcon from "../../assets/image/editIcon.png";
import infoIcon from "../../assets/image/infoIcon.png";
import nextIcon from "../../assets/image/nextIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import { useUserData } from "../../context/UserDataContext";
import { useApiClient } from "../../lib/axios";
import { appName } from "../../theme/appName";
import { colorTheme } from "../../theme/colorTheme";
import { BusinessDetailsType } from "../../types/BusinessTypes";
import { errorToast, successToast } from "../../utils/react-toast";
import { convertTo24Hour, formatTime } from "../../utils/time";

type BusinessInfoProps = {
  businessDetails: BusinessDetailsType;
  canEdit: boolean;
  setBusinessDetails: React.Dispatch<
    React.SetStateAction<BusinessDetailsType | null>
  >;
};

function BusinessInfo({
  businessDetails,
  canEdit,
  setBusinessDetails,
}: BusinessInfoProps) {
  //States
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>(businessDetails.name ?? "");
  const [overview, setOverview] = useState<string>(
    businessDetails.overview ?? "",
  );
  const [address, setAddress] = useState<string>(businessDetails.address ?? "");

  const [services, setServices] = useState<string[]>(businessDetails.services);
  const [newService, setNewService] = useState("");
  const [errors, setErrors] = useState<{
    businessName: string | null;
    overview: string | null;
    address: string | null;
  }>({
    businessName: null,
    overview: null,
    address: null,
  });

  const [businessHours, setBusinessHours] = useState(
    businessDetails.businessHours.map((hour) => ({
      ...hour,
      start:
        hour.start.includes("AM") || hour.start.includes("PM")
          ? convertTo24Hour(hour.start)
          : hour.start,
      end:
        hour.end.includes("AM") || hour.end.includes("PM")
          ? convertTo24Hour(hour.end)
          : hour.end,
    })),
  );
  const [loading, setLoading] = useState(false);
  // Hooks
  const apiClient = useApiClient();
  const { userData } = useUserData();

  // Handles
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

  const handleTalkToAgent = async () => {
    try {
      setLoading(true);
      const errors: any = {};
      if (name.trim() === "") {
        errors.businessName = "Business name is required.";
      }
      if (overview.trim() === "") {
        errors.overview = "Business description is required.";
      }
      if (address.trim() === "") {
        errors.address = "Business address is required.";
      }
      if (Object.keys(errors).length) {
        setErrors(errors);
        return;
      } else {
        setErrors({
          businessName: null,
          overview: null,
          address: null,
        });
      }
      const updateData = {
        name,
        overview,
        address,
        services,
        businessHours,
      };
      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: BusinessDetailsType;
      }>("/businesses/" + userData?.businessId, updateData);
      setBusinessDetails(response.data.data);
      successToast(response.data.message);
    } catch (error: any) {
      console.error(error);
      errorToast(error.response.data.error);
    } finally {
      setLoading(false);
    }
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
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
            <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40 sm:pt-2">
              Business Name:
            </span>
            <div className="w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your business name"
                className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none ${
                  errors.businessName ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.businessName && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.businessName}
                </p>
              )}
            </div>
          </div>

          {/* Business Overview */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
            <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40 sm:pt-2">
              Business Overview:
            </span>
            <div className="w-full">
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Write a short overview of your business"
                rows={6}
                className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none ${
                  errors.overview ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.overview && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.overview}
                </p>
              )}
            </div>
          </div>

          {/* Primary Address */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
            <span className="text-md flex-shrink-0 font-bold text-gray-800 sm:w-40 sm:pt-2">
              Primary Address:
            </span>
            <div className="w-full">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter business address"
                className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none ${
                  errors.address ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.address}
                </p>
              )}
            </div>
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
                {canEdit && (
                  <button
                    onClick={() => handleRemoveService(index)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {canEdit && (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Business Hours */}
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
        </div>

        {/* Save / Edit Buttons */}
        {canEdit && (
          <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:justify-end sm:gap-4">
            {isEditing ? (
              <div
                onClick={() => setIsEditing(false)}
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
        )}

        {/* Talk to Agent Button */}
        {canEdit && (
          <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:justify-end">
            <button
              disabled={loading}
              onClick={handleTalkToAgent}
              className={`flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 sm:w-auto ${
                loading && "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
            >
              <span className="text-xl font-bold">{`Talk to ${appName}`}</span>
              <img src={nextIcon} alt="Next Icon" className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessInfo;
