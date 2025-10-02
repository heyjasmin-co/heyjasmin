import { useState } from "react";
import editIcon from "../../assets/image/editIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import sparklesIcon from "../../assets/image/sparklesIcon.png";
import { colorTheme } from "../../theme/colorTheme";

function BusinessHours() {
  const [isEditing, setIsEditing] = useState(false);
  const [businessHours, setBusinessHours] = useState([
    { day: "Monday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Tuesday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Wednesday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Thursday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Friday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Saturday", start: "08:00", end: "20:00", isOpen: true },
    { day: "Sunday", start: "08:00", end: "20:00", isOpen: false },
  ]);

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
      <div className="h-full w-full divide-y divide-gray-200">
        {/* Header */}
        <div className="flex flex-col px-4 py-3 sm:flex-row sm:items-center sm:space-x-3">
          <div
            className="mb-2 flex h-8 w-8 items-center justify-center rounded-full sm:mb-0"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <img src={sparklesIcon} alt="Business Icon" className="h-6 w-6" />
          </div>
          <h5 className="text-lg font-bold text-gray-900"> Business Hours:</h5>
        </div>

        {/* Business Hours: */}
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex flex-1 flex-col gap-3">
            {businessHours.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3 transition-all sm:flex-row sm:items-center sm:justify-between"
                style={{
                  opacity: hour.isOpen ? 1 : 0.6,
                  backgroundColor: hour.isOpen ? "#F9FAFB" : "#F3F4F6",
                }}
              >
                {/* Day and Toggle */}
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

                {/* Time Display/Edit */}
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

        {/* Actions */}
        <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:justify-end sm:gap-4">
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
      </div>
    </div>
  );
}

export default BusinessHours;
