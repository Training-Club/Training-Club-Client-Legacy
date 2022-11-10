import React from 'react';
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
import useExerciseStore from '../../../store/ExerciseStore';

interface IExerciseCardProps {
  groupedExercise: GroupedExercise;
}

const ExerciseCard = ({groupedExercise}: IExerciseCardProps): JSX.Element => {
  const {actionSheetRef, setActionSheetConfig} = useActionsheetContext();
  const removeSet = useExerciseStore(state => state.removeSet);
  const duplicateSet = useExerciseStore(state => state.duplicateSet);
  const toggleComplete = useExerciseStore(state => state.toggleComplete);

  const removeGroupedExercise = useExerciseStore(
    state => state.removeGroupedExercise,
  );

  const toggleDistanceMeasurement = useExerciseStore(
    state => state.toggleDistanceMeasurement,
  );

  const toggleMeasurement = useExerciseStore(
    state => state.toggleWeightMeasurement,
  );

  const toggleMilliseconds = useExerciseStore(
    state => state.toggleMilliseconds,
  );

  const togglePlateCounter = useExerciseStore(
    state => state.togglePlateCounter,
  );

  const snapPoints = React.useMemo(() => ['50%', '90%'], []);

  const bgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const nextIncompleteExercise = React.useMemo(
    () => getNextIncompleteExercise(groupedExercise.exercises),
    [groupedExercise],
  );

  /**
   * Builds Plate Counter Response and returns plate counter data
   */
  const plateCounterData = React.useMemo(() => {
    if (!nextIncompleteExercise) {
      return undefined;
    }

    if (
      nextIncompleteExercise.type !== ExerciseType.WEIGHTED_REPS &&
      nextIncompleteExercise.type !== ExerciseType.WEIGHTED_TIME
    ) {
      return undefined;
    }

    if (
      !nextIncompleteExercise.values.weight ||
      !nextIncompleteExercise.values.weight.plateCounterEnabled ||
      !nextIncompleteExercise.values.weight.measurement
    ) {
      return undefined;
    }

    return getPlateCount(
      nextIncompleteExercise.values.weight.value,
      nextIncompleteExercise.values.weight.measurement,
    );
  }, [nextIncompleteExercise]);

  /**
   * Returns a comma separated list of additional exercise names
   */
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

  /**
   * Sends an exercise toggle complete request
   */
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
        console.warn('skipped because distance field null');
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
   * Sends a plate counter toggle request for the entire grouped exercise array
   */
  const handlePlateCounterToggle = React.useCallback(() => {
    togglePlateCounter(groupedExercise);

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, groupedExercise, togglePlateCounter]);

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
          onPlateCounterToggle={handlePlateCounterToggle}
          onMillisecondToggle={handleToggleMilliseconds}
        />
      ),
    });
  }, [
    actionSheetRef,
    groupedExercise,
    handleDuplicateSet,
    handlePlateCounterToggle,
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

const propsAreEqual = (
  prevProps: Readonly<IExerciseCardProps>,
  nextProps: Readonly<IExerciseCardProps>,
): boolean => {
  if (prevProps.groupedExercise.name !== nextProps.groupedExercise.name) {
    return false;
  }

  if (
    prevProps.groupedExercise.exercises.length !==
    nextProps.groupedExercise.exercises.length
  ) {
    return false;
  }

  for (let i = 0; i < prevProps.groupedExercise.exercises.length; i++) {
    const prevExercise = prevProps.groupedExercise.exercises[i];
    const nextExercise = nextProps.groupedExercise.exercises[i];

    const prevString = JSON.stringify(prevExercise);
    const nextString = JSON.stringify(nextExercise);

    if (prevString !== nextString) {
      return false;
    }
  }

  return true;
};

export default React.memo(ExerciseCard, propsAreEqual);
