import React from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import TrainingCheckbox from '../../atoms/training/TrainingCheckbox';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {getNextIncompleteExercise} from '../../../data/Training';

import Animated, {
  Layout,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

import {
  ExerciseType,
  GroupedExercise,
  ITrainable,
} from '../../../models/Training';

import {
  AdditionalTrainingInput,
  ExerciseInputType,
  ParentTrainingInput,
} from '../../atoms/training/TrainingInput';

import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
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
  };
}

const ExerciseCard = ({
  groupedExercise,
  style,
}: IExerciseCardProps): JSX.Element => {
  const {duplicateSet, removeExercise, toggleComplete} = useExerciseContext();

  const nextIncompleteExercise = React.useMemo(
    () => getNextIncompleteExercise(groupedExercise.exercises),
    [groupedExercise],
  );

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

  const handleToggleComplete = React.useCallback(
    (exercise: ITrainable, parentExerciseId?: string) => {
      toggleComplete(exercise, parentExerciseId);
    },
    [toggleComplete],
  );

  return (
    <Box
      w={'100%'}
      p={4}
      rounded={'12px'}
      bgColor={style?.bgColor ?? defaultBgColor}
      mt={style?.topSpacing ? 8 : 0}
      mb={style?.bottomSpacing ? 32 : 0}>
      <HStack w={'100%'} justifyContent={'space-between'}>
        <Heading size={'md'} isTruncated={true} maxW={'100%'}>
          {groupedExercise.name}
        </Heading>

        <IconButton
          testID={'exercise-card-close-btn'}
          position={'absolute'}
          right={0}
          size={'sm'}
          rounded={'full'}
          variant={'solid'}
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
            removeExercise(groupedExercise);
          }}
        />
      </HStack>

      <VStack w={'100%'} mt={4} space={2}>
        {groupedExercise.exercises.map((exercise, i) => {
          return (
            <Animated.View
              entering={SlideInRight.delay(100)}
              exiting={SlideOutRight}
              layout={Layout.springify()}>
              <Box
                key={exercise.id}
                w={'100%'}
                pb={i < groupedExercise.exercises.length - 1 ? 2 : 0}
                borderBottomWidth={
                  i < groupedExercise.exercises.length - 1 ? 1 : 0
                }
                borderBottomColor={style?.borderColor ?? defaultBorderColor}>
                <HStack key={`exercise-entry-${i}`} w={'100%'} py={2}>
                  <Box w={'20%'}>
                    <Text fontWeight={'semibold'} fontSize={16}>
                      Set {i + 1}
                    </Text>
                  </Box>

                  {(exercise.type === ExerciseType.REPS ||
                    exercise.type === ExerciseType.TIME ||
                    exercise.type === ExerciseType.DISTANCE) && (
                    <Square w={'35%'} />
                  )}

                  {(exercise.type === ExerciseType.WEIGHTED_REPS ||
                    exercise.type === ExerciseType.REPS) && (
                    <ParentTrainingInput
                      exercise={exercise}
                      exerciseType={exercise.type}
                      fieldName={'reps'}
                      fieldType={ExerciseInputType.REPS}
                      performed={exercise.performed}
                    />
                  )}

                  {(exercise.type === ExerciseType.WEIGHTED_TIME ||
                    exercise.type === ExerciseType.WEIGHTED_REPS) && (
                    <ParentTrainingInput
                      exercise={exercise}
                      exerciseType={exercise.type}
                      fieldName={'weight'}
                      fieldType={ExerciseInputType.WEIGHT}
                      performed={exercise.performed}
                    />
                  )}

                  {(exercise.type === ExerciseType.DISTANCE ||
                    exercise.type === ExerciseType.DISTANCE_TIME) && (
                    <ParentTrainingInput
                      exercise={exercise}
                      exerciseType={exercise.type}
                      fieldName={'distance'}
                      fieldType={ExerciseInputType.DISTANCE}
                      performed={exercise.performed}
                    />
                  )}

                  {(exercise.type === ExerciseType.TIME ||
                    exercise.type === ExerciseType.WEIGHTED_TIME ||
                    exercise.type === ExerciseType.DISTANCE_TIME) && (
                    <ParentTrainingInput
                      exercise={exercise}
                      exerciseType={exercise.type}
                      fieldName={'time'}
                      fieldType={ExerciseInputType.TIME}
                      performed={exercise.performed}
                    />
                  )}

                  <Box w={'10%'}>
                    <TrainingCheckbox
                      exercise={exercise}
                      performed={exercise.performed}
                      setPerformed={handleToggleComplete}
                    />
                  </Box>
                </HStack>

                {exercise.additionalExercises &&
                  exercise.additionalExercises.length && (
                    <VStack w={'100%'} space={2}>
                      {exercise.additionalExercises.map(
                        (additionalExercise, j) => {
                          return (
                            <HStack key={`ae-${j}`} w={'100%'} py={1}>
                              <Square w={'20%'}>
                                <Icon
                                  as={MaterialIcons}
                                  name={'subdirectory-arrow-right'}
                                  size={6}
                                  color={style?.textColor ?? defaultTextColor}
                                />
                              </Square>

                              {(additionalExercise.type === ExerciseType.REPS ||
                                additionalExercise.type === ExerciseType.TIME ||
                                additionalExercise.type ===
                                  ExerciseType.DISTANCE) && (
                                <Square w={'35%'} />
                              )}

                              {(additionalExercise.type ===
                                ExerciseType.WEIGHTED_REPS ||
                                additionalExercise.type ===
                                  ExerciseType.REPS) && (
                                <AdditionalTrainingInput
                                  additionalExercise={additionalExercise}
                                  parentExerciseId={exercise.id}
                                  exerciseType={exercise.type}
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
                                  parentExerciseId={exercise.id}
                                  exerciseType={exercise.type}
                                  fieldName={'weight'}
                                  fieldType={ExerciseInputType.WEIGHT}
                                  performed={additionalExercise.performed}
                                />
                              )}

                              {(additionalExercise.type ===
                                ExerciseType.DISTANCE ||
                                additionalExercise.type ===
                                  ExerciseType.DISTANCE_TIME) && (
                                <AdditionalTrainingInput
                                  additionalExercise={additionalExercise}
                                  parentExerciseId={exercise.id}
                                  exerciseType={exercise.type}
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
                                  parentExerciseId={exercise.id}
                                  exerciseType={exercise.type}
                                  fieldName={'time'}
                                  fieldType={ExerciseInputType.TIME}
                                  performed={additionalExercise.performed}
                                />
                              )}

                              <Box w={'10%'}>
                                <TrainingCheckbox
                                  exercise={additionalExercise}
                                  performed={additionalExercise.performed}
                                  parentExerciseId={exercise.id}
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
        })}
      </VStack>

      <Button
        variant={'basic'}
        w={'100px'}
        mt={4}
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
    </Box>
  );
};

export default React.memo(ExerciseCard);
