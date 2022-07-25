import React from 'react';
import {DistanceMeasurement, MeasurementSystem} from '../../models/Measurement';

import {
  GroupedExercise,
  IAdditionalExercise,
  IExercise,
  ITrainable,
} from '../../models/Training';

export interface IExerciseContext {
  exercises: IExercise[];
  setExercises: (exercises: IExercise[]) => void;
  duplicateSet: (exercise: IExercise) => void;
  removeSet: (exercise: IExercise) => void;
  toggleComplete: (exercise: ITrainable, parentExerciseId?: string) => void;
  toggleMilliseconds: (exercise: GroupedExercise, value: boolean) => void;
  addExercise: (exercise: IExercise) => void;
  removeExercise: (groupedExercise: GroupedExercise) => void;
  setParentField: (fieldName: string, exercise: IExercise, data: any) => void;
  toggleMeasurement: (
    exercise: GroupedExercise,
    measurement: MeasurementSystem,
  ) => void;

  toggleDistanceMeasurement: (
    exercise: GroupedExercise,
    value: DistanceMeasurement,
  ) => void;

  setAdditionalField: (
    fieldName: string,
    additionalExercise: IAdditionalExercise,
    parentExerciseId: string,
    data: any,
  ) => void;
}

export const ExerciseContext = React.createContext<IExerciseContext>({
  exercises: [],
  setExercises: () => {},
  setParentField: () => {},
  setAdditionalField: () => {},
  duplicateSet: () => {},
  removeSet: () => {},
  toggleComplete: () => {},
  toggleMilliseconds: () => {},
  toggleDistanceMeasurement: () => {},
  toggleMeasurement: () => {},
  addExercise: () => {},
  removeExercise: () => {},
});

export const useExerciseContext = () => React.useContext(ExerciseContext);
