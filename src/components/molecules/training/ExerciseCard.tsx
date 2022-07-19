import React from 'react';
import {ExerciseType, GroupedExercise} from '../../../models/Training';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  AdditionalTrainingInput,
  ExerciseInputType,
  ParentTrainingInput,
} from '../../atoms/training/TrainingInput';

import {
  Box,
  Heading,
  HStack,
  IconButton,
  VStack,
  Text,
  Square,
  Button,
  Icon,
  useColorModeValue,
} from 'native-base';

interface IExerciseCardProps {
  groupedExercise: GroupedExercise;
  style?: {
    bgColor?: ColorType | string;
    textColor?: ColorType | string;
    borderColor?: ColorType | string;

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
  const {duplicateSet, removeExercise} = useExerciseContext();

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

  return (
    <Box
      w={'100%'}
      p={2}
      rounded={'12px'}
      bgColor={style?.bgColor ?? defaultBgColor}>
      <HStack w={'100%'} justifyContent={'space-between'}>
        <Heading size={'md'}>{groupedExercise.name}</Heading>

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
            <Box
              key={exercise.id}
              w={'100%'}
              borderBottomWidth={
                i < groupedExercise.exercises.length - 1 ? 1 : 0
              }
              borderBottomColor={style?.borderColor ?? defaultBorderColor}>
              <HStack key={`exercise-entry-${i}`} w={'100%'} py={1}>
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
                  <Text>4</Text>
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
                                ExerciseType.DISTANCE) && <Square w={'35%'} />}

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
                                performed={exercise.performed}
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
                                performed={exercise.performed}
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
                                performed={exercise.performed}
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
                                performed={exercise.performed}
                              />
                            )}

                            <Box w={'10%'}>
                              <Text>4</Text>
                            </Box>
                          </HStack>
                        );
                      },
                    )}
                  </VStack>
                )}
            </Box>
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
