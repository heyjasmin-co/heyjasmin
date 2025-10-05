import { Outlet } from "react-router-dom";
import SideMenu from "../../../../components/settings/SideMenu";

export default function Settings() {
  return (
    <div className="flex h-full flex-1 gap-4">
      {/* Sidebar */}
      <div className="hidden w-72 lg:block">
        <SideMenu />
      </div>

      <Outlet />
    </div>
  );
}
