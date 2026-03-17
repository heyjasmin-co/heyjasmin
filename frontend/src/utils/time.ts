export const convertTo24Hour = (time12h: string): string => {
  if (!time12h) return "";

  // Normalize string: remove spaces, uppercase
  const normalized = time12h.replace(/\s+/g, "").toUpperCase();

  // Extract parts
  const modifier = normalized.includes("PM")
    ? "PM"
    : normalized.includes("AM")
      ? "AM"
      : "";
  const timePart = normalized.replace("AM", "").replace("PM", "");

  if (!timePart.includes(":")) return time12h;

  const [hoursStr, minutesStr] = timePart.split(":");
  let hours = parseInt(hoursStr, 10);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${minutesStr}`;
};

export const formatTime = (time: string) => {
  if (!time) return "";
  if (time.match(/am|pm/i)) return time;

  const [hour, minute] = time.split(":");
  const h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 || 12;
  return `${displayHour}:${minute} ${ampm}`;
};
