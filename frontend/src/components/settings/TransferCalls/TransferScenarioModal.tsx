import { appName } from "@/theme/appName";
import { colorTheme } from "@/theme/colorTheme";
import { IBusinessHour, ITransferScenario } from "@/types/BusinessTypes";
import { errorToast, successToast } from "@/utils/react-toast";
import { ToggleSwitch } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateTransferScenario } from "../../../api/hooks/useBusinessQueries";
import { useUserData } from "../../../context/UserDataContext";

interface TransferScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario?: ITransferScenario | null;
  refetch?: () => Promise<void>;
}

type AvailabilityType = "always" | "business_hours" | "custom" | "none";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultHours: IBusinessHour[] = daysOfWeek.map((day) => ({
  day: day as IBusinessHour["day"],
  start: "08:00",
  end: "17:00",
  isOpen: day !== "Saturday" && day !== "Sunday",
}));

export default function TransferScenarioModal({
  isOpen,
  onClose,
  scenario,
  refetch,
}: TransferScenarioModalProps) {
  const { userData } = useUserData();
  const updateScenarioMutation = useUpdateTransferScenario();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<ITransferScenario>({
    name: "",
    phoneNumber: "",
    warmTransfer: false,
    availability: "always",
    customHours: [...defaultHours],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ITransferScenario, string>>
  >({});

  useEffect(() => {
    if (scenario) {
      setFormData({
        ...scenario,
        customHours: scenario.customHours || [...defaultHours],
      });
    } else {
      setFormData({
        name: "",
        phoneNumber: "",
        warmTransfer: false,
        availability: "always",
        customHours: [...defaultHours],
      });
    }
  }, [scenario, isOpen]);

  if (!isOpen) return null;

  const handleToggleDay = (idx: number) => {
    const updated = [...(formData.customHours || [])];
    updated[idx].isOpen = !updated[idx].isOpen;
    setFormData({ ...formData, customHours: updated });
  };

  const handleTimeChange = (
    idx: number,
    field: "start" | "end",
    value: string,
  ) => {
    const updated = [...(formData.customHours || [])];
    updated[idx][field] = value;
    setFormData({ ...formData, customHours: updated });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof ITransferScenario, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Scenario is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      await updateScenarioMutation.mutateAsync({
        businessId: userData?.businessId || "",
        scenario: formData,
      });

      successToast(scenario ? "Scenario updated" : "Scenario added");
      onClose();
      if (refetch) await refetch();
    } catch (error: unknown) {
      let errorMessage = "Failed to save scenario";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response: { data: { error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error || "Failed to save scenario";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      errorToast(errorMessage);
    }
  };

  const loading = updateScenarioMutation.isPending;

  const availabilityTabs: { id: AvailabilityType; label: string }[] = [
    { id: "always", label: "Always" },
    { id: "business_hours", label: "Business Hours" },
    { id: "custom", label: "Custom" },
    { id: "none", label: "None" },
  ];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl transition-all duration-300"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h3 className="text-xl font-bold text-gray-900">
            Transfer Scenarios
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Description */}
        <div className="border-b border-gray-50 px-6 py-4">
          <p className="text-sm text-gray-500">
            Enter a person or department name and phone number so {appName} can
            transfer calls. If you want a general transfer option for any
            request, name it "all transfer requests."
          </p>
          <p className="mt-2 text-sm text-gray-500">
            If multiple transfer reasons route to the same destination number,
            list them as a comma-separated list in a single scenario.
          </p>
        </div>

        {/* Form Body */}
        <div className="flex flex-col gap-6 overflow-y-auto px-6 py-6">
          {/* Scenario Name */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-800">
                  Scenario
                </label>
                <span className="text-xs text-gray-500">
                  Enter a person's name or a department.
                </span>
              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  className={`w-full rounded-xl border ${errors.name ? "border-red-500" : "border-gray-200"} px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200`}
                  placeholder='i.e. "Sam" or "Billing" or "all transfer requests"'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {errors.name && (
                  <span className="mt-1 block text-[10px] text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Transfer To */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-800">
                  Transfer to
                </label>
                <span className="text-xs text-gray-500">
                  Enter the phone number to transfer the call to. Extensions not
                  supported.
                </span>
              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  className={`w-full rounded-xl border ${errors.phoneNumber ? "border-red-500" : "border-gray-200"} px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200`}
                  placeholder="(000) 000-0000"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
                {errors.phoneNumber && (
                  <span className="mt-1 block text-[10px] text-red-500">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-50" />

          <div className="flex items-center justify-between">
            <div className="flex w-3/4 flex-col gap-1">
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-gray-800">
                  Warm Transfer
                </label>
                <i className="fa-solid fa-arrows-rotate text-xs text-gray-400"></i>
              </div>
              <span className="text-xs text-gray-500">
                Before transferring the call, {appName} will contact the
                transfer destination to brief them on the caller's needs and
                confirm they are available to take the call.
              </span>
            </div>
            <ToggleSwitch
              checked={formData.warmTransfer}
              onChange={(val) =>
                setFormData({ ...formData, warmTransfer: val })
              }
              label=""
            />
          </div>

          {formData.warmTransfer && (
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
              <i className="fa-solid fa-circle-info text-gray-400"></i>
              <p className="grow text-xs text-gray-600">
                Incoming warm transfer calls will come from (448) 233-3334 -
                save this number in your contacts so you recognize {appName}'s
                calling with a transfer.
              </p>
            </div>
          )}

          <hr className="border-gray-50" />

          {/* Availability */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-800">
                Availability
              </label>
              <i className="fa-solid fa-circle-question text-xs text-gray-300"></i>
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl bg-gray-100 p-1">
              {availabilityTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setFormData({ ...formData, availability: tab.id })
                  }
                  className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                    formData.availability === tab.id
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panel */}
            <div className="min-h-[100px] rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <span className="mb-2 block text-[10px] font-bold text-gray-400 uppercase">
                Scenario Availability
              </span>

              {formData.availability === "always" && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">
                    Always - 24/7
                  </span>
                  <span className="text-xs text-gray-500">
                    Transfer calls 24/7
                  </span>
                </div>
              )}

              {formData.availability === "business_hours" && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">
                    Business Hours
                  </span>
                  <span className="text-xs text-gray-500">
                    Transfer calls only during the business hours set in your{" "}
                    <span
                      onClick={() => {
                        navigate("/admin/dashboard/settings/business-info");
                      }}
                      className="cursor-pointer text-purple-600 underline"
                    >
                      Business Information
                    </span>
                    .
                  </span>
                </div>
              )}

              {formData.availability === "custom" && (
                <div className="flex flex-col gap-4">
                  <div className="mb-2 flex flex-col">
                    <span className="text-sm font-bold text-gray-800">
                      Custom Hours
                    </span>
                    <span className="text-xs text-gray-500">
                      {appName} will only transfer calls for this scenario
                      during these times. Times shown in America/Lima.
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {formData.customHours?.map((hour, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex w-32 items-center gap-3">
                          <ToggleSwitch
                            checked={hour.isOpen}
                            onChange={() => handleToggleDay(idx)}
                            label=""
                          />
                          <span className="text-sm font-bold text-gray-700">
                            {hour.day}
                          </span>
                        </div>

                        {hour.isOpen ? (
                          <div className="flex flex-grow items-center gap-2">
                            <input
                              type="time"
                              className="flex-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-purple-500"
                              value={hour.start}
                              onChange={(e) =>
                                handleTimeChange(idx, "start", e.target.value)
                              }
                            />
                            <span className="text-center text-xs text-gray-400">
                              to
                            </span>
                            <input
                              type="time"
                              className="flex-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-purple-500"
                              value={hour.end}
                              onChange={(e) =>
                                handleTimeChange(idx, "end", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          <span className="flex-grow text-center text-xs text-gray-400 italic">
                            Unavailable
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.availability === "none" && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">
                    None - Transfer Off
                  </span>
                  <span className="text-xs text-gray-500">
                    No calls will be transferred.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full px-6 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-full px-8 py-2 text-sm font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            style={{ backgroundColor: colorTheme.secondaryColor(0.9) }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
