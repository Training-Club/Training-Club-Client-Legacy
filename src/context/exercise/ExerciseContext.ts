import React from 'react';
import {GroupedExercise, IExercise} from '../../models/Training';

export interface IExerciseContext {
  exercises: IExercise[];
  setExercises: (exercises: IExercise[]) => void;
  duplicateSet: (exercise: IExercise) => void;
  removeSet: (exercise: IExercise) => void;
  toggleComplete: (exercise: IExercise) => void;
  addExercise: (exercise: IExercise) => void;
  removeExercise: (groupedExercise: GroupedExercise) => void;
}

export const ExerciseContext = React.createContext<IExerciseContext>({
  exercises: [],
  setExercises: () => {},
  duplicateSet: () => {},
  removeSet: () => {},
  toggleComplete: () => {},
  addExercise: () => {},
  removeExercise: () => {},
});

export const useExerciseContext = () => React.useContext(ExerciseContext);
