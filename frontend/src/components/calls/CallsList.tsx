/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { useApiClient } from "../../lib/axios";
import { colorTheme } from "../../theme/colorTheme";
import { CallsType } from "../../types/CallsType";
import { errorToast, successToast } from "../../utils/react-toast";
import { formatPhoneNumber } from "../../utils/string-utils";
import Loading from "../Loading";

export default function CallsList() {
  const apiClient = useApiClient();
  const [calls, setCalls] = useState<CallsType>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUserData();

  const fetchCalls = async () => {
    if (!userData?.businessId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get<{
        success: boolean;
        message: string;
        data: CallsType;
      }>(`/calls/${userData.businessId}`);

      setCalls(res.data.data);
      successToast(res.data.message);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch calls");
      errorToast("Failed to fetch calls");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (userData?.businessId) {
      fetchCalls();
    }
  }, [userData?.businessId]);

  return (
    <div
      className="flex h-full w-full flex-col gap-6 rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Loading */}
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={fetchCalls}
            className="mt-3 rounded-md bg-purple-500 px-4 py-1.5 text-sm text-white shadow-sm hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h5 className="font-bold tracking-wide text-gray-800 uppercase">
              Inbox
            </h5>
            <div className="mt-1 flex items-center text-sm text-gray-700 sm:mt-0">
              <span className="font-semibold tracking-wide">
                All ({calls.length})
              </span>
              <i
                className="fa-solid fa-rotate-right ml-3 cursor-pointer text-sm text-gray-400 hover:text-gray-600"
                onClick={fetchCalls}
              />
            </div>
          </div>

          {/* No Calls */}
          {calls.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex w-full max-w-sm flex-col items-center rounded-xl bg-purple-50 p-8 text-center shadow-sm">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full shadow-inner"
                  style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
                >
                  <i className="fa-solid fa-phone-volume text-lg text-white" />
                </div>
                <h2 className="mt-3 text-lg font-semibold text-gray-900">
                  No Calls...
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  You don’t currently have any calls.
                </p>
              </div>
            </div>
          ) : (
            // Calls list
            <div className="flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-4">
                {calls.map((call) => (
                  <li
                    key={call._id}
                    className="rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    <NavLink
                      to={`/admin/dashboard/calls/call-details/${call._id}`}
                      className="flex flex-col gap-1 rounded-lg px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex flex-col text-sm text-gray-800">
                        <p className="flex items-center gap-2 font-semibold text-gray-900">
                          <i className="fa-solid fa-phone text-purple-500" />
                          {call.customerPhoneNumber
                            ? formatPhoneNumber(call.customerPhoneNumber)
                            : "Unknown Caller"}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          Duration:{" "}
                          {call.durationSeconds
                            ? `${Math.floor(call.durationSeconds / 60)}:${String(Math.floor(call.durationSeconds % 60)).padStart(2, "0")}`
                            : "N/A"}
                        </p>
                        <p
                          className="mt-1 text-xs text-gray-500"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {call.summary || "No summary available."}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center gap-3 sm:mt-0">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize shadow-sm ${
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
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
