import { appName } from "@/theme/appName";
import { colorTheme } from "@/theme/colorTheme";
import { useNavigate } from "react-router-dom";
type EmptyScenariosProps = {
  onAdd: () => void;
  canEdit: boolean;
  hasAccess: boolean;
};

export default function EmptyScenarios({
  onAdd,
  canEdit,
  hasAccess,
}: EmptyScenariosProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/30 px-6 py-12 text-center">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: colorTheme.secondaryColor(0.1) }}
      >
        <i className="fa-solid fa-phone text-3xl text-purple-600" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900">
        No Transfer Scenarios
      </h3>
      <p className="mb-6 max-w-xs text-sm text-gray-500">
        Add some scenarios to help {appName} know when to transfer calls.
      </p>
      {canEdit && hasAccess ? (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95"
          style={{ backgroundColor: colorTheme.secondaryColor(1) }}
        >
          <i className="fa-solid fa-plus text-xs"></i>
          <span>Add Transfer Scenario</span>
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/admin/dashboard/account/billing");
          }}
          className="flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold text-white hover:bg-purple-700"
          style={{
            backgroundColor: colorTheme.secondaryColor(0.9),
          }}  
        >
          Upgrade Plan
          <i className="fa-solid fa-arrow-right" />
        </button>
      )}
    </div>
  );
}
