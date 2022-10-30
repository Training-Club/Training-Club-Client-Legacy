import React from 'react';
import {ExerciseContext} from './ExerciseContext';
import {nanoid} from 'nanoid/non-secure';
import {
  DistanceMeasurement,
  getConvertedDistance,
  getConvertedWeight,
  MeasurementSystem,
} from '../../models/Measurement';

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
      requestAnimationFrame(() => {
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
      requestAnimationFrame(() => {
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
      });
    },
    [],
  );

  /**
   * Duplicates the provided exercise and adds it to state
   * @param {IExercise} exercise Exercise to duplicate
   */
  const duplicateSet = React.useCallback((exercise: IExercise) => {
    requestAnimationFrame(() => {
      setExercises(prevState => {
        const copy: IExercise = {
          ...exercise,
          id: nanoid(5),
          addedAt: new Date(),
          performed: false,
        };

        return [...prevState, copy];
      });
    });
  }, []);

  /**
   * Removes the provided exercise set from state
   * @param {IExercise} exercise Exercise to remove
   */
  const removeSet = React.useCallback((exercise: IExercise) => {
    requestAnimationFrame(() => {
      setExercises(prevState => {
        return prevState.filter(e => e.id !== exercise.id);
      });
    });
  }, []);

  /**
   * Toggles time in milliseconds for an entire grouped exercise
   *
   * This function will iterate and update every exercise in the
   * Grouped Exercise instance
   *
   * @param {GroupedExercise} groupedExercise Grouped Exercise to iterate over
   * @param {boolean} value Value to set timeRenderMillis field to
   */
  const toggleMilliseconds = React.useCallback(
    (groupedExercise: GroupedExercise, value: boolean) => {
      requestAnimationFrame(() => {
        setExercises(prevState => {
          return prevState.map(prevExercise =>
            groupedExercise.exercises.find(ge => ge.id !== prevExercise.id)
              ? prevExercise
              : {
                  ...prevExercise,
                  values: {
                    ...prevExercise.values,
                    time: {
                      value: {
                        hours: prevExercise.values.time?.value.hours ?? 0,
                        minutes: prevExercise.values.time?.value.minutes ?? 0,
                        seconds: prevExercise.values.time?.value.seconds ?? 0,
                        milliseconds:
                          prevExercise.values.time?.value.milliseconds ?? 0,
                      },
                      timeRenderMillis: value,
                    },
                  },
                },
          );
        });
      });
    },
    [],
  );

  /**
   * Toggles weight measurement system for whole grouped exercise
   *
   * This function will iterate and update every exercise in the
   * Grouped Exercise instance
   *
   * @param {GroupedExercise} groupedExercise Grouped Exercise to iterate over
   * @param {MeasurementSystem} value Value to set measurement to
   */
  const toggleMeasurementSystem = React.useCallback(
    (groupedExercise: GroupedExercise, measurement: MeasurementSystem) => {
      requestAnimationFrame(() => {
        setExercises(prevState => {
          return prevState.map(prevExercise =>
            groupedExercise.exercises.find(ge => ge.id !== prevExercise.id)
              ? prevExercise
              : {
                  ...prevExercise,
                  values: {
                    ...prevExercise.values,
                    weight: {
                      measurement: measurement,
                      value:
                        prevExercise.values.weight &&
                        prevExercise.values.weight.value &&
                        prevExercise.values.weight.measurement
                          ? getConvertedWeight(
                              prevExercise.values.weight.value,
                              prevExercise.values.weight.measurement,
                            )
                          : 0,
                    },
                  },
                },
          );
        });
      });
    },
    [],
  );

  /**
   * Toggles time in milliseconds for an entire grouped exercise
   *
   * This function will iterate and update every exercise in the
   * Grouped Exercise instance
   *
   * TODO: REFACTOR PLEASE
   *
   * @param {GroupedExercise} groupedExercise Grouped Exercise to iterate over
   * @param {DistanceMeasurement} value Value to set measurement to
   */
  const toggleDistanceMeasurement = React.useCallback(
    (groupedExercise: GroupedExercise, measurement: DistanceMeasurement) => {
      requestAnimationFrame(() => {
        setExercises(prevState => {
          return prevState.map(prevExercise =>
            groupedExercise.exercises.find(ge => ge.id !== prevExercise.id)
              ? prevExercise
              : {
                  ...prevExercise,
                  values: {
                    ...prevExercise.values,
                    distance: {
                      measurement: measurement,
                      value: getConvertedDistance(
                        prevExercise.values.distance!.value,
                        prevExercise.values.distance!.measurement ??
                          measurement,
                        measurement,
                      ),
                    },
                  },
                },
          );
        });
      });
    },
    [],
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
  const addExercise = React.useCallback((exercise: IExercise) => {
    requestAnimationFrame(() => {
      setExercises(prevState => {
        return [...prevState, exercise];
      });
    });
  }, []);

  /**
   * Removes the provided grouped exercise (and all exercises under it) from the state
   * @param {GroupedExercise} groupedExercise Exercise (by name) to remove
   */
  const removeGroupedExercise = React.useCallback(
    (groupedExercise: GroupedExercise) => {
      requestAnimationFrame(() => {
        setExercises(prevState => {
          return [
            ...prevState.filter(e => e.exerciseName !== groupedExercise.name),
          ];
        });
      });
    },
    [],
  );

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        setExercises: (e: IExercise[]) => setExercises(e),
        duplicateSet: (e: IExercise) => duplicateSet(e),
        removeSet: (e: IExercise) => removeSet(e),
        toggleComplete: (e: ITrainable, p?: string) => toggleComplete(e, p),
        toggleMilliseconds: (e: GroupedExercise, v: boolean) =>
          toggleMilliseconds(e, v),
        toggleMeasurement: (e: GroupedExercise, m: MeasurementSystem) =>
          toggleMeasurementSystem(e, m),
        toggleDistanceMeasurement: (
          e: GroupedExercise,
          m: DistanceMeasurement,
        ) => toggleDistanceMeasurement(e, m),
        addExercise: (e: IExercise) => addExercise(e),
        removeGroupedExercise: (e: GroupedExercise) => removeGroupedExercise(e),
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
