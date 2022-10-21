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
 * Formats a query string for a training session query
 *
 * @param sessionName Session name
 * @param exerciseNames Exercise names
 * @param authorId Author ID
 * @param page Page
 */
export const FormatTrainingSessionQuery = (
  sessionName?: string,
  exerciseNames?: string[],
  authorId?: string,
  page?: number,
): string | undefined => {
  let query: string[] = [];

  if (sessionName) {
    query.push('&name=' + sessionName);
  }

  if (exerciseNames && exerciseNames.length > 0) {
    exerciseNames.forEach(exerciseName =>
      query.push('&exercise=' + exerciseName),
    );
  }

  if (authorId) {
    query.push('&author=' + authorId);
  }

  if (page) {
    query.push('&page=' + page);
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

/**
 * Accepts a large number and formats it in a much smaller, easier-on-the-eyes
 * format such as 1.1m, or 360k, rather than 1,100,000 or 360,000
 *
 * @param {number} value Number value to condense
 */
export const FormatLargeNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    //@ts-ignore LOL
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};
