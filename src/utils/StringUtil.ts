/**
 * Capitalizes the first character of the provided string
 *
 * @param text string to capitalize
 */
export const Capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
