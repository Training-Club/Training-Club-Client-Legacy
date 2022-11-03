import create from 'zustand';
import {nanoid} from 'nanoid/non-secure';

import {
  GroupedExercise,
  IAdditionalExercise,
  IExercise,
  isAdditionalExercise,
  ITrainable,
} from '../models/Training';

import {
  DistanceMeasurement,
  getConvertedDistance,
  getConvertedWeight,
  MeasurementSystem,
} from '../models/Measurement';

interface ExerciseState {
  exercises: IExercise[];
  addSet: (exercise: IExercise) => void;
  duplicateSet: (exercise: IExercise) => void;
  removeSet: (exercise: IExercise) => void;
  removeGroupedExercise: (groupedExercise: GroupedExercise) => void;

  setParentField: (fieldName: string, exercise: IExercise, data: any) => void;
  setAdditionalField: (
    fieldName: string,
    additionalExercise: IAdditionalExercise,
    parentExerciseId: string,
    data: any,
  ) => void;

  toggleComplete: (exercise: ITrainable, parentExerciseId?: string) => void;
  togglePlateCounter: (exercise: GroupedExercise) => void;
  toggleMilliseconds: (exercise: GroupedExercise, value: boolean) => void;
  toggleWeightMeasurement: (
    exercise: GroupedExercise,
    measurement: MeasurementSystem,
  ) => void;

  toggleDistanceMeasurement: (
    exercise: GroupedExercise,
    value: DistanceMeasurement,
  ) => void;
}

const useExerciseStore = create<ExerciseState>()(set => ({
  exercises: [],
  addSet: e => set(state => ({exercises: [...state.exercises, e]})),
  duplicateSet: e =>
    set(state => ({
      exercises: [...state.exercises, duplicateExercise(e)],
    })),
  removeSet: e =>
    set(state => ({
      exercises: state.exercises.filter(
        prevExercise => prevExercise.id !== e.id,
      ),
    })),
  removeGroupedExercise: ge =>
    set(state => ({
      exercises: state.exercises.filter(
        prevExercise => prevExercise.exerciseName !== ge.name,
      ),
    })),
  setParentField: (fn, e, d) =>
    set(state => ({
      exercises: state.exercises.map(prevExercise =>
        prevExercise.id !== e.id ? prevExercise : setParentField(fn, e, d),
      ),
    })),
  setAdditionalField: (fn, ae, pid, d) =>
    set(state => ({
      exercises: setAdditionalField(state.exercises, ae, fn, pid, d),
    })),
  toggleComplete: (e, pid) =>
    set(state => ({exercises: toggleComplete(state.exercises, e, pid)})),
  togglePlateCounter: ge =>
    set(state => ({exercises: togglePlateCounter(state.exercises, ge)})),
  toggleMilliseconds: ge =>
    set(state => ({exercises: toggleMilliseconds(state.exercises, ge)})),
  toggleDistanceMeasurement: (ge, m) =>
    set(state => ({
      exercises: toggleDistanceMeasurement(state.exercises, ge, m),
    })),
  toggleWeightMeasurement: (ge, m) =>
    set(state => ({
      exercises: toggleWeightMeasurementSystem(state.exercises, ge, m),
    })),
}));

/**
 * Helper function to duplicate an exercise, copy all of its fields and set a
 * new id, added date, and performed to false.
 *
 * @param exercise Exercise to duplicate
 */
function duplicateExercise(exercise: IExercise): IExercise {
  const duplicate: IExercise = {
    ...exercise,
    id: nanoid(5),
    addedAt: new Date(),
    performed: false,
  };

  return duplicate;
}

/**
 * Helper function to duplicate an exercise, copy all of its fields and set
 * a new field for the provided fieldname with the provided data
 *
 * @param fieldName Fieldname to update
 * @param exercise Exercise to update
 * @param data Data to set at fieldname
 */
function setParentField(
  fieldName: string,
  exercise: IExercise,
  data: any,
): IExercise {
  const duplicate: IExercise = {
    ...exercise,
    values: {
      ...exercise.values,
      [fieldName]: data,
    },
  };

  return duplicate;
}

/**
 * Helper function to duplicate an exercise, copy all of its fields and map through
 * its additional exercises to set the fieldname and data to the provided params
 *
 * @param exercises Previpus Exercise State
 * @param additionalExercise Additional Exercise to Update
 * @param fieldName Field name to set
 * @param parentExerciseId Parent exercise id
 * @param data Data to set at the provided fieldname
 */
