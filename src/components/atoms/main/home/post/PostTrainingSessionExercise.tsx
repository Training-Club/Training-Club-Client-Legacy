import React from 'react';
import {getAdditionalExerciseNames} from '../../../../../data/Training';
import {ExerciseType, GroupedExercise} from '../../../../../models/Training';
import {MeasurementSystem} from '../../../../../models/Measurement';

import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from 'native-base';

interface IPostTrainingSessionExercise {
  groupedExercise: GroupedExercise;
}

export const PostTrainingSessionExercise = ({
  groupedExercise,
}: IPostTrainingSessionExercise): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');
  const bgColor = useColorModeValue('white', 'core.backgroundAccent.dark');

  const valueStyling = {
    fontWeight: 'semibold',
    color: textColor,
  };

  const valueSuffixStyling = {
    color: textColor,
  };

  /**
   * Returns true if the provided exercise has additional
   * exercises attached, adding further functionality
   */
  const hasAdditionalExercises = React.useCallback(() => {
    return (
      groupedExercise.exercises[0].additionalExercises &&
      groupedExercise.exercises[0].additionalExercises.length > 0
    );
  }, [groupedExercise.exercises]);

  /**
   * Returns a comma separated list if additional exercise names
   */
  const getAdditionalExercises = React.useCallback(() => {
    if (!hasAdditionalExercises) {
      return undefined;
    }

    const additionalNames: string[] = getAdditionalExerciseNames(
      groupedExercise.exercises[0],
    );

    if (additionalNames && additionalNames.length > 0) {
      return additionalNames.join(', ');
    }

    return undefined;
  }, [groupedExercise.exercises, hasAdditionalExercises]);

  return (
    <Box w={'100%'} p={2} bgColor={bgColor} borderRadius={'12px'}>
      <Heading color={textColor} size={'sm'}>
        {groupedExercise.name}
      </Heading>

      {getAdditionalExercises() && (
        <Text
          color={textColor}
          fontSize={'xs'}>{`with ${getAdditionalExercises()}`}</Text>
      )}

      <VStack space={2}>
        {groupedExercise.exercises.map((exercise, i) => (
          <Box w={'100%'} key={exercise.id}>
            <HStack w={'100%'} justifyContent={'space-between'}>
              <Box w={'33%'}>
                <Text fontWeight={'semibold'}>{`Set ${i + 1}`}</Text>
              </Box>

              {exercise.type === ExerciseType.REPS ||
                exercise.type === ExerciseType.TIME ||
                (exercise.type === ExerciseType.DISTANCE && <Box w={'33%'} />)}

              {(exercise.type === ExerciseType.REPS ||
                exercise.type === ExerciseType.WEIGHTED_REPS) && (
                <Box w={'33%'}>
                  <HStack space={1}>
                    <Text {...valueStyling}>{exercise.values.reps}</Text>
                    <Text {...valueSuffixStyling}>reps</Text>
                  </HStack>
                </Box>
              )}

              {(exercise.type === ExerciseType.DISTANCE ||
                exercise.type === ExerciseType.DISTANCE_TIME) && (
                <Box w={'33%'}>
                  <HStack space={1}>
                    <Text {...valueStyling}>
                      {exercise.values.distance?.value}
                    </Text>
                    <Text {...valueSuffixStyling}>
                      {exercise.values.distance?.measurement}
                    </Text>
                  </HStack>
                </Box>
              )}

              {(exercise.type === ExerciseType.WEIGHTED_REPS ||
                exercise.type === ExerciseType.WEIGHTED_TIME) && (
                <Box w={'33%'}>
                  <HStack space={1}>
                    <Text {...valueStyling}>
                      {exercise.values.weight?.value}
                    </Text>
                    <Text {...valueSuffixStyling}>{`${
                      exercise.values.weight?.measurement ===
                      MeasurementSystem.IMPERIAL
                        ? 'lbs'
                        : 'kg'
                    }`}</Text>
                  </HStack>
                </Box>
              )}

              {(exercise.type === ExerciseType.TIME ||
                exercise.type === ExerciseType.WEIGHTED_TIME ||
                exercise.type === ExerciseType.DISTANCE_TIME) && (
                <Box w={'33%'} h={'24px'}>
                  <HStack>
                    <Text {...valueStyling}>
                      {exercise.values.time?.value.hours &&
                      exercise.values.time?.value.hours > 0
                        ? exercise.values.time?.value.hours
                        : '00'}
                    </Text>

                    <Text {...valueSuffixStyling}>:</Text>

                    <Text {...valueStyling}>
                      {exercise.values.time?.value.minutes &&
                      exercise.values.time?.value.minutes > 0
                        ? exercise.values.time?.value.minutes
                        : '00'}
                    </Text>

                    <Text {...valueSuffixStyling}>:</Text>

                    <Text {...valueStyling}>
                      {exercise.values.time?.value.seconds &&
                      exercise.values.time?.value.seconds > 0
                        ? exercise.values.time?.value.seconds
                        : '00'}
                    </Text>

                    {exercise.values.time?.timeRenderMillis && (
                      <>
                        <Text {...valueSuffixStyling}>:</Text>

                        <Text {...valueStyling}>
                          {exercise.values.time?.value.milliseconds &&
                          exercise.values.time?.value.milliseconds > 0
                            ? exercise.values.time?.value.milliseconds
                            : '000'}
                        </Text>
                      </>
                    )}
                  </HStack>
                </Box>
              )}
            </HStack>

            {exercise.additionalExercises &&
              exercise.additionalExercises.map(additionalExercise => (
                <HStack
                  key={additionalExercise.exerciseName}
                  justifyContent={'space-between'}
                  w={'100%'}>
                  <Box w={'33%'} />

                  {additionalExercise.type === ExerciseType.REPS ||
                    additionalExercise.type === ExerciseType.TIME ||
                    (additionalExercise.type === ExerciseType.DISTANCE && (
                      <Box w={'33%'} />
                    ))}

                  {(additionalExercise.type === ExerciseType.REPS ||
                    additionalExercise.type === ExerciseType.WEIGHTED_REPS) && (
                    <Box w={'33%'}>
                      <HStack space={1}>
                        <Text {...valueStyling}>
                          {additionalExercise.values.reps}
                        </Text>
                        <Text {...valueSuffixStyling}>reps</Text>
                      </HStack>
                    </Box>
                  )}

                  {(additionalExercise.type === ExerciseType.WEIGHTED_REPS ||
                    additionalExercise.type === ExerciseType.WEIGHTED_TIME) && (
                    <Box w={'33%'}>
                      <HStack space={1}>
                        <Text {...valueStyling}>
                          {additionalExercise.values.weight?.value}
                        </Text>
                        <Text {...valueSuffixStyling}>{`${
                          exercise.values.weight?.measurement ===
                          MeasurementSystem.IMPERIAL
                            ? 'lbs'
                            : 'kg'
                        }`}</Text>
                      </HStack>
                    </Box>
                  )}

                  {(additionalExercise.type === ExerciseType.TIME ||
                    additionalExercise.type === ExerciseType.WEIGHTED_TIME ||
                    additionalExercise.type === ExerciseType.DISTANCE_TIME) && (
                    <Box w={'33%'} h={'24px'} />
                  )}
                </HStack>
              ))}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
