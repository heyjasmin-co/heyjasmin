/* eslint-disable @typescript-eslint/no-explicit-any */
import infoIcon from "@/assets/image/infoIcon.png";
import { appName } from "@/theme/appName";
import { colorTheme } from "@/theme/colorTheme";
import { BusinessDetailsType } from "@/types/BusinessTypes";
import React, { useState } from "react";
import EmptyScenarios from "./EmptyScenarios";
import TransferScenarioModal from "./TransferScenarioModal";

type TransferCallsContentProps = {
  businessDetails: BusinessDetailsType;
  setBusinessDetails: React.Dispatch<
    React.SetStateAction<BusinessDetailsType | null>
  >;
  canEdit: boolean;
};

export default function TransferCallsContent({
  businessDetails,
  setBusinessDetails,
  canEdit,
}: TransferCallsContentProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingScenario, setEditingScenario] = useState<any>(null);

  const scenarios = businessDetails.callTransferSettings?.scenarios || [];

  const handleAdd = () => {
    setEditingScenario(null);
    setShowModal(true);
  };

  const handleEdit = (scenario: any) => {
    setEditingScenario(scenario);
    setShowModal(true);
  };

  return (
    <div
      className="flex w-full flex-col gap-6"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
            >
              <i className="fa-solid fa-phone-volume text-sm text-white"></i>
            </div>
            <h5 className="text-lg font-bold text-gray-900">Transfer calls</h5>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex gap-3 px-4 py-4">
          <img src={infoIcon} alt="Info" className="mt-0.5 h-6 w-6" />
          <p className="text-sm leading-relaxed text-gray-600">
            {appName} can transfer a call to a person or department at the
            caller’s request. The phone numbers used for these transfers must be
            unique for each scenario and must be different from the phone number
            forwarding to {appName}.
          </p>
        </div>

        {/* List Section */}
        <div className="border-t border-gray-200 px-4 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h6 className="text-md font-bold text-gray-800">
              Transfer Scenarios
            </h6>
            {canEdit && (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-100"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Add</span>
              </button>
            )}
          </div>

          {scenarios.length === 0 ? (
            <EmptyScenarios onAdd={handleAdd} canEdit={canEdit} />
          ) : (
            <div className="flex flex-col gap-3">
              {scenarios.map((s: any, idx: number) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-900">{s.name}</span>
                    <span className="text-sm text-gray-500">
                      {s.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {s.warmTransfer && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase">
                        Warm
                      </span>
                    )}
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700 capitalize">
                      {s.availability.replace("_", " ")}
                    </span>
                    {canEdit && (
                      <button
                        onClick={() => handleEdit(s)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-purple-50 hover:text-purple-600"
                      >
                        <i className="fa-solid fa-edit text-sm"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <TransferScenarioModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          scenario={editingScenario}
          businessDetails={businessDetails}
          setBusinessDetails={setBusinessDetails}
        />
      )}
    </div>
  );
}
