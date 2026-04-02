import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { colorTheme } from "../../../theme/colorTheme";
import { NotificationRecipient } from "../../../types/NotificationTypes";

interface NotificationRecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "email" | "phone";
  editData?: NotificationRecipient | null;
  onSave: (recipient: NotificationRecipient) => void;
  onDelete?: (id: string) => void;
  isSaving?: boolean;
  isDeleting?: boolean;
}

export default function NotificationRecipientModal({
  isOpen,
  onClose,
  type,
  editData,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: NotificationRecipientModalProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  // const notificationTypes: NotificationType[] = ["Message", "Appointment", "Call Transfers", "Spam"];

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setValue(editData.value);
      } else {
        setValue("");
      }
      setError(null);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const validateInput = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "This field is required";

    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed))
        return "Please enter a valid email address";
    } else {
      if (!trimmed.startsWith("+")) return 'Phone number must start with "+"';
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(trimmed))
        return "Please enter a valid phone number (e.g. +1234567890)";
    }
    return null;
  };

  const handleSave = () => {
    const validationError = validateInput(value);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSave({
      id: editData?.id || Date.now().toString(),
      value: value.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div
        className="flex w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
            >
              <i
                className={`fa-solid ${type === "email" ? "fa-envelope" : "fa-mobile-screen"} text-lg text-white`}
              ></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {editData
                ? `Edit ${type === "email" ? "Email" : "Mobile Number"}`
                : `Add ${type === "email" ? "Email" : "Mobile Number"}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving || isDeleting}
            className={`transition-colors ${isSaving || isDeleting ? "cursor-not-allowed text-gray-200" : "text-gray-400 hover:text-gray-700"}`}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 overflow-y-auto p-6">
          {/* Input */}
          <div className="flex flex-col gap-3">
            <label className="text-base font-bold text-gray-800">
              {type === "email" ? "Email Address" : "Mobile Number"}
            </label>
            <input
              type="text"
              placeholder={
                type === "email" ? "example@mail.com" : "+1 (000) 000-0000"
              }
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              disabled={isSaving || isDeleting}
              className={`w-full rounded-2xl border px-6 py-4 text-base text-gray-900 transition-all outline-none focus:ring-4 ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-100"
              } ${isSaving || isDeleting ? "cursor-not-allowed bg-gray-50 opacity-70" : "bg-white"}`}
            />
            {error && (
              <span className="flex items-center gap-1.5 px-2 text-sm font-bold text-red-500">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
          <div>
            {editData && onDelete && (
              <button
                onClick={() => {
                  onDelete(editData.id);
                }}
                disabled={isDeleting || isSaving}
                className={`flex items-center gap-2 text-sm font-bold text-red-500 transition-all ${isDeleting || isSaving ? "cursor-not-allowed opacity-50" : "hover:text-red-600 active:scale-95"}`}
              >
                {isDeleting ? (
                  <Spinner size="sm" color="failure" />
                ) : (
                  <i className="fa-solid fa-trash-can"></i>
                )}
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSaving || isDeleting}
              className="rounded-full px-6 py-3 font-bold text-gray-500 transition-all hover:bg-gray-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white shadow-xl transition-all ${isSaving || isDeleting ? "cursor-not-allowed opacity-70" : "hover:opacity-90 active:scale-95"}`}
              style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
            >
              {isSaving && <Spinner size="sm" color="gray" />}
              {isSaving
                ? "Saving..."
                : editData
                  ? "Save Changes"
                  : `Add ${type === "email" ? "Email" : "Number"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
