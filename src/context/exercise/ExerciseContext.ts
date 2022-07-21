import React from 'react';
import {
  GroupedExercise,
  IAdditionalExercise,
  IExercise,
} from '../../models/Training';

export interface IExerciseContext {
  exercises: IExercise[];
  setExercises: (exercises: IExercise[]) => void;
  duplicateSet: (exercise: IExercise) => void;
  removeSet: (exercise: IExercise) => void;
  toggleComplete: (exercise: IExercise) => void;
  addExercise: (exercise: IExercise) => void;
  removeExercise: (groupedExercise: GroupedExercise) => void;
  setParentField: (fieldName: string, exercise: IExercise, data: any) => void;
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
  addExercise: () => {},
  removeExercise: () => {},
});

export const useExerciseContext = () => React.useContext(ExerciseContext);
