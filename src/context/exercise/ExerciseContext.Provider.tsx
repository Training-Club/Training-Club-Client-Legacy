import React from 'react';
import {IExercise} from '../../models/Training';
import {ExerciseContext} from './ExerciseContext';

interface IExerciseContextProviderProps {
  children: any;
}

export function ExerciseContextProvider({
  children,
}: IExerciseContextProviderProps) {
  const [exercises, setExercises] = React.useState<IExercise[]>([]);

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        setExercises: (e: IExercise[]) => setExercises(e),
      }}>
      {children}
    </ExerciseContext.Provider>
  );
}
