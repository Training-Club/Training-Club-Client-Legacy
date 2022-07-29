import React from 'react';
import TrainingCheckbox from './TrainingCheckbox';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {ExerciseType, IExercise, ITrainable} from '../../../models/Training';

import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  AdditionalTrainingInput,
  ExerciseInputType,
  ParentTrainingInput,
} from './TrainingInput';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';

import {
  Box,
  HStack,
  Icon,
  Pressable,
  Square,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';
import {useAnimatedGestureHandler} from 'react-native-reanimated';

interface IExerciseCardInputProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  exercise: IExercise;
  index: number;
  onToggleComplete: (exercise: ITrainable) => void;
  onDeleteSet: (exercise: IExercise) => void;
  options?: {
    renderBorder?: boolean;
    swipeListThreshold?: number;
  };
}

const ExerciseCardInput = ({
  exercise,
  index,
  onToggleComplete,
  onDeleteSet,
  options,
}: IExerciseCardInputProps): JSX.Element => {
  const translateX = useSharedValue(0);

  const textColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('apple.gray.50', 'apple.gray.900');
  const deleteBgColor = useColorModeValue('apple.red.light', 'apple.red.dark');

  const borderBottomColor = useColorModeValue(
    'apple.gray.100',
    'apple.gray.800',
  );

  const swipeListThreshold = options?.swipeListThreshold ?? -100.0;
  const springConfig = React.useMemo(() => {
    return {stiffness: 100, overshootClamping: true, mass: 0.8};
  }, []);

  /**
   * Resets the delete swipe and sends request to state to remove
   * the set attached to this rendered instance
   */
  const handleDeleteSet = React.useCallback(() => {
    if (translateX.value !== 0.0) {
      translateX.value = withSpring(0, springConfig);
    }

    onDeleteSet(exercise);
  }, [exercise, onDeleteSet, springConfig, translateX]);

  const panGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        if (event.translationX > 0.0) {
          translateX.value = withSpring(0, springConfig);
          return;
        }

        if (
          translateX.value < swipeListThreshold ||
          translateX.value + event.translationX < swipeListThreshold
        ) {
          translateX.value = withSpring(swipeListThreshold, springConfig);
          return;
        }

        translateX.value = withSpring(event.translationX, springConfig);
      },

      onEnd: () => {
        if (translateX.value >= -10.0) {
          translateX.value = withSpring(0);
          return;
        }
      },
    });

  const swipeListStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <Box w={'100%'}>
      <PanGestureHandler
        onGestureEvent={panGestureHandler}
        activeOffsetX={[-10, 10]}>
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOut}
          style={[swipeListStyle]}>
          <Box
            key={exercise.id}
            w={'100%'}
            bgColor={bgColor}
            py={4}
            borderBottomWidth={options?.renderBorder ? 1 : 0}
            borderBottomColor={borderBottomColor}>
            <HStack>
              <Box w={'20%'}>
                <Text color={textColor} fontWeight={'semibold'} fontSize={16}>
                  {`Set ${index + 1}`}
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
                  setPerformed={onToggleComplete}
                />
              </Box>
            </HStack>

            {exercise.additionalExercises &&
              exercise.additionalExercises.length && (
                <VStack w={'100%'} space={2} mt={2}>
                  {exercise.additionalExercises.map((additionalExercise, j) => {
                    return (
                      <HStack
                        key={exercise.id + additionalExercise.exerciseName + j}>
                        <Square w={'20%'}>
                          {j === 0 && (
                            <Icon
                              as={MaterialIcons}
                              name={'subdirectory-arrow-right'}
                              size={6}
                              color={textColor}
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

                        {(additionalExercise.type === ExerciseType.DISTANCE ||
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
                            setPerformed={onToggleComplete}
                          />
                        </Box>
                      </HStack>
                    );
                  })}
                </VStack>
              )}
          </Box>
        </Animated.View>
      </PanGestureHandler>

      <Animated.View
        entering={FadeIn.delay(500)}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: -1,
          width: 72,
          height: '100%',
        }}>
        <Pressable onPress={handleDeleteSet}>
          <Square h={'100%'} bgColor={deleteBgColor}>
            <Text color={'white'} fontSize={'xs'} fontWeight={'semibold'}>
              Delete
            </Text>
          </Square>
        </Pressable>
      </Animated.View>
    </Box>
  );
};

export default ExerciseCardInput;