function setAdditionalField(
  exercises: IExercise[],
  additionalExercise: IAdditionalExercise,
  fieldName: string,
  parentExerciseId: string,
  data: any,
): IExercise[] {
  const parentExercise = exercises.find(e => e.id === parentExerciseId);

  if (!parentExercise || !parentExercise.additionalExercises) {
    return exercises;
  }

  const childCopy: IAdditionalExercise[] =
    parentExercise.additionalExercises.map(item =>
      item.exerciseName !== additionalExercise.exerciseName
        ? item
        : {...item, values: {...item.values, [fieldName]: data}},
    );

  return exercises.map(item =>
    parentExerciseId !== item.id
      ? item
      : {...item, additionalExercises: childCopy},
  );
}

/**
 * Helper function that toggles the 'performed' field for the provided exercise
 *
 * Function accepts the generic ITrainable interface and will traverse additional
 * exercise fields if provided as an Additional Exercise
 *
 * @param exercises Previous exercise state
 * @param exercise Exercise to update
 * @param parentExerciseId Parent exercise id
 */
function toggleComplete(
  exercises: IExercise[],
  exercise: ITrainable,
  parentExerciseId?: string,
): IExercise[] {
  if (!isAdditionalExercise(exercise)) {
    const asExercise = exercise as IExercise;

    return exercises.map(e =>
      asExercise.id !== e.id ? e : {...e, performed: !e.performed},
    );
  }

  const asAdditional = exercise as IAdditionalExercise;
  const parentSearch: IExercise | undefined = exercises.find(
    e => e.id === parentExerciseId,
  );

  if (!parentSearch || !parentSearch.additionalExercises) {
    return exercises;
  }

  const childCopy: IAdditionalExercise[] = parentSearch.additionalExercises.map(
    item =>
      item.exerciseName !== asAdditional.exerciseName
        ? item
        : {
            ...item,
            performed: !item.performed,
          },
  );

  return exercises.map(item =>
    parentExerciseId !== item.id
      ? item
      : {...item, additionalExercises: childCopy},
  );
}

/**
 * Helper function to toggle the plate counter for all exercises attached to a grouped exercise
 *
 * @param exercises Previous Exercise State
 * @param groupedExercise Grouped Exercise to update
 */
function togglePlateCounter(
  exercises: IExercise[],
  groupedExercise: GroupedExercise,
): IExercise[] {
  return exercises.map(prevExercise =>
    groupedExercise.exercises.find(ge => ge.id !== prevExercise.id)
      ? prevExercise
      : {
          ...prevExercise,
          values: {
            ...prevExercise.values,
            weight: {
              measurement: prevExercise.values.weight?.measurement,
              value: prevExercise.values.weight?.value ?? 0,
              plateCounterEnabled:
                !prevExercise.values.weight?.plateCounterEnabled ?? true,
            },
          },
        },
  );
}

/**
 * Helper function that toggles milliseconds display for entire grouped exercises
 *
 * @param exercises Previous exercise state
 * @param groupedExercise Grouped exercise to perform toggle on
 */
function toggleMilliseconds(
  exercises: IExercise[],
  groupedExercise: GroupedExercise,
): IExercise[] {
  return exercises.map(prevExercise =>
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
                milliseconds: prevExercise.values.time?.value.milliseconds ?? 0,
              },
              timeRenderMillis: !prevExercise.values.time?.timeRenderMillis,
            },
          },
        },
  );
}

/**
 * Helper function that toggles the distance measurement for the provided group exercise
 *
 * @param exercises Previous exercise state
 * @param groupedExercise Grouped Exercise
 * @param measurement Measurement to update to
 */
function toggleDistanceMeasurement(
  exercises: IExercise[],
  groupedExercise: GroupedExercise,
  measurement: DistanceMeasurement,
): IExercise[] {
  return exercises.map(prevExercise =>
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
                prevExercise.values.distance!.measurement ?? measurement,
                measurement,
              ),
            },
          },
        },
  );
}

/**
 * Helper function to set the weight measurement system for the provided grouped exercise
 *
 * @param exercises Previous exercise state
 * @param groupedExercise Grouped exercise
 * @param measurement Measurement system
 */
function toggleWeightMeasurementSystem(
  exercises: IExercise[],
  groupedExercise: GroupedExercise,
  measurement: MeasurementSystem,
): IExercise[] {
  console.log(measurement);

  return exercises.map(prevExercise =>
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
}

export default useExerciseStore;
