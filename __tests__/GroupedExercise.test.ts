import {ExerciseType, IExercise} from '../src/models/Training';
import {MeasurementSystem} from '../src/models/Measurement';

import {
  getAsGroupedExercises,
  getNextIncompleteExercise,
} from '../src/data/Training';

describe('GroupedExercise ->', () => {
  const exercises: IExercise[] = [
    {
      id: '0',
      exerciseName: 'Benchpress',
      addedAt: new Date(),
      type: ExerciseType.WEIGHTED_REPS,
      performed: true,
      values: {
        reps: 5,
        weight: {
          value: 135,
          measurement: MeasurementSystem.METRIC,
        },
      },
    },

    {
      id: '1',
      exerciseName: 'Benchpress',
      addedAt: new Date(),
      type: ExerciseType.WEIGHTED_REPS,
      performed: true,
      values: {
        reps: 5,
        weight: {
          value: 135,
          measurement: MeasurementSystem.METRIC,
        },
      },
    },

    {
      id: '2',
      exerciseName: 'Squat',
      addedAt: new Date(),
      type: ExerciseType.WEIGHTED_REPS,
      performed: true,
      values: {
        reps: 5,
        weight: {
          value: 135,
          measurement: MeasurementSystem.METRIC,
        },
      },
    },

    {
      id: '3',
      exerciseName: 'Overhead Press',
      addedAt: new Date(),
      type: ExerciseType.WEIGHTED_REPS,
      performed: false,
      values: {
        reps: 5,
        weight: {
          value: 135,
          measurement: MeasurementSystem.METRIC,
        },
      },
    },
  ];

  it('should return 3 grouped exercises', () => {
    const groupedExercises = getAsGroupedExercises(exercises);
    expect(groupedExercises.length).toEqual(3);
  });

  it('should return an available next incomplete exercise', () => {
    const nextIncompleteExercise = getNextIncompleteExercise(exercises);
    expect(nextIncompleteExercise).toBeTruthy();
  });
});
