import { colorTheme } from "../../theme/colorTheme";
import { IBusinessHour } from "../../types/BusinessTypes";
import { convertTo24Hour, formatTime } from "../../utils/time";

interface BusinessHoursSelectorProps {
  businessHours: IBusinessHour[];
  onChange: (updatedHours: IBusinessHour[]) => void;
  isEditing: boolean;
}

export default function BusinessHoursSelector({
  businessHours,
  onChange,
  isEditing,
}: BusinessHoursSelectorProps) {
  const handleToggleDay = (index: number) => {
    if (!isEditing) return;
    const updated = [...businessHours];
    updated[index].isOpen = !updated[index].isOpen;
    onChange(updated);
  };

  const handleTimeChange = (
    index: number,
    field: "start" | "end",
    value: string,
  ) => {
    const updated = [...businessHours];
    updated[index][field] = value;
    onChange(updated);
  };

  return (
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
                    value={convertTo24Hour(hour.start)}
                    onChange={(e) =>
                      handleTimeChange(index, "start", e.target.value)
                    }
                    className="w-full max-w-[120px] rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none sm:w-auto"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={convertTo24Hour(hour.end)}
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
            <span className="text-sm font-medium text-gray-500">Closed</span>
          )}
        </div>
      ))}
    </div>
  );
}
