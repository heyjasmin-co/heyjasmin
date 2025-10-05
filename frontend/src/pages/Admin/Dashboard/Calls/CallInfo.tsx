import callWaiting from "../../../../assets/image/CallWaiting.png";

export default function CallInfo() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Image */}
      <img
        src={callWaiting}
        alt="Call waiting"
        className="mb-6 h-40 w-auto max-w-full object-contain sm:h-56 md:h-72 lg:h-80"
      />

      {/* Text Content */}
      <div className="max-w-md space-y-3 px-2 sm:px-0">
        <h2 className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
          Incoming calls will appear here
        </h2>
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base">
          Once you start receiving calls, you’ll be able to find them right here
          and view all the details discussed.
        </p>
      </div>
    </div>
  );
}
