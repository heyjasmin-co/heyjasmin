import { Outlet } from "react-router-dom";
import CallsList from "../../../../components/calls/CallsList";

export default function CallsPage() {
  return (
    <div
      className="flex h-full flex-1 flex-col gap-4 overflow-y-auto sm:flex-row"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      <style>
        {`
          /* Chrome, Safari, Edge */
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Sidebar */}
      <div className="h-90 w-full sm:h-full sm:w-72 lg:w-96">
        <CallsList />
      </div>

      {/* Call details panel */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
