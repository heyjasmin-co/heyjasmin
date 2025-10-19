export const capitalizeString = (text: string) => {
  if (!text) return "";
  const firstChar = text.charAt(0).toUpperCase();
  const restChars = text.slice(1).toLowerCase();

  return firstChar + restChars;
};
