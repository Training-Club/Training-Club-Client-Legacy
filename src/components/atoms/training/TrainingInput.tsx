import React from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import TrainingRepInput from './input/TrainingRepInput';
import TrainingDistanceInput from './input/TrainingDistanceInput';
import TrainingWeightInput from './input/TrainingWeightInput';
import TrainingTimeInput from './input/TrainingTimeInput';
import useExerciseStore from '../../../store/ExerciseStore';
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
    <Square w={'35%'}>
      {fieldType === ExerciseInputType.REPS && (
        <TrainingRepInput
          value={value.reps ?? 0}
          defaultValue={value.reps ?? 0}
          setValue={setValue}
          performed={performed}
          style={style}
        />
      )}

      {fieldType === ExerciseInputType.WEIGHT && (
        <TrainingWeightInput
          value={value.weight}
          defaultValue={value.weight?.value ?? 0.0}
          setValue={setValue}
          performed={performed}
          style={style}
        />
      )}

      {fieldType === ExerciseInputType.DISTANCE && (
        <TrainingDistanceInput
          value={value.distance}
          defaultValue={value.distance?.value ?? 0.0}
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
  const setParentField = useExerciseStore(state => state.setParentField);

  const setValue = (data: any) => {
    setParentField(fieldName, exercise, data);
  };

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
  const setAdditionalField = useExerciseStore(
    state => state.setAdditionalField,
  );

  const setValue = (data: any) => {
    setAdditionalField(fieldName, additionalExercise, parentExerciseId, data);
  };

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

/**
 * Custom memoization comparator to prevent excessive re-rendering of input fields
 *
 * @param {Readonly<IParentExerciseInputProps>} prevProps Current props
 * @param {Readonly<IParentExerciseInputProps>} nextProps Props about to be set
 */
const parentPropsAreEqual = (
  prevProps: Readonly<IParentExerciseInputProps>,
  nextProps: Readonly<IParentExerciseInputProps>,
) => {
  if (prevProps.performed !== nextProps.performed) {
    return false;
  }

  return prevProps.exercise.values === nextProps.exercise.values;
};

/**
 * Custom memoization comparator to prevent excessive re-rendering of input fields
 *
 * @param {Readonly<IAdditionalExerciseInputProps>} prevProps Current props
 * @param {Readonly<IAdditionalExerciseInputProps>} nextProps Props about to be set
 */
const additionalPropsAreEqual = (
  prevProps: Readonly<IAdditionalExerciseInputProps>,
  nextProps: Readonly<IAdditionalExerciseInputProps>,
) => {
  if (prevProps.performed !== nextProps.performed) {
    return false;
  }

  return (
    prevProps.additionalExercise.values === nextProps.additionalExercise.values
  );
};

export const ParentTrainingInput = React.memo(
  ParentExerciseInput,
  parentPropsAreEqual,
);

export const AdditionalTrainingInput = React.memo(
  AdditionalExerciseInput,
  additionalPropsAreEqual,
);
