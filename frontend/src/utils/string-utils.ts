export const capitalizeString = (text: string) => {
  if (!text) return "";
  const firstChar = text.charAt(0).toUpperCase();
  const restChars = text.slice(1).toLowerCase();

  return firstChar + restChars;
};

export function formatPhoneNumber(number: string) {
  // Remove all non-digits
  const cleaned = ("" + number).replace(/\D/g, "");

  // Handle US format (+1XXXXXXXXXX)
  const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
  }

  return number; // fallback if not US number
}
