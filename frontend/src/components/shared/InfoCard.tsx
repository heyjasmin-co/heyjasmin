import infoIcon from "@/assets/image/infoIcon.png";

function InfoCard({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <img src={infoIcon} alt="Info" className="mt-0.5 h-6 w-6" />
      <p className="text-sm leading-relaxed text-gray-600">{message}</p>
    </div>
  );
}

export default InfoCard;
