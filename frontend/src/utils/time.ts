export const convertTo24Hour = (time12h: string): string => {
  const [time, modifier] = time12h.split(" ");
  let hours = time.split(":")[0];
  const min = time.split(":")[1];

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours.padStart(2, "0")}:${min}`;
};

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 || 12;
  return `${displayHour}:${minute} ${ampm}`;
};
