import { colorTheme } from "../../theme/colorTheme";

export default function CallDetails() {
  const call = {
    id: 1,
    name: "John Doe",
    duration: "5m 23s",
    status: "Completed",
    time: "Oct 4, 2025 • 2:15 PM",
    summary:
      "Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.Asked about pricing and scheduling for next week. Agreed to a follow-up call on Tuesday to finalize details.",
  };

  return (
    <div
      className="flex h-full w-full flex-col gap-6 rounded-2xl bg-white p-4 shadow-lg sm:p-6"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">{call.name}</h2>
      </div>

      {/* Call Info */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            {call.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{call.name}</p>
            <p className="text-xs text-gray-500">{call.time}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <span
            className={`rounded px-2 py-1 text-xs font-semibold ${
              call.status === "Completed"
                ? "bg-green-100 text-green-600"
                : call.status === "Missed"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {call.status}
          </span>
          <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            Duration: {call.duration}
          </span>
        </div>
      </div>

      {/* Call Summary */}
      <div className="flex-1">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">
          Call Summary
        </h3>
        <p className="rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
          {call.summary}
        </p>
      </div>
    </div>
  );
}
