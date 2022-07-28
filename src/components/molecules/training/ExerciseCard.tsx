import React from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import TrainingCheckbox from '../../atoms/training/TrainingCheckbox';
import TrainingPlateCounter from '../../atoms/training/TrainingPlateCounter';
import {getNextIncompleteExercise} from '../../../data/Training';
import {getPlateCount} from '../../../utils/PlateCounter';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import DarkActionsheetTheme from '../../organisms/design/themes/DarkActionsheetTheme';
import ExerciseOptionsActionsheet from './ExerciseOptionsActionsheet';
import {ListRenderItemInfo} from 'react-native';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import Animated, {SlideInLeft, SlideOutLeft} from 'react-native-reanimated';

import {
  ExerciseType,
  GroupedExercise,
  IExercise,
  ITrainable,
} from '../../../models/Training';

import {
  AdditionalTrainingInput,
  ExerciseInputType,
  ParentTrainingInput,
} from '../../atoms/training/TrainingInput';

import {
  DistanceMeasurement,
  MeasurementSystem,
} from '../../../models/Measurement';

import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Square,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';

interface IExerciseCardProps {
  groupedExercise: GroupedExercise;
  style?: {
    bgColor?: ColorType | string;
    textColor?: ColorType | string;
    borderColor?: ColorType | string;
    topSpacing?: boolean;
    bottomSpacing?: boolean;

    addSetButton?: {
      backgroundColor?: ColorType | string;
      pressedBackgroundColor?: ColorType | string;
      iconColor?: ColorType | string;
    };

    closeButton?: {
      backgroundColor?: ColorType | string;
      pressedBackgroundColor?: ColorType | string;
      iconColor?: ColorType | string;
    };

    exerciseSettingsButton?: {
      backgroundColor?: ColorType | string;
      textColor?: ColorType | string;
    };

    deleteButton?: {
      backgroundColor?: ColorType | string;
      textColor?: ColorType | string;
    };
  };
}

