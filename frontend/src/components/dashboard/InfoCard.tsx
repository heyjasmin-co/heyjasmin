import { Card } from "flowbite-react";
import { colorTheme } from "../../theme/colorTheme";

type InfoCardProps = {
  icon?: string;
  title?: string;
  subtitle?: string;
};

function InfoCard({ icon, title, subtitle }: InfoCardProps) {
  return (
    <Card
      className="w-full rounded-xl border border-gray-200 shadow-md"
      style={{
        backgroundColor: colorTheme.secondaryColor(0.9),
      }}
    >
      <div className="flex flex-col items-center space-y-3 text-center">
        {/* Icon */}
        {icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
            <img src={icon} alt={`Robot Icon`} className="h-15 w-15" />
          </div>
        )}

        {/* Title */}
        {title && (
          <h5
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {title}
          </h5>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="max-w-xl text-base font-normal text-white"
          >
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
}

export default InfoCard;
