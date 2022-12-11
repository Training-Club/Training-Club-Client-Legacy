import {nanoid} from 'nanoid/non-secure';
import {
  DistanceMeasurement,
  getConvertedDistance,
  getConvertedWeight,
  MeasurementSystem,
} from '../models/Measurement';

import {
  AdditionalExerciseType,
  ExerciseEquipment,
  ExerciseInfo,
  GroupedExercise,
  IAdditionalExercise,
  ICompressedAdditionalExercise,
  ICompressedExercise,
  ICompressedExerciseValueDistance,
  ICompressedExerciseValueTime,
  ICompressedExerciseValueWeight,
  ICompressedSession,
  IExercise,
  IExerciseValueDistance,
  IExerciseValueTime,
  IExerciseValueWeight,
  ITrainingSession,
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
  if (!exercises) {
    return [];
  }

  const processedExercises: string[] = [];
  const grouped: GroupedExercise[] = [];
  const copied: IExercise[] = [...exercises];

  copied.sort(
    (a, b) => new Date(a.addedAt).getDate() - new Date(b.addedAt).getDate(),
  );

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

    collection.sort(
      (a, b) => new Date(a.addedAt).getDate() - new Date(b.addedAt).getDate(),
    );

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
 * Compresses weight values in to compressed exercise value weight
 *
 * @param value Exercise Value Weight
 */
function compressWeightValues(
  value?: IExerciseValueWeight,
): ICompressedExerciseValueWeight | undefined {
  if (!value) {
    return undefined;
  }

  const converted =
    value.measurement === MeasurementSystem.METRIC
      ? getConvertedWeight(value.value, MeasurementSystem.METRIC)
      : value.value;

  return {
    weightValue: converted,
    weightMeasurementSystem: value.measurement ?? MeasurementSystem.IMPERIAL,
    plateCounterEnabled: value.plateCounterEnabled ?? false,
  };
}

/**
 * Decompresses a compressed weight value object and returns the standard version for client use
 *
 * @param value Compressed Exercise Value Weight
 */
function decompressWeightValues(
  value?: ICompressedExerciseValueWeight,
): IExerciseValueWeight | undefined {
  if (!value) {
    return undefined;
  }

  const converted =
    value.weightMeasurementSystem === MeasurementSystem.IMPERIAL
      ? value.weightValue
      : getConvertedWeight(value.weightValue, value.weightMeasurementSystem);

  return {
    value: converted,
    measurement: value.weightMeasurementSystem,
    plateCounterEnabled: value.plateCounterEnabled,
  };
}

/**
 * Compresses distance values in to compressed exercise value distance
 *
 * @param value Exercise Value Distance
 */
function compressDistanceValues(
  value?: IExerciseValueDistance,
): ICompressedExerciseValueDistance | undefined {
  if (!value) {
    return undefined;
  }

  const converted =
    !value.measurement || value.measurement === DistanceMeasurement.METER
      ? value.value
      : getConvertedDistance(
          value.value,
          value.measurement,
          DistanceMeasurement.METER,
        );

  return {
    distanceValue: converted,
    distanceMeasurementSystem: value.measurement ?? DistanceMeasurement.METER,
  };
}

/**
 * Decompresses compressed distance values in to client readable distance values
 *
 * @param value Compressed Distance Value
 */
function decompressDistanceValues(
  value?: ICompressedExerciseValueDistance,
): IExerciseValueDistance | undefined {
  if (!value) {
    return undefined;
  }

  const converted =
    value.distanceMeasurementSystem === DistanceMeasurement.METER
      ? value.distanceValue
      : getConvertedDistance(
          value.distanceValue,
          DistanceMeasurement.METER,
          value.distanceMeasurementSystem,
        );

  return {
    value: converted,
    measurement: value.distanceMeasurementSystem,
  };
}

/**
 * Compresses Exercise Time Value in to compressed version used for database queries
 *
 * @param value Exercise Value Time
 */
function compressTimeValues(
  value?: IExerciseValueTime,
): ICompressedExerciseValueTime | undefined {
  if (!value) {
    return undefined;
  }

  // convert time fields to milliseconds
  let millis = 0;

  if (value.value.hours > 0) {
    millis += 1000 * 60 * 60 * value.value.hours;
  }

  if (value.value.minutes > 0) {
    millis += 1000 * 60 * value.value.minutes;
  }

  if (value.value.seconds > 0) {
    millis += 1000 * value.value.seconds;
  }

  if (value.value.milliseconds > 0) {
    millis += value.value.milliseconds;
  }

  return {
    timeValue: millis,
    timeRenderMillis: value.timeRenderMillis,
  };
}

/**
 * Decompresses compressed time values back to client read-able format
 *
 * @param value Compressed Time Exercise Value
 */
function decompressTimeValues(
  value?: ICompressedExerciseValueTime,
): IExerciseValueTime | undefined {
  if (!value) {
    return undefined;
  }

  const milliseconds = Math.floor((value.timeValue % 1000) / 100);
  const seconds = Math.floor((value.timeValue / 1000) % 60);
  const minutes = Math.floor((value.timeValue / (1000 * 60)) % 60);
  const hours = Math.floor((value.timeValue / (1000 * 60 * 60)) % 24);

  return {
    value: {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds,
    },

    timeRenderMillis: value.timeRenderMillis,
  };
}

/**
 * Compresses an array of exercises in to compressed exercise values
 *
 * @param exercises Exercises to compress
 */
export function compressExercises(
  exercises: IExercise[],
): ICompressedExercise[] {
  let compressedExercises: ICompressedExercise[] = [];

  exercises.forEach(originalExercise => {
    let compressedAdditionalExercises: ICompressedAdditionalExercise[] = [];

    originalExercise.additionalExercises?.map(originalAdditionalExercise => {
      const compressedAdditional: ICompressedAdditionalExercise = {
        exerciseName: originalAdditionalExercise.exerciseName,
        addedAt: originalAdditionalExercise.addedAt,
        variant: originalAdditionalExercise.variant,
        type: originalAdditionalExercise.type,
        performed: originalAdditionalExercise.performed,
        values: {
          weight: compressWeightValues(
            originalAdditionalExercise.values.weight,
          ),
          time: compressTimeValues(originalAdditionalExercise.values.time),
          distance: compressDistanceValues(
            originalAdditionalExercise.values.distance,
          ),
          reps: originalAdditionalExercise.values.reps,
        },
      };

      compressedAdditionalExercises.push(compressedAdditional);
    });

    const compressedExercise: ICompressedExercise = {
      id: originalExercise.id,
      exerciseName: originalExercise.exerciseName,
      addedAt: originalExercise.addedAt,
      type: originalExercise.type,
      performed: originalExercise.performed,
      additionalExercises: compressedAdditionalExercises,
      values: {
        weight: compressWeightValues(originalExercise.values.weight),
        time: compressTimeValues(originalExercise.values.time),
        distance: compressDistanceValues(originalExercise.values.distance),
        reps: originalExercise.values.reps,
      },
    };

    compressedExercises.push(compressedExercise);
  });

  return compressedExercises;
}

/**
 * Decompresses a compressed array of exercises
 *
 * @param exercises Array of compressed exercises
 */
export function decompressExercises(
  exercises: ICompressedExercise[],
): IExercise[] {
  let decompressedExercises: IExercise[] = [];

  exercises.forEach(compressedExercise => {
    let decompressedAdditionalExercises: IAdditionalExercise[] = [];

    compressedExercise.additionalExercises?.map(
      compressedAdditionalExercise => {
        const decompressedAdditional: IAdditionalExercise = {
          exerciseName: compressedAdditionalExercise.exerciseName,
          addedAt: compressedAdditionalExercise.addedAt,
          variant: compressedAdditionalExercise.variant,
          type: compressedAdditionalExercise.type,
          performed: compressedAdditionalExercise.performed,
          values: {
            weight: decompressWeightValues(
              compressedAdditionalExercise.values.weight,
            ),
            time: decompressTimeValues(
              compressedAdditionalExercise.values.time,
            ),
            distance: decompressDistanceValues(
              compressedAdditionalExercise.values.distance,
            ),
            reps: compressedAdditionalExercise.values.reps,
          },
        };

        decompressedAdditionalExercises.push(decompressedAdditional);
      },
    );

    const decompressedExercise: IExercise = {
      id: compressedExercise.id,
      exerciseName: compressedExercise.exerciseName,
      addedAt: compressedExercise.addedAt,
      type: compressedExercise.type,
      performed: compressedExercise.performed,
      additionalExercises: decompressedAdditionalExercises,
      values: {
        weight: decompressWeightValues(compressedExercise.values.weight),
        time: decompressTimeValues(compressedExercise.values.time),
        distance: decompressDistanceValues(compressedExercise.values.distance),
        reps: compressedExercise.values.reps,
      },
    };

    decompressedExercises.push(decompressedExercise);
  });

  return decompressedExercises;
}

/**
 * Compresses a training session
 *
 * @param session Training Session
 * @param exercises Exercises to compress
 */
export function createCompressedSession(
  session: ITrainingSession,
  exercises: IExercise[],
): ICompressedSession {
  const compressedExercises = compressExercises(exercises);

  return {
    id: session.id,
    sessionName: session.sessionName ?? 'My Workout',
    author: session.author,
    status: session.status,
    timestamp: session.timestamp ?? new Date(),
    exercises: compressedExercises,
  };
}

/**
 * Creates a new decompressed training session
 *
 * @param compressedSession Session to decompress
 */
export function createDecompressedSession(
  compressedSession: ICompressedSession,
): ITrainingSession {
  const decompressedExercises = decompressExercises(
    compressedSession.exercises,
  );

  return {
    id: compressedSession.id,
    sessionName: compressedSession.sessionName,
    author: compressedSession.author,
    status: compressedSession.status,
    timestamp: compressedSession.timestamp,
    exercises: decompressedExercises,
  };
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
