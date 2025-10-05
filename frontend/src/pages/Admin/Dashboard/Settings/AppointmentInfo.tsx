import appointmentImage from "../../../../assets/image/appointmentImage.png";

export default function AppointmentInfo() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Image */}
      <img
        src={appointmentImage}
        alt="Under maintenance"
        className="mb-6 h-40 w-auto max-w-full object-contain sm:h-56 md:h-72 lg:h-80"
      />

      {/* Text Content */}
      <div className="max-w-md space-y-3 px-2 sm:px-0">
        <h2 className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
          Under Maintenance 🚧
        </h2>
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base">
          This section is currently under maintenance. We’re working hard to
          bring you a better experience — please check back soon.
        </p>
      </div>
    </div>
  );
}
