import Breadcrumb from "../../../components/Breadcrumb";

export default function Dashboard() {
  return (
    <div className="h-full flex-1 justify-center rounded-2xl bg-white px-5 py-6 shadow-lg">
      <div className="flex justify-center">
        <Breadcrumb />
      </div>
    </div>
  );
}
