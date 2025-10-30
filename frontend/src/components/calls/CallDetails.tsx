/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { useApiClient } from "../../lib/axios";
import { CallType } from "../../types/CallsType";
import { errorToast, successToast } from "../../utils/react-toast";
import { formatPhoneNumber } from "../../utils/string-utils";
import Loading from "../Loading";

export default function CallDetails() {
  const { callId } = useParams<{ callId: string }>();
  const { userData } = useUserData();
  const apiClient = useApiClient();

  const [call, setCall] = useState<CallType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCallDetails = async () => {
    if (!userData?.businessId || !callId) return;

    setLoading(true);
    try {
      const res = await apiClient.get<{
        success: boolean;
        message: string;
        data: CallType;
      }>(`/calls/call/${callId}?businessId=${userData.businessId}`);

      setCall(res.data.data);
      successToast(res.data.message);
    } catch (err: any) {
      console.error(err);
      errorToast("Failed to fetch call details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallDetails();
  }, [callId, userData?.businessId]);

  if (!call)
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 text-center shadow-xl sm:p-6"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <p className="text-sm text-gray-600">No call details found.</p>
      </div>
    );

  return (
    <div
      className="flex h-full w-full flex-col gap-6 rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:p-8"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-2 border-b border-gray-200 pb-3 sm:flex-row sm:items-center sm:gap-4">
            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
              Call with{" "}
              {call.customerPhoneNumber
                ? formatPhoneNumber(call.customerPhoneNumber)
                : "Unknown Caller"}
            </h2>
          </div>

          {/* Call Info */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:items-center sm:gap-3">
              <p className="flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-base">
                <i className="fa-solid fa-phone text-purple-500" />
                {call.customerPhoneNumber
                  ? formatPhoneNumber(call.customerPhoneNumber)
                  : "Unknown Caller"}
              </p>
              <p className="mt-1 text-sm text-gray-500 sm:mt-0">
                {new Date(call.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold capitalize shadow-sm ${
                  call.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : call.status === "missed"
                      ? "bg-red-100 text-red-600"
                      : call.status === "voicemail"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {call.status}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600">
                Duration:{" "}
                {call.durationSeconds
                  ? `${Math.floor(call.durationSeconds / 3600)}h ${Math.floor(
                      (call.durationSeconds % 3600) / 60,
                    )}m`
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Call Summary */}
          <div className="flex-1">
            <h3 className="mb-2 text-base font-semibold text-gray-800">
              Call Summary
            </h3>
            <p className="rounded-lg bg-gray-50 p-4 text-sm leading-relaxed break-words text-gray-700">
              {call.summary || "No summary available."}
            </p>
          </div>

          {/* Recording (optional) */}
          {call.recordingUrl && (
            <div className="mt-4">
              <h3 className="mb-2 text-base font-semibold text-gray-800">
                Call Recording
              </h3>
              <audio controls className="w-full rounded-lg">
                <source src={call.recordingUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </>
      )}
    </div>
  );
}
