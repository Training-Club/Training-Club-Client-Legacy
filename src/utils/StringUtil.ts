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

/**
 * Formats a query string for an exercise info search query
 *
 * @param exerciseName Exercise name (applies as &name=<exerciseName)
 * @param filters Array of filters
 */
export const FormatExerciseInfoQuery = (
  exerciseName: string,
  filters: string[],
): string | undefined => {
  let query: string[] = [];

  query.push('&name=' + exerciseName);

  if (filters.length > 0) {
    filters.forEach(filter => query.push('&muscleGroups=' + filter));
  }

  if (query.length <= 0) {
    return undefined;
  }

  return query.join('');
};
