import { useState } from "react";
import editIcon from "../../assets/image/editIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import { colorTheme } from "../../theme/colorTheme";
type BusinessServiceProps = {
  businessServices: string[];
};
function CoreService({ businessServices }: BusinessServiceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState<string[]>(businessServices);

  const [newService, setNewService] = useState("");

  const handleAddService = () => {
    if (newService.trim() !== "") {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const handleRemoveService = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="h-full w-full divide-y divide-gray-200">
        {/* Header */}
        <div className="flex items-center space-x-3 px-4 py-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-briefcase text-white"></i>
          </div>
          <h5 className="text-lg font-bold text-gray-900">Core Service:</h5>
        </div>

        {/* Core Service */}
        <div className="flex flex-col gap-4 px-4 py-3">
          {/* View Mode → Bullet List */}
          {!isEditing && (
            <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <li
                    key={index}
                    className="leading-snug break-all text-gray-800"
                  >
                    {service}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No core services added</li>
              )}
            </ul>
          )}

          {/* Edit Mode → Editable Chips */}
          {isEditing && (
            <div className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              {services.map((tag, index) => (
                <div
                  key={index}
                  className="flex max-w-full min-w-0 items-center gap-2 rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700"
                >
                  {/* break-all prevents overflow */}
                  <span className="break-all">{tag}</span>
                  <button
                    onClick={() => handleRemoveService(index)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Add new service input */}
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add service"
                className="w-40 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleAddService}
                className="rounded-md bg-purple-600 px-3 py-1 text-sm font-medium text-white hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex w-full flex-col sm:flex-row sm:justify-end">
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
    </div>
  );
}

export default CoreService;
