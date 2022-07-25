import {GroupedExercise, IExercise} from '../models/Training';

/**
 * Iterates over an exercises additional exercises and collects
 * all exercise names and applies them to a string array
 *
 * @param {IExercise} exercise Exercise to parse
 */
export function getAdditionalExerciseNames(exercise: IExercise): string[] {
  const result: string[] = [];

  if (!exercise.additionalExercises) {
    return result;
  }

  exercise.additionalExercises.map(additionalExercise => {
    result.push(additionalExercise.exerciseName);
  });

  return result;
}

/**
 * Returns the next exercise not marked 'complete' in the stack
 *
 * TODO: This will only parse the parent, add additional exercise support
 *
 * @param {IExercise[]} exercises Exercises to parse
 */
export function getNextIncompleteExercise(
  exercises: IExercise[],
): IExercise | undefined {
  const groupedExercises: GroupedExercise[] = getAsGroupedExercises(exercises);

  for (let i = 0; i < exercises.length; i++) {
    const grouped: GroupedExercise = groupedExercises[i];

    if (grouped === undefined) {
      break;
    }

    const incompleteParent: IExercise[] = grouped.exercises
      .filter(e => !e.performed)
      .sort((a, b) => a.addedAt.getDate() - b.addedAt.getDate());

    if (incompleteParent.length > 0) {
      return incompleteParent[0];
    }
  }

  return undefined;
}

/**
 * Groups all similar exercises together and sorts them in proper display order
 *
 * @param {IExercise[]} exercises Exercises to sort and group
 */
export function getAsGroupedExercises(
  exercises: IExercise[],
): GroupedExercise[] {
  const processedExercises: string[] = [];
  const grouped: GroupedExercise[] = [];
  const copied: IExercise[] = [...exercises];

  copied.sort((a, b) => a.addedAt.getDate() - b.addedAt.getDate());

  copied.map(exercise => {
    processedExercises.push(exercise.exerciseName);
  });

  const exerciseNames: string[] = [...new Set(processedExercises)];

  exerciseNames.map(currentName => {
    const collection: IExercise[] = [];

    copied
      .filter(e => e.exerciseName === currentName)
      .map(match => {
        collection.push(match);
      });

    collection.sort((a, b) => a.addedAt.getDate() - b.addedAt.getDate());

    const displayed: GroupedExercise = {
      name: currentName,
      timestamp: new Date(collection[0].addedAt),
      exercises: collection,
    };

    grouped.push(displayed);
  });

  return grouped;
}
