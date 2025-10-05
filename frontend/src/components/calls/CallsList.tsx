import { NavLink } from "react-router-dom";
import { colorTheme } from "../../theme/colorTheme";

export default function CallsList() {
  // Example dummy data — replace with your API data
  const calls = [
    {
      id: 1,
      name: "John Doe",
      duration: "5m 23s",
      status: "Completed",
      summary: "Asked about pricing and scheduling for next week.",
    },
    {
      id: 2,
      name: "Jane Smith",
      duration: "2m 12s",
      status: "Missed",
      summary:
        "Call missed, left no voicemail. Call missed, left no voicemail. Call missed, left no voicemail. Call missed, left no voicemail. Call missed, left no voicemail. Call missed, left no voicemail.",
    },
    {
      id: 3,
      name: "Michael Lee",
      duration: "7m 45s",
      status: "In Progress",
      summary: "Discussing service details, follow-up scheduled.",
    },
  ];

  return (
    <div
      className="flex h-full w-full flex-col gap-6 rounded-2xl bg-white p-4 shadow-lg sm:p-6"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h5 className="font-bold tracking-wide uppercase">Inbox</h5>
        <div className="mt-1 flex items-center text-sm text-gray-700 sm:mt-0">
          <span className="font-bold tracking-wide">All ({calls.length})</span>
          <i className="fa-solid fa-rotate-right ml-3 cursor-pointer text-xs text-gray-400 hover:text-gray-600" />
        </div>
      </div>

      {/* If no calls */}
      {calls.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex w-full max-w-sm flex-col items-center rounded-xl bg-purple-50 p-8 text-center shadow-sm">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
            >
              <i className="fa-solid fa-phone-volume text-white" />
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
        <div className="flex-1">
          <ul className="divide-y divide-gray-200">
            {calls.map((call) => (
              <li key={call.id}>
                <NavLink
                  to={`/admin/dashboard/calls/call-details/${call.id}`}
                  className="flex flex-col rounded-lg px-4 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Left side: avatar + info */}
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-semibold text-white"
                      style={{
                        backgroundColor: colorTheme.secondaryColor(0.8),
                      }}
                    >
                      {call.name.charAt(0)}
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {call.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Duration: {call.duration}
                      </p>

                      {/* Clamp summary */}
                      <p
                        className="mt-1 text-xs text-gray-600"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {call.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right side: status badge */}
                  <div className="mt-3 flex-shrink-0 sm:mt-0 sm:ml-4">
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
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
