import { Outlet } from "react-router-dom";
import CallsList from "../../../../components/calls/CallsList";

export default function CallsPage() {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-72 lg:w-96">
        <CallsList />
      </div>

      {/* Call details panel */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
