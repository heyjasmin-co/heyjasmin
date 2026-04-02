import { NotificationRecipient } from "../../../types/NotificationTypes";

interface NotificationRecipientItemsProps {
  recipients: NotificationRecipient[];
  type: "email" | "text";
  onEdit: (recipient: NotificationRecipient) => void;
  onDelete: (id: string) => void;
  isDisabled: boolean;
}

export default function NotificationRecipientItems({
  recipients,
  onEdit,
  onDelete,
  isDisabled,
}: NotificationRecipientItemsProps) {
  if (recipients.length === 0) return null;

  return (
    <>
      {recipients.map((recipient) => (
        <div
          key={recipient.id}
          className="mt-2 flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-base font-bold text-gray-800">
                {recipient.value}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(recipient)}
                disabled={isDisabled}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-purple-200 bg-purple-50 text-purple-600 transition-all active:scale-95 ${
                  isDisabled && "cursor-not-allowed opacity-50"
                }`}
              >
                <i className="fa-solid fa-pencil text-sm"></i>
              </button>
              <button
                onClick={() => onDelete(recipient.id)}
                disabled={isDisabled}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all active:scale-95 ${
                  isDisabled && "cursor-not-allowed opacity-50"
                }`}
              >
                <i className="fa-solid fa-trash text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
