import React from 'react';
import {ExerciseContext} from './ExerciseContext';
import {nanoid} from 'nanoid/non-secure';
import {
  GroupedExercise,
  IAdditionalExercise,
  IExercise,
  isAdditionalExercise,
  ITrainable,
} from '../../models/Training';

interface IExerciseContextProviderProps {
  children: any;
}

export function ExerciseContextProvider({
  children,
}: IExerciseContextProviderProps) {
  const [exercises, setExercises] = React.useState<IExercise[]>([]);

  /**
   * Sets parent exercise fields in the exercise context
   */
  const setParentField = React.useCallback(
    (fieldName: string, exercise: IExercise, data: any) => {
      setExercises(prevState => {
        return prevState.map(item =>
          exercise.id !== item.id
            ? item
            : {
                ...item,
                values: {
                  ...item.values,
                  [fieldName]: data,
                },
              },
        );
      });
    },
    [],
  );

  /**
   * Sets additional exercise fields in the exercise context
   */
  const setAdditionalField = React.useCallback(
    (
      fieldName: string,
      additionalExercise: IAdditionalExercise,
      parentExerciseId: string,
      data: any,
    ) => {
      setExercises(prevState => {
        const parentSearch: IExercise | undefined = prevState.find(
          e => e.id === parentExerciseId,
        );

        if (!parentSearch || !parentSearch.additionalExercises) {
          return prevState;
        }

        const childCopy: IAdditionalExercise[] =
          parentSearch.additionalExercises.map(item =>
            item.exerciseName !== additionalExercise.exerciseName
              ? item
              : {
                  ...item,
                  values: {
                    ...item.values,
                    [fieldName]: data,
                  },
                },
          );

        return prevState.map(item =>
          parentExerciseId !== item.id
            ? item
            : {
                ...item,
                additionalExercises: childCopy,
              },
        );
      });
    },
    [],
  );

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
    (exercise: ITrainable, parentExerciseId?: string) => {
      requestAnimationFrame(() => {
        setExercises(prevState => {
          if (!isAdditionalExercise(exercise)) {
            const asExercise = exercise as IExercise;

            return prevState.map(e =>
              asExercise.id !== e.id ? e : {...e, performed: !e.performed},
            );
          }

          const asAdditional = exercise as IAdditionalExercise;
          const parentSearch: IExercise | undefined = prevState.find(
            e => e.id === parentExerciseId,
          );

          if (!parentSearch || !parentSearch.additionalExercises) {
            return prevState;
          }

          const childCopy: IAdditionalExercise[] =
            parentSearch.additionalExercises.map(item =>
              item.exerciseName !== asAdditional.exerciseName
                ? item
                : {
                    ...item,
                    performed: !item.performed,
                  },
            );

          return prevState.map(item =>
            parentExerciseId !== item.id
              ? item
              : {...item, additionalExercises: childCopy},
          );
        });
      });
    },
    [],
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
        toggleComplete: (e: ITrainable, p?: string) => toggleComplete(e, p),
        addExercise: (e: IExercise) => addExercise(e),
        removeExercise: (e: GroupedExercise) => removeExercise(e),
        setAdditionalField: (
          fieldName: string,
          additionalExercise: IAdditionalExercise,
          parentExerciseId: string,
          data: any,
        ) =>
          setAdditionalField(
            fieldName,
            additionalExercise,
            parentExerciseId,
            data,
          ),
        setParentField: (fieldName: string, exercise: IExercise, data: any) =>
          setParentField(fieldName, exercise, data),
      }}>
      {children}
    </ExerciseContext.Provider>
  );
}
