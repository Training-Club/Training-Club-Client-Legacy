import React from 'react';
import {IExercise} from '../../models/Training';

export interface IExerciseContext {
  exercises: IExercise[];
  setExercises: (exercises: IExercise[]) => void;
}

export const ExerciseContext = React.createContext<IExerciseContext>({
  exercises: [],
  setExercises: () => {},
});

export const useExerciseContext = () => React.useContext(ExerciseContext);