const ExerciseCard = ({
  groupedExercise,
  style,
}: IExerciseCardProps): JSX.Element => {
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

  const nextIncompleteExercise = React.useMemo(
    () => getNextIncompleteExercise(groupedExercise.exercises),
    [groupedExercise],
  );

  const plateCounterData = React.useMemo(() => {
    return nextIncompleteExercise &&
      (nextIncompleteExercise.type === ExerciseType.WEIGHTED_TIME ||
        nextIncompleteExercise.type === ExerciseType.WEIGHTED_REPS) &&
      nextIncompleteExercise.values.weight
      ? getPlateCount(nextIncompleteExercise.values.weight.value)
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

  const snapPoints = React.useMemo(() => ['90%'], []);
  const defaultTextColor = useColorModeValue('black', 'white');
  const defaultBgColor = useColorModeValue('apple.gray.50', 'apple.gray.900');

  const defaultBorderColor = useColorModeValue(
    'apple.gray.200',
    'apple.gray.700',
  );

  const defaultAddSetButtonBackgroundColor = useColorModeValue(
    'black',
    'white',
  );

  const defaultAddSetButtonPressedBackgroundColor = useColorModeValue(
    'apple.gray.800',
    'apple.gray.50',
  );

  const defaultAddSetButtonIconColor = useColorModeValue('white', 'black');

  const defaultCloseButtonBackgroundColor = useColorModeValue(
    'apple.gray.100',
    'apple.gray.800',
  );

  const defaultCloseButtonPressedBackgroundColor = useColorModeValue(
    'apple.gray.300',
    'apple.gray.600',
  );

  const defaultCloseButtonIconColor = useColorModeValue(
    'apple.gray.800',
    'apple.gray.100',
  );

  const defaultDeleteButtonColor = useColorModeValue(
    'apple.red.light',
    'apple.red.dark',
  );

  const defaultSettingsButtonColor = useColorModeValue(
    'apple.gray.100',
    'apple.gray.800',
  );

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

  const handleExerciseOptionsActionsheet = React.useCallback(() => {
    if (!actionSheetRef || !actionSheetRef.current) {
      return;
    }

    setActionSheetConfig({
      index: -1,
      backgroundComponent: DarkActionsheetTheme,
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

    actionSheetRef.current.snapToIndex(0);
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

  const closeRow = (rowMap: RowMap<IExercise>, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<IExercise>, rowKey: any) => {
    closeRow(rowMap, rowKey);

    const exercise: IExercise | undefined = groupedExercise.exercises.find(
      e => e.id === rowKey,
    );

    if (exercise) {
      handleDeleteSet(exercise);
    }
  };

  const renderItem = (exercise: ListRenderItemInfo<IExercise>) => {
    return (
      <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
        <Box
          key={exercise.item.id}
          w={'100%'}
          bgColor={style?.bgColor ?? defaultBgColor}
          py={1}
          borderBottomColor={style?.borderColor ?? defaultBorderColor}
          borderBottomWidth={
            exercise.index < groupedExercise.exercises.length - 1 ? 1 : 0
          }>
          <HStack key={`exercise-entry-${exercise.index}`} w={'100%'} py={2}>
            <Box w={'20%'}>
              <Text fontWeight={'semibold'} fontSize={16}>
                Set {exercise.index + 1}
              </Text>
            </Box>

            {(exercise.item.type === ExerciseType.REPS ||
              exercise.item.type === ExerciseType.TIME ||
              exercise.item.type === ExerciseType.DISTANCE) && (
              <Square w={'35%'} />
            )}

            {(exercise.item.type === ExerciseType.WEIGHTED_REPS ||
              exercise.item.type === ExerciseType.REPS) && (
              <ParentTrainingInput
                exercise={exercise.item}
                exerciseType={exercise.item.type}
                fieldName={'reps'}
                fieldType={ExerciseInputType.REPS}
                performed={exercise.item.performed}
              />
            )}

            {(exercise.item.type === ExerciseType.WEIGHTED_TIME ||
              exercise.item.type === ExerciseType.WEIGHTED_REPS) && (
              <ParentTrainingInput
                exercise={exercise.item}
                exerciseType={exercise.item.type}
                fieldName={'weight'}
                fieldType={ExerciseInputType.WEIGHT}
                performed={exercise.item.performed}
              />
            )}

            {(exercise.item.type === ExerciseType.DISTANCE ||
              exercise.item.type === ExerciseType.DISTANCE_TIME) && (
              <ParentTrainingInput
                exercise={exercise.item}
                exerciseType={exercise.item.type}
                fieldName={'distance'}
                fieldType={ExerciseInputType.DISTANCE}
                performed={exercise.item.performed}
              />
            )}

            {(exercise.item.type === ExerciseType.TIME ||
              exercise.item.type === ExerciseType.WEIGHTED_TIME ||
              exercise.item.type === ExerciseType.DISTANCE_TIME) && (
              <ParentTrainingInput
                exercise={exercise.item}
                exerciseType={exercise.item.type}
                fieldName={'time'}
                fieldType={ExerciseInputType.TIME}
                performed={exercise.item.performed}
              />
            )}

            <Box w={'10%'}>
              <TrainingCheckbox
                exercise={exercise.item}
                performed={exercise.item.performed}
                setPerformed={handleToggleComplete}
              />
            </Box>
          </HStack>

          {exercise.item.additionalExercises &&
            exercise.item.additionalExercises.length && (
              <VStack w={'100%'} space={2}>
                {exercise.item.additionalExercises.map(
                  (additionalExercise, j) => {
                    return (
                      <HStack key={`ae-${j}`} w={'100%'} py={1}>
                        <Square w={'20%'}>
                          {j === 0 && (
                            <Icon
                              as={MaterialIcons}
                              name={'subdirectory-arrow-right'}
                              size={6}
                              color={style?.textColor ?? defaultTextColor}
                            />
                          )}
                        </Square>

                        {(additionalExercise.type === ExerciseType.REPS ||
                          additionalExercise.type === ExerciseType.TIME ||
                          additionalExercise.type ===
                            ExerciseType.DISTANCE) && <Square w={'35%'} />}

                        {(additionalExercise.type ===
                          ExerciseType.WEIGHTED_REPS ||
                          additionalExercise.type === ExerciseType.REPS) && (
                          <AdditionalTrainingInput
                            additionalExercise={additionalExercise}
                            parentExerciseId={exercise.item.id}
                            exerciseType={exercise.item.type}
                            fieldName={'reps'}
                            fieldType={ExerciseInputType.REPS}
                            performed={additionalExercise.performed}
                          />
                        )}

                        {(additionalExercise.type ===
                          ExerciseType.WEIGHTED_TIME ||
                          additionalExercise.type ===
                            ExerciseType.WEIGHTED_REPS) && (
                          <AdditionalTrainingInput
                            additionalExercise={additionalExercise}
                            parentExerciseId={exercise.item.id}
                            exerciseType={exercise.item.type}
                            fieldName={'weight'}
                            fieldType={ExerciseInputType.WEIGHT}
                            performed={additionalExercise.performed}
                          />
                        )}

                        {(additionalExercise.type === ExerciseType.DISTANCE ||
                          additionalExercise.type ===
                            ExerciseType.DISTANCE_TIME) && (
                          <AdditionalTrainingInput
                            additionalExercise={additionalExercise}
                            parentExerciseId={exercise.item.id}
                            exerciseType={exercise.item.type}
                            fieldName={'distance'}
                            fieldType={ExerciseInputType.DISTANCE}
                            performed={additionalExercise.performed}
                          />
                        )}

                        {(additionalExercise.type === ExerciseType.TIME ||
                          additionalExercise.type ===
                            ExerciseType.WEIGHTED_TIME ||
                          additionalExercise.type ===
                            ExerciseType.DISTANCE_TIME) && (
                          <AdditionalTrainingInput
                            additionalExercise={additionalExercise}
                            parentExerciseId={exercise.item.id}
                            exerciseType={exercise.item.type}
                            fieldName={'time'}
                            fieldType={ExerciseInputType.TIME}
                            performed={additionalExercise.performed}
                          />
                        )}

                        <Box w={'10%'}>
                          <TrainingCheckbox
                            exercise={additionalExercise}
                            performed={additionalExercise.performed}
                            parentExerciseId={exercise.item.id}
                            setPerformed={handleToggleComplete}
                          />
                        </Box>
                      </HStack>
                    );
                  },
                )}
              </VStack>
            )}
        </Box>
      </Animated.View>
    );
  };

  const renderHiddenItem = (
    exercise: ListRenderItemInfo<IExercise>,
    rowMap: RowMap<IExercise>,
  ) => {
    return (
      <HStack position={'absolute'} right={0} top={0} height={'100%'}>
        <Pressable onPress={() => console.log('settings')}>
          <Square
            w={16}
            h={'100%'}
            bgColor={
              style?.exerciseSettingsButton?.backgroundColor ??
              defaultSettingsButtonColor
            }>
            <VStack alignItems={'center'}>
              <Icon
                as={MaterialIcons}
                name={'more-horiz'}
                size={4}
                color={
                  style?.exerciseSettingsButton?.textColor ?? defaultTextColor
                }
              />
              <Text
                fontWeight={'semibold'}
                fontSize={'xs'}
                color={style?.deleteButton?.textColor ?? defaultTextColor}>
                More
              </Text>
            </VStack>
          </Square>
        </Pressable>

        <Pressable onPress={() => deleteRow(rowMap, exercise.item.id)}>
          <Square
            w={16}
            h={'100%'}
            bgColor={
              style?.deleteButton?.backgroundColor ?? defaultDeleteButtonColor
            }>
            <VStack alignItems={'center'}>
              <Icon
                as={MaterialIcons}
                name={'delete'}
                size={4}
                color={'white'}
              />
              <Text
                fontWeight={'semibold'}
                fontSize={'xs'}
                color={style?.deleteButton?.textColor ?? 'white'}>
                Delete
              </Text>
            </VStack>
          </Square>
        </Pressable>
      </HStack>
    );
  };

  return (
    <Box
      w={'100%'}
      p={4}
      rounded={'12px'}
      bgColor={style?.bgColor ?? defaultBgColor}
      mt={style?.topSpacing ? 8 : 0}
      mb={style?.bottomSpacing ? 32 : 0}>
      <HStack w={'100%'} justifyContent={'space-between'}>
        <Heading size={'md'} isTruncated={true} maxW={'100%'} pr={4}>
          {groupedExercise.name}
        </Heading>

        <IconButton
          testID={'exercise-card-close-btn'}
          position={'absolute'}
          right={0}
          size={'sm'}
          rounded={'full'}
          variant={'solid'}
          zIndex={999}
          bgColor={
            style?.closeButton?.backgroundColor ??
            defaultCloseButtonBackgroundColor
          }
          _pressed={{
            bgColor:
              style?.closeButton?.pressedBackgroundColor ??
              defaultCloseButtonPressedBackgroundColor,
          }}
          _icon={{
            as: MaterialIcons,
            name: 'more-horiz',
            color: style?.closeButton?.iconColor ?? defaultCloseButtonIconColor,
          }}
          onPress={() => {
            handleExerciseOptionsActionsheet();
          }}
        />
      </HStack>

      {additionalExerciseName && (
        <Box w={'100%'}>
          <Heading size={'xs'} fontWeight={'semibold'}>
            {`with ${additionalExerciseName}`}
          </Heading>
        </Box>
      )}

      <SwipeListView
        keyExtractor={item => item.id}
        data={groupedExercise.exercises}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-125}
        style={{marginTop: 8}}
      />

      <HStack
        w={'100%'}
        justifyContent={'space-between'}
        space={4}
        mt={4}
        alignItems={'center'}>
        <Button
          variant={'basic'}
          h={'36px'}
          w={'30%'}
          rounded={'full'}
          size={'sm'}
          bgColor={
            style?.addSetButton?.backgroundColor ??
            defaultAddSetButtonBackgroundColor
          }
          _pressed={{
            bgColor:
              style?.addSetButton?.pressedBackgroundColor ??
              defaultAddSetButtonPressedBackgroundColor,
          }}
          leftIcon={
            <Icon
              as={MaterialIcons}
              name={'add'}
              size={4}
              color={
                style?.addSetButton?.iconColor ?? defaultAddSetButtonIconColor
              }
            />
          }
          onPress={() =>
            duplicateSet(
              groupedExercise.exercises[groupedExercise.exercises.length - 1],
            )
          }>
          Add Set
        </Button>

        {plateCounterData && <TrainingPlateCounter data={plateCounterData} />}
      </HStack>
    </Box>
  );
};

export default React.memo(ExerciseCard);
