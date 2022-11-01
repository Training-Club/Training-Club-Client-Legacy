import {nanoid} from 'nanoid/non-secure';
import {DistanceMeasurement, MeasurementSystem} from '../models/Measurement';

import {
  AdditionalExerciseType,
  ExerciseEquipment,
  ExerciseInfo,
  GroupedExercise,
  IAdditionalExercise,
  IExercise,
} from '../models/Training';

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
 * TODO: Add support for checking difference on Additional Exercises
 * TODO: e.g, Benchpress + Incline and Benchpress + Run get added to the same card
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

/**
 * Accepts an array of Exercise Info, if more than one element is
 * present in the array all other exercises will be created as
 * additional exercises under the first element in the array
 *
 * @param {ExerciseInfo} data Array of Exercise Info
 */
export function getMockExerciseData(data: ExerciseInfo[]): IExercise {
  if (data.length === 1) {
    const elem = data[0];

    return {
      id: nanoid(6),
      exerciseName: elem.name,
      addedAt: new Date(),
      performed: false,
      type: elem.type,
      values: {
        reps: 5,
        weight: {
          value: 135,
          measurement: MeasurementSystem.IMPERIAL,
          plateCounterEnabled: elem.equipment === ExerciseEquipment.BARBELL,
        },
        distance: {
          value: 1,
          measurement: DistanceMeasurement.KILOMETER,
        },
        time: {
          value: {
            hours: 1,
            minutes: 1,
            seconds: 1,
            milliseconds: 100,
          },
          timeRenderMillis: false,
        },
      },
    };
  }

  const elem = data[0];
  const children: IAdditionalExercise[] = [];

  for (let i = 1; i < data.length; i++) {
    const childElem: ExerciseInfo = data[i];

    children.push({
      exerciseName: childElem.name,
      addedAt: new Date(),
      performed: false,
      type: childElem.type,
      variant: AdditionalExerciseType.SUPERSET,
      values: {
        reps: 5,
        weight: {
          value: 135,
          measurement: MeasurementSystem.IMPERIAL,
        },
        distance: {
          value: 1,
          measurement: DistanceMeasurement.KILOMETER,
        },
        time: {
          value: {
            hours: 1,
            minutes: 1,
            seconds: 1,
            milliseconds: 100,
          },
          timeRenderMillis: false,
        },
      },
    });
  }

  return {
    id: nanoid(6),
    exerciseName: elem.name,
    addedAt: new Date(),
    performed: false,
    type: elem.type,
    additionalExercises: children,
    values: {
      reps: 5,
      weight: {
        value: 135,
        measurement: MeasurementSystem.IMPERIAL,
      },
      distance: {
        value: 1,
        measurement: DistanceMeasurement.KILOMETER,
      },
      time: {
        value: {
          hours: 1,
          minutes: 1,
          seconds: 1,
          milliseconds: 100,
        },
        timeRenderMillis: false,
      },
    },
  };
}
