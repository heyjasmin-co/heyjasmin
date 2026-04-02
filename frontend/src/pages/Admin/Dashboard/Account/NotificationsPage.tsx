import NotificationRecipientItems from "@/components/Account/Notifications/NotificationRecipientItems";
import Loading from "@/components/Loading";
import InfoCard from "@/components/shared/InfoCard";
import { ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import {
  useCreateNotificationRecipient,
  useDeleteNotificationRecipient,
  useNotificationSettings,
  useUpdateEmailToggle,
  useUpdateNotificationRecipient,
  useUpdateTextToggle,
} from "../../../../api/hooks/useNotificationQueries";
import NotificationRecipientModal from "../../../../components/Account/Notifications/NotificationRecipientModal";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { colorTheme } from "../../../../theme/colorTheme";
import { NotificationRecipient } from "../../../../types/NotificationTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function NotificationsPage() {
  const { userData } = useUserData();
  const businessId = userData?.businessId;

  const { data: settingsResponse, isLoading } =
    useNotificationSettings(businessId);
  const settings = settingsResponse?.data;

  const { mutateAsync: updateEmailToggle, isPending: isUpdatingEmailToggle } =
    useUpdateEmailToggle();
  const { mutateAsync: updateTextToggle, isPending: isUpdatingTextToggle } =
    useUpdateTextToggle();
  const { mutateAsync: createRecipient, isPending: isCreatingRecipient } =
    useCreateNotificationRecipient();
  const { mutateAsync: updateRecipient, isPending: isUpdatingRecipient } =
    useUpdateNotificationRecipient();
  const { mutateAsync: deleteRecipient, isPending: isDeletingRecipient } =
    useDeleteNotificationRecipient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"email" | "phone">("email");
  const [editingRecipient, setEditingRecipient] =
    useState<NotificationRecipient | null>(null);

  const openModal = (
    type: "email" | "phone",
    recipient: NotificationRecipient | null = null,
  ) => {
    setModalType(type);
    setEditingRecipient(recipient);
    setIsModalOpen(true);
  };

  const handleSaveRecipient = async (recipient: NotificationRecipient) => {
    if (!businessId) return;
    const type = modalType === "email" ? "email" : "text";

    try {
      if (editingRecipient) {
        await updateRecipient({
          businessId,
          type,
          recipientId: recipient.id,
          data: {
            value: recipient.value,
          },
        });
        successToast(
          `${type.charAt(0).toUpperCase() + type.slice(1)} recipient updated successfully`,
        );
      } else {
        await createRecipient({
          businessId,
          type,
          data: {
            id: recipient.id,
            value: recipient.value,
          },
        });
        successToast(
          `${type.charAt(0).toUpperCase() + type.slice(1)} recipient added successfully`,
        );
      }
      setIsModalOpen(false);
    } catch {
      errorToast(
        `Failed to save ${type.charAt(0).toUpperCase() + type.slice(1)} recipient`,
      );
    }
  };

  const handleDeleteRecipient = async (
    id: string,
    recipientType?: "email" | "text",
  ) => {
    if (!businessId) return;
    const type = recipientType || (modalType === "email" ? "email" : "text");
    try {
      await deleteRecipient({ businessId, type, recipientId: id });
      successToast(
        `${type.charAt(0).toUpperCase() + type.slice(1)} recipient deleted successfully`,
      );
      setIsModalOpen(false);
    } catch {
      errorToast(
        `Failed to delete ${type.charAt(0).toUpperCase() + type.slice(1)} recipient`,
      );
    }
  };

  const isAnyActionPending =
    isUpdatingEmailToggle ||
    isUpdatingTextToggle ||
    isCreatingRecipient ||
    isUpdatingRecipient ||
    isDeletingRecipient;

  const handleToggleEmail = async () => {
    if (!businessId || !settings) return;
    try {
      await updateEmailToggle({
        businessId,
        enabled: !settings.emailNotificationsEnabled,
      });
    } catch {
      errorToast(`Failed to update email settings`);
    }
  };

  const handleToggleText = async () => {
    if (!businessId || !settings) return;
    try {
      await updateTextToggle({
        businessId,
        enabled: !settings.textNotificationsEnabled,
      });
    } catch {
      errorToast(`Failed to update text settings`);
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="flex flex-col gap-6">
        <TitleCard
          title="Call Notifications"
          subtitle="Configure how and where you want to receive notifications for your calls."
          hasButton={false}
        />

        <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* Header Section */}
          <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
            >
              <i className="fa-solid fa-bell text-white"></i>
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              Call Notifications
            </h2>
          </div>

          {/* Info */}
          <InfoCard
            className="flex gap-2 border-b border-gray-200 px-4 py-3"
            message={`Which type of calls would you like to receive notifications for?`}
          />
          <div className="flex flex-col pb-6">
            {/* Email Notifications Section */}
            <div className="flex flex-col gap-6 border-b border-gray-200 px-6 pt-6 pb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">
                  Email Notifications
                </h3>
                <ToggleSwitch
                  checked={settings.emailNotificationsEnabled}
                  onChange={handleToggleEmail}
                  color="purple"
                  disabled={isAnyActionPending}
                />
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-gray-700">
                    Email Address
                  </h4>
                  {settings.emailRecipients.length < 4 && (
                    <button
                      onClick={() => openModal("email")}
                      disabled={isAnyActionPending}
                      className={`flex items-center gap-2 rounded-lg px-5 py-2 font-bold text-white shadow-md transition-all ${isAnyActionPending ? "cursor-not-allowed opacity-70" : "hover:opacity-90 active:scale-95"}`}
                      style={{
                        backgroundColor: colorTheme.secondaryColor(0.9),
                      }}
                    >
                      <i className="fa-solid fa-plus font-bold"></i>
                      <span>Add</span>
                    </button>
                  )}
                </div>

                <NotificationRecipientItems
                  recipients={settings.emailRecipients}
                  type="email"
                  onEdit={(recipient) => openModal("email", recipient)}
                  onDelete={(id) => handleDeleteRecipient(id, "email")}
                  isDisabled={isAnyActionPending}
                />
              </div>
            </div>

            {/* Text Notifications Section */}
            <div className="flex flex-col gap-6 px-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">
                  Text Notifications
                </h3>
                <ToggleSwitch
                  checked={settings.textNotificationsEnabled}
                  onChange={handleToggleText}
                  color="purple"
                  disabled={isAnyActionPending}
                />
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-gray-700">
                    Mobile Number
                  </h4>
                  {settings.textRecipients.length < 2 && (
                    <button
                      onClick={() => openModal("phone")}
                      disabled={isAnyActionPending}
                      className={`flex items-center gap-2 rounded-lg px-5 py-2 font-bold text-white shadow-md transition-all ${isAnyActionPending ? "cursor-not-allowed opacity-70" : "hover:opacity-90 active:scale-95"}`}
                      style={{
                        backgroundColor: colorTheme.secondaryColor(0.9),
                      }}
                    >
                      <i className="fa-solid fa-plus font-bold"></i>
                      <span>Add</span>
                    </button>
                  )}
                </div>
                <NotificationRecipientItems
                  recipients={settings.textRecipients}
                  type="text"
                  onEdit={(recipient) => openModal("phone", recipient)}
                  onDelete={(id) => handleDeleteRecipient(id, "text")}
                  isDisabled={isAnyActionPending}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationRecipientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        editData={editingRecipient}
        onSave={handleSaveRecipient}
        onDelete={handleDeleteRecipient}
        isSaving={isCreatingRecipient || isUpdatingRecipient}
        isDeleting={isDeletingRecipient}
      />
    </div>
  );
}
