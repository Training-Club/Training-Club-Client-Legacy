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

  return `?${query.join('')}`;
};

/**
 * Formats a query string for a post query
 *
 * @param author Post Author ID
 * @param text Post Description Text Regexp
 * @param tags Post Tags
 * @param page Page Number
 */
export const FormatPostQuery = (
  author?: string,
  text?: string,
  tags?: string[],
  page?: number,
): string | undefined => {
  let query: string[] = [];

  if (author) {
    query.push('&author=' + author);
  }

  if (text) {
    query.push('&text=' + text);
  }

  if (tags && tags.length > 0) {
    tags.forEach(tag => query.push('&tags=' + tag));
  }

  if (page) {
    query.push('&page=' + page);
  }

  if (query.length <= 0) {
    return undefined;
  }

  return `?${query.join('')}`;
};
