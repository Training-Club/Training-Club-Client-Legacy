import React from 'react';
import {GroupedExercise, IExercise} from '../../models/Training';
import {ExerciseContext} from './ExerciseContext';
import {nanoid} from 'nanoid/non-secure';

interface IExerciseContextProviderProps {
  children: any;
}

export function ExerciseContextProvider({
  children,
}: IExerciseContextProviderProps) {
  const [exercises, setExercises] = React.useState<IExercise[]>([]);

  /**
   * Duplicates the provided exercise and adds it to state
   * @param {IExercise} exercise Exercise to duplicate
   */
  const duplicateSet = React.useCallback(
    (exercise: IExercise) => {
      const copiedExercises: IExercise[] = [...exercises];
      const copy: IExercise = {
        ...exercise,
        id: nanoid(5),
        addedAt: new Date(),
        performed: false,
      };

      copiedExercises.push(copy);

      requestAnimationFrame(() => {
        setExercises(copiedExercises);
      });
    },
    [exercises],
  );

  /**
   * Removes the provided exercise set from state
   * @param {IExercise} exercise Exercise to remove
   */
  const removeSet = React.useCallback(
    (exercise: IExercise) => {
      requestAnimationFrame(() => {
        setExercises(exercises.filter(e => e.id !== exercise.id));
      });
    },
    [exercises],
  );

  /**
   * Toggles the provided exercise's completion state and sets it in state
   * @param exercise
   */
  const toggleComplete = React.useCallback(
    (exercise: IExercise) => {
      const copy = exercises.map(e =>
        exercise.id !== e.id ? e : {...e, performed: !e.performed},
      );

      requestAnimationFrame(() => {
        setExercises(copy);
      });
    },
    [exercises],
  );

  /**
   * Adds the provided exercise to state
   * @param {IExercise} exercise Exercise to add
   */
  const addExercise = React.useCallback(
    (exercise: IExercise) => {
      requestAnimationFrame(() => {
        setExercises([...exercises, exercise]);
      });
    },
    [exercises],
  );

  /**
   * Removes the provided grouped exercise (and all exercises under it) from the state
   * @param {GroupedExercise} groupedExercise Exercise (by name) to remove
   */
  const removeExercise = React.useCallback(
    (groupedExercise: GroupedExercise) => {
      requestAnimationFrame(() => {
        setExercises([
          ...exercises.filter(e => e.exerciseName !== groupedExercise.name),
        ]);
      });
    },
    [exercises],
  );

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        setExercises: (e: IExercise[]) => setExercises(e),
        duplicateSet: (e: IExercise) => duplicateSet(e),
        removeSet: (e: IExercise) => removeSet(e),
        toggleComplete: (e: IExercise) => toggleComplete(e),
        addExercise: (e: IExercise) => addExercise(e),
        removeExercise: (e: GroupedExercise) => removeExercise(e),
      }}>
      {children}
    </ExerciseContext.Provider>
  );
}
