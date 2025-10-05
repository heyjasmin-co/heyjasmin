function TitleCard({
  title,
  subtitle,
  hasButton = true,
}: {
  title: string;
  subtitle: string;
  hasButton?: boolean;
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6 sm:py-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Subtitle */}
        <div className="flex flex-col">
          <span
            className="text-lg font-semibold text-gray-800 sm:text-xl"
            style={{ fontFamily: "'robot', sans-serif" }}
          >
            {title}
          </span>
          <span className="text-sm text-gray-500 sm:text-base">{subtitle}</span>
        </div>

        {/* Button */}
        {hasButton && (
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 sm:w-auto">
            <span
              className="text-base font-bold sm:text-lg"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Publish
            </span>
            <i className="fa-solid fa-caret-right text-lg text-white sm:text-xl"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default TitleCard;
