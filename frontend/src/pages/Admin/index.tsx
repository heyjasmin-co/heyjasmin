import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Main() {
  return (
    <div className="flex h-screen gap-4 p-5">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Main;
