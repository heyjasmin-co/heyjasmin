import { convertTo24Hour } from "@/utils/time";
import { useEffect, useState } from "react";
import { useUpdateBusinessHours } from "../../api/hooks/useBusinessQueries";
import editIcon from "../../assets/image/editIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import { useUserData } from "../../context/UserDataContext";
import { colorTheme } from "../../theme/colorTheme";
import { IBusinessHour } from "../../types/BusinessTypes";
import { errorToast, successToast } from "../../utils/react-toast";
import BusinessHoursSelector from "../shared/BusinessHoursSelector";

type BusinessHoursProps = {
  hours: IBusinessHour[];
  canEdit: boolean;
  refetch?: () => Promise<void>;
};

function BusinessHours({ hours, canEdit, refetch }: BusinessHoursProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [businessHours, setBusinessHours] = useState(
    (hours || []).map((hour) => ({
      ...hour,
      start: convertTo24Hour(hour.start) || "09:00",
      end: convertTo24Hour(hour.end) || "17:00",
    })),
  );
  const { userData } = useUserData();
  const updateHoursMutation = useUpdateBusinessHours();

  useEffect(() => {
    setBusinessHours(hours);
  }, [hours]);

  const handleSave = async () => {
    if (!userData?.businessId) return;

    try {
      const response = await updateHoursMutation.mutateAsync({
        businessId: userData.businessId,
        businessHours: businessHours,
      });

      successToast(response.message);
      setIsEditing(false);
      if (refetch) await refetch();
    } catch (error: unknown) {
      let errorMessage = "Failed to update business hours.";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response: { data: { error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error ||
          "Failed to update business hours.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      errorToast(errorMessage);
    }
  };

  const saving = updateHoursMutation.isPending;

  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="h-full w-full divide-y divide-gray-200">
        {/* Header */}
        <div className="flex flex-col px-4 py-3 sm:flex-row sm:items-center sm:space-x-3">
          <div
            className="mb-2 flex h-8 w-8 items-center justify-center rounded-full sm:mb-0"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-clock text-white"></i>
          </div>
          <h5 className="text-lg font-bold text-gray-900"> Business Hours:</h5>
        </div>

        {/* Business Hours: */}
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex flex-1 flex-col gap-3">
            <BusinessHoursSelector
              businessHours={businessHours}
              onChange={setBusinessHours}
              isEditing={isEditing}
            />
          </div>
        </div>

        {/* Actions */}
        {canEdit && (
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:justify-end sm:gap-4">
            {isEditing ? (
              <button
                disabled={saving}
                onClick={handleSave}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 sm:w-auto"
                style={{
                  cursor: saving ? "not-allowed" : "pointer",
                  backgroundColor: saving ? "grey" : "",
                }}
              >
                <img
                  src={saveIcon}
                  alt="Save Icon"
                  className="h-5 w-5 opacity-90"
                />
                <span>{saving ? "Saving..." : "Save"}</span>
              </button>
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
      </div>
    </div>
  );
}

export default BusinessHours;
