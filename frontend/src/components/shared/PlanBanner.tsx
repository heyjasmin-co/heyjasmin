function PlanBanner() {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-3 text-sm font-medium text-yellow-800">
      <i className="fa-solid fa-gem text-yellow-600" />
      <span>
        <span className="font-semibold">Premium Feature → </span>
        Available in Pro & Plus plan
      </span>
    </div>
  );
}

export default PlanBanner;
