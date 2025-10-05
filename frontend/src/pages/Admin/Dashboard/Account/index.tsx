import { Outlet } from "react-router-dom";
import AccountMenu from "../../../../components/Account/AccountMenu";

export default function index() {
  return (
    <div className="flex h-full flex-1 gap-4 overflow-y-auto">
      {/* Sidebar */}
      <div className="hidden w-72 lg:block">
        <AccountMenu />
      </div>

      <Outlet />
    </div>
  );
}
