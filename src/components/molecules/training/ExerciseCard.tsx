import React from 'react';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import DarkActionsheetTheme from '../../organisms/design/themes/DarkActionsheetTheme';
import ExerciseOptionsActionsheet from './ExerciseOptionsActionsheet';
import {getPlateCount} from '../../../utils/PlateCounter';
import {getNextIncompleteExercise} from '../../../data/Training';
import Handle from '../../organisms/design/themes/Handle';
import ExerciseCardInput from '../../atoms/training/ExerciseCardInput';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import ExerciseCardHeader from '../../atoms/training/ExerciseCardHeader';
import ExerciseCardFooter from '../../atoms/training/ExerciseCardFooter';
import Animated, {Layout} from 'react-native-reanimated';
import {useColorModeValue, View} from 'native-base';

import {
  DistanceMeasurement,
  MeasurementSystem,
} from '../../../models/Measurement';

import {
  ExerciseType,
  GroupedExercise,
  IExercise,
  ITrainable,
} from '../../../models/Training';

interface IExerciseCardProps {
  groupedExercise: GroupedExercise;
}

const ExerciseCard = ({groupedExercise}: IExerciseCardProps): JSX.Element => {
  const {actionSheetRef, setActionSheetConfig} = useActionsheetContext();

  const {
    duplicateSet,
    toggleComplete,
    toggleDistanceMeasurement,
    toggleMeasurement,
    toggleMilliseconds,
    removeSet,
    removeGroupedExercise,
  } = useExerciseContext();

  const snapPoints = React.useMemo(() => ['90%'], []);

  const bgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const nextIncompleteExercise = React.useMemo(
    () => getNextIncompleteExercise(groupedExercise.exercises),
    [groupedExercise],
  );

  // TODO: REFACTOR PLEASE
  const plateCounterData = React.useMemo(() => {
    return nextIncompleteExercise &&
      (nextIncompleteExercise.type === ExerciseType.WEIGHTED_TIME ||
        nextIncompleteExercise.type === ExerciseType.WEIGHTED_REPS) &&
      nextIncompleteExercise.values.weight
      ? getPlateCount(
          nextIncompleteExercise.values.weight.value,
          nextIncompleteExercise.values.weight.measurement ??
            MeasurementSystem.IMPERIAL,
        )
      : undefined;
  }, [nextIncompleteExercise]);

  const additionalExerciseName = React.useMemo(() => {
    const exerciseNames: string[] = [];

    if (nextIncompleteExercise && nextIncompleteExercise.additionalExercises) {
      nextIncompleteExercise.additionalExercises.forEach(additionalExercise => {
        if (
          !exerciseNames.find(
            existingName => additionalExercise.exerciseName === existingName,
          )
        ) {
          exerciseNames.push(additionalExercise.exerciseName);
        }
      });

      return exerciseNames.join(' + ');
    }

    return undefined;
  }, [nextIncompleteExercise]);

  const handleToggleComplete = React.useCallback(
    (exercise: ITrainable, parentExerciseId?: string) => {
      toggleComplete(exercise, parentExerciseId);
    },
    [toggleComplete],
  );

  /**
   * Sends duplicate exercise request for newest exercise in grouped array
   */
  const handleDuplicateSet = React.useCallback(() => {
    duplicateSet(
      groupedExercise.exercises[groupedExercise.exercises.length - 1],
    );

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, duplicateSet, groupedExercise.exercises]);

  /**
   * Sends remove exercise request for entire grouped exercise
   */
  const handleRemoveGroupedExercise = React.useCallback(() => {
    removeGroupedExercise(groupedExercise);

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, groupedExercise, removeGroupedExercise]);

  /**
   * Sends millisecond toggle request for the entire grouped exercise array
   */
  const handleToggleMilliseconds = React.useCallback(() => {
    if (
      !groupedExercise.exercises[0].values ||
      !groupedExercise.exercises[0].values.time
    ) {
      return;
    }

    toggleMilliseconds(
      groupedExercise,
      !groupedExercise.exercises[0].values.time.timeRenderMillis,
    );

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, groupedExercise, toggleMilliseconds]);

  /**
   * Sends distance measurement toggle request for the entire grouped exercise array
   */
  const handleToggleDistance = React.useCallback(
    (measurement: DistanceMeasurement) => {
      if (
        !groupedExercise.exercises[0].values ||
        !groupedExercise.exercises[0].values.distance
      ) {
        return;
      }

      toggleDistanceMeasurement(groupedExercise, measurement);

      if (actionSheetRef && actionSheetRef.current) {
        actionSheetRef.current.close();
      }
    },
    [actionSheetRef, groupedExercise, toggleDistanceMeasurement],
  );

  /**
   * Send measurement toggle request for the entire grouped exercise array
   */
  const handleToggleMeasurement = React.useCallback(
    (measurement: MeasurementSystem) => {
      if (
        !groupedExercise.exercises[0].values ||
        !groupedExercise.exercises[0].values.weight
      ) {
        return;
      }

      toggleMeasurement(groupedExercise, measurement);

      if (actionSheetRef && actionSheetRef.current) {
        actionSheetRef.current.close();
      }
    },
    [actionSheetRef, groupedExercise, toggleMeasurement],
  );

  /**
   * Sends delete request for a specific exercise
   */
  const handleDeleteSet = React.useCallback(
    (exercise: IExercise) => {
      removeSet(exercise);
    },
    [removeSet],
  );

  const handleSettingsButtonPress = React.useCallback(() => {
    if (!actionSheetRef || !actionSheetRef.current) {
      return;
    }

    setActionSheetConfig({
      index: -1,
      backgroundComponent: DarkActionsheetTheme,
      handleComponent: Handle,
      snapPoints: snapPoints,
      children: (
        <ExerciseOptionsActionsheet
          groupedExercise={groupedExercise}
          onDuplicateSet={handleDuplicateSet}
          onRemoveExercise={handleRemoveGroupedExercise}
          onUpdateDistance={handleToggleDistance}
          onUpdateMeasurement={handleToggleMeasurement}
          onMillisecondToggle={handleToggleMilliseconds}
        />
      ),
    });
  }, [
    actionSheetRef,
    groupedExercise,
    handleDuplicateSet,
    handleRemoveGroupedExercise,
    handleToggleDistance,
    handleToggleMeasurement,
    handleToggleMilliseconds,
    setActionSheetConfig,
    snapPoints,
  ]);

  return (
    <View bgColor={bgColor} h={'auto'} rounded={'12px'} p={4} mb={8}>
      <ExerciseCardHeader
        onSettingsPress={() => handleSettingsButtonPress()}
        title={groupedExercise.name}
        subtitle={
          additionalExerciseName ? `with ${additionalExerciseName}` : undefined
        }
      />

      <Animated.View layout={Layout.springify()}>
        {groupedExercise.exercises.map((exercise, i) => {
          return (
            <ExerciseCardInput
              index={i}
              exercise={exercise}
              onToggleComplete={handleToggleComplete}
              onDeleteSet={handleDeleteSet}
              options={{
                renderBorder: i < groupedExercise.exercises.length - 1,
                swipeListThreshold: -80.0,
              }}
            />
          );
        })}
      </Animated.View>

      <ExerciseCardFooter
        plateCounterData={plateCounterData}
        onAddSetPress={() =>
          duplicateSet(
            groupedExercise.exercises[groupedExercise.exercises.length - 1],
          )
        }
      />
    </View>
  );
};

export default React.memo(ExerciseCard);
