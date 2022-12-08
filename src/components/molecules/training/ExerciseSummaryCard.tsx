import React from 'react';
import {TrainingField} from '../../atoms/training/fields/TrainingField';
import {TrainingFieldHeader} from '../../atoms/training/fields/TrainingFieldHeader';
import {ExpandedPostTrainingCardSummaryActionStack} from '../../atoms/main/home/post/details/ExpandedPostTrainingSummaryActionStack';

import {
  getAdditionalExerciseNames,
  getAsGroupedExercises,
} from '../../../data/Training';

import {
  GroupedExercise,
  IExercise,
  ITrainingSession,
} from '../../../models/Training';

import {Box, Heading, Text, VStack, useColorModeValue} from 'native-base';

interface IExerciseSummaryCardProps {
  session: ITrainingSession;
}

export const ExerciseSummaryCard = ({
  session,
}: IExerciseSummaryCardProps): JSX.Element => {
  const groupedExercises = getAsGroupedExercises(session.exercises);

  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  const mutedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const cardBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const borderColor = useColorModeValue('apple.gray.300', 'apple.gray.800');

  /**
   * Returns an array of grouped exercise names
   */
  const getAdditionalNames = React.useCallback((exercise: IExercise) => {
    return getAdditionalExerciseNames(exercise);
  }, []);

  /**
   * Returns true if the provided grouped exercise has
   * additional exercises
   */
  const hasAdditionalNames = React.useCallback(
    (groupedExercise: GroupedExercise) => {
      return (
        groupedExercise.exercises[0].additionalExercises &&
        groupedExercise.exercises[0].additionalExercises.length > 0
      );
    },
    [],
  );

  return (
    <VStack mt={4} space={4} borderRadius={12}>
      {groupedExercises.map(groupedExercise => (
        <Box borderRadius={12} bgColor={cardBgColor} p={2}>
          <ExpandedPostTrainingCardSummaryActionStack />

          <Heading size={'md'} color={textColor}>
            {groupedExercise.name}
          </Heading>

          {hasAdditionalNames(groupedExercise) && (
            <Text
              fontSize={'sm'}
              fontWeight={'semibold'}
              color={mutedTextColor}>
              with{' '}
              {getAdditionalNames(groupedExercise.exercises[0])?.join(', ')}
            </Text>
          )}

          <TrainingFieldHeader data={groupedExercise.exercises[0]} />

          {groupedExercise.exercises.map((parentExercise, i) => (
            <Box
              w={'100%'}
              borderBottomColor={borderColor}
              borderBottomWidth={
                i + 1 < groupedExercise.exercises.length ? 1 : 0
              }>
              <TrainingField index={i} data={parentExercise} />

              {parentExercise.additionalExercises &&
                parentExercise.additionalExercises.map(
                  (additionalExercise, j) => (
                    <Box w={'100%'}>
                      {parentExercise.type !== additionalExercise.type && (
                        <TrainingFieldHeader
                          asAdditional={true}
                          data={additionalExercise}
                        />
                      )}

                      <TrainingField index={j} data={additionalExercise} />
                    </Box>
                  ),
                )}
            </Box>
          ))}
        </Box>
      ))}
    </VStack>
  );
};
