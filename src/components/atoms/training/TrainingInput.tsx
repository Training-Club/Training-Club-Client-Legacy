import React from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import TrainingRepInput from './input/TrainingRepInput';
import TrainingDistanceInput from './input/TrainingDistanceInput';
import TrainingWeightInput from './input/TrainingWeightInput';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import TrainingTimeInput from './input/TrainingTimeInput';
import {Square, useColorModeValue} from 'native-base';

import {
  ExerciseType,
  ExerciseValue,
  IAdditionalExercise,
  IExercise,
} from '../../../models/Training';

interface ITrainingInputControllerProps extends ITrainingInputField {
  value: ExerciseValue;
  setValue: (e: any) => void;
}

export enum ExerciseInputType {
  REPS,
  WEIGHT,
  TIME,
  DISTANCE,
}

export interface ITrainingInputField {
  exerciseType: ExerciseType;
  fieldName: string;
  fieldType: ExerciseInputType;
  performed: boolean;
}

export interface IParentExerciseInputProps extends ITrainingInputField {
  exercise: IExercise;
}

export interface IAdditionalExerciseInputProps extends ITrainingInputField {
  additionalExercise: IAdditionalExercise;
  parentExerciseId: string;
}

export interface ITrainingInputProps<T> {
  value: T;
  setValue: (e: T) => void;
  defaultValue?: number;
  performed: boolean;
  style?: {
    textColor?: ColorType | string;
    mutedTextColor?: ColorType | string;
    bgColor?: ColorType | string;
  };
}

const TrainingInputController = ({
  fieldType,
  performed,
  value,
  setValue,
}: ITrainingInputControllerProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');
  const mutedTextColor = useColorModeValue('apple.gray.400', 'apple.gray.600');

  const style = {
    textColor: textColor,
    mutedTextColor: mutedTextColor,
  };

  return (
    <Square w={'30%'}>
      {fieldType === ExerciseInputType.REPS && (
        <TrainingRepInput
          value={value.reps ?? 0}
          defaultValue={0}
          setValue={setValue}
          performed={performed}
          style={style}
        />
      )}

      {fieldType === ExerciseInputType.WEIGHT && (
        <TrainingWeightInput
          value={value.weight}
          defaultValue={0.0}
          setValue={setValue}
          performed={performed}
          style={style}
        />
      )}

      {fieldType === ExerciseInputType.DISTANCE && (
        <TrainingDistanceInput
          value={value.distance}
          defaultValue={0}
          setValue={setValue}
          performed={performed}
          style={style}
        />
      )}

      {fieldType === ExerciseInputType.TIME && (
        <TrainingTimeInput
          value={value.time}
          setValue={setValue}
          performed={performed}
          style={style}
        />
      )}
    </Square>
  );
};

const ParentExerciseInput = ({
  exercise,
  exerciseType,
  fieldName,
  fieldType,
  performed,
}: IParentExerciseInputProps): JSX.Element => {
  const {exercises, setExercises} = useExerciseContext();

  const setValue = React.useCallback(
    (data: any) => {
      const copy: IExercise[] = exercises.map(item =>
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

      setExercises(copy);
    },
    [exercise.id, exercises, fieldName, setExercises],
  );

  return (
    <TrainingInputController
      value={exercise.values}
      setValue={setValue}
      exerciseType={exerciseType}
      fieldName={fieldName}
      fieldType={fieldType}
      performed={performed}
    />
  );
};

const AdditionalExerciseInput = ({
  additionalExercise,
  parentExerciseId,
  exerciseType,
  fieldName,
  fieldType,
  performed,
}: IAdditionalExerciseInputProps): JSX.Element => {
  const {exercises, setExercises} = useExerciseContext();

  const setValue = React.useCallback(
    (data: any) => {
      const parentSearch: IExercise | undefined = exercises.find(
        e => e.id === parentExerciseId,
      );

      if (!parentSearch || !parentSearch.additionalExercises) {
        return;
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

      const parentCopy: IExercise[] = exercises.map(item =>
        parentExerciseId !== item.id
          ? item
          : {
              ...item,
              additional: childCopy,
            },
      );

      setExercises(parentCopy);
    },
    [
      additionalExercise.exerciseName,
      exercises,
      fieldName,
      parentExerciseId,
      setExercises,
    ],
  );

  return (
    <TrainingInputController
      value={additionalExercise.values}
      setValue={setValue}
      exerciseType={exerciseType}
      fieldName={fieldName}
      fieldType={fieldType}
      performed={performed}
    />
  );
};

export const ParentTrainingInput = React.memo(ParentExerciseInput);
export const AdditionalTrainingInput = React.memo(AdditionalExerciseInput);
