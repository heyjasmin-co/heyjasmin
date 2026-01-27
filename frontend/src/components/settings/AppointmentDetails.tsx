/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import infoIcon from "@/assets/image/infoIcon.png";
import { Textarea, TextInput, ToggleSwitch } from "flowbite-react";
import { useEffect, useState } from "react";
import editIcon from "../../assets/image/editIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import { useUserData } from "../../context/UserDataContext";
// import { useApiClient } from "../../lib/axios";
import { useUpdateAppointmentSettings } from "../../hooks/api/useBusinessMutations";
import { colorTheme } from "../../theme/colorTheme";
import { BusinessDetailsType } from "../../types/BusinessTypes";
import { errorToast, successToast } from "../../utils/react-toast";

type AppointmentDetailsProps = {
  appointmentEnabled: boolean;
  appointmentMessage: string;
  schedulingLink: string;
  canEdit: boolean;
  setBusinessDetails: React.Dispatch<
    React.SetStateAction<BusinessDetailsType | null>
  >;
};

function AppointmentDetails({
  appointmentEnabled: initialEnabled,
  appointmentMessage,
  schedulingLink,
  canEdit,
  setBusinessDetails,
}: AppointmentDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentEnabled, setAppointmentEnabled] = useState(initialEnabled);
  const [message, setMessage] = useState(appointmentMessage);
  const [link, setLink] = useState(schedulingLink);
  // const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    message: string | null;
    link: string | null;
  }>({
    message: null,
    link: null,
  });

  // const apiClient = useApiClient();
  const { mutateAsync: updateAppointment, isPending: loading } =
    useUpdateAppointmentSettings();
  const { userData } = useUserData();

  const handleSave = async () => {
    const validationErrors: any = {};

    // ✅ Required ONLY when appointment is enabled
    if (appointmentEnabled) {
      if (!message.trim()) {
        validationErrors.message = "Text message is required.";
      }
      if (!link.trim()) {
        validationErrors.link = "Scheduling link is required.";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Check if values changed
    const messageToSend = appointmentEnabled ? message : null;
    const linkToSend = appointmentEnabled ? link : null;

    if (
      appointmentEnabled === initialEnabled &&
      messageToSend === (appointmentMessage || null) &&
      linkToSend === (schedulingLink || null)
    ) {
      setIsEditing(false);
      return;
    }

    setErrors({ message: null, link: null });
    setErrors({ message: null, link: null });
    // setLoading(true);
    try {
      const response = await updateAppointment({
        businessId: userData?.businessId!,
        data: {
          appointmentEnabled,
          appointmentMessage: message,
          schedulingLink: link,
        },
      });

      setBusinessDetails((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          appointmentSettings: {
            appointmentEnabled,
            appointmentMessage: message,
            schedulingLink: link,
          },
        };
      });

      successToast(response?.message || "Appointment settings updated");
      setIsEditing(false);
    } catch (error: any) {
      errorToast(
        error?.response?.data?.error || "Failed to update appointment settings",
      );
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!appointmentEnabled) {
      setMessage("");
      setLink("");
      setErrors({ message: null, link: null });
    }
  }, [appointmentEnabled]);

  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="divide-y divide-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-link text-sm text-white" />
          </div>
          <h5 className="text-lg font-bold text-gray-900">
            Appointment Settings
          </h5>
        </div>

        {/* Info */}
        <div className="flex gap-2 px-4 py-3">
          <img src={infoIcon} alt="Info" className="h-6 w-6" />
          <p className="text-sm text-gray-700">
            Allow your agent to send a text message with your appointment
            scheduling link to callers.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-4 py-3">
          {/* Toggle */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Appointment Link:
            </span>

            {isEditing ? (
              <ToggleSwitch
                checked={appointmentEnabled}
                onChange={setAppointmentEnabled}
                label={appointmentEnabled ? "Yes" : "No"}
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {appointmentEnabled ? "Yes" : "No"}
              </span>
            )}
          </div>

          {/* Text Message */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Text Message
              {/* {appointmentEnabled && (
                <span className="ml-1 text-red-500">*</span>
              )} */}
            </span>

            <div className="flex-1">
              {isEditing ? (
                <Textarea
                  disabled={!appointmentEnabled}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              ) : (
                <span className="block text-sm text-gray-600">
                  {message?.trim() ? message : "No text message set"}
                </span>
              )}

              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message}</p>
              )}
            </div>
          </div>

          {/* Scheduling Link */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Scheduling Link
              {/* {appointmentEnabled && (
                <span className="ml-1 text-red-500">*</span>
              )} */}
            </span>

            <div className="flex-1">
              {isEditing ? (
                <TextInput
                  disabled={!appointmentEnabled}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              ) : (
                <span className="block text-sm text-gray-600">
                  {link?.trim() ? link : "No scheduling link set"}
                </span>
              )}

              {errors.link && (
                <p className="mt-1 text-xs text-red-600">{errors.link}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {canEdit && (
          <div className="flex justify-end px-4 py-3">
            {isEditing ? (
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
              >
                <img src={saveIcon} className="h-5 w-5" />
                {loading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-700"
              >
                <img src={editIcon} className="h-5 w-5" />
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentDetails;
