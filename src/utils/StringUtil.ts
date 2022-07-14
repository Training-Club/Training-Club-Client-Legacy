/**
 * Capitalizes the first character of the provided string
 *
 * @param text string to capitalize
 */
export const Capitalize = (text: string): string => {
  const split: string[] = text.split(' ');
  let result: string[] = [];

  split.map(s => {
    result.push(s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
  });

  return result.join(' ');
};
