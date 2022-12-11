import React from 'react';
import {ExerciseType, ITrainable} from '../../../../models/Training';
import {Box, HStack, Text, useColorModeValue} from 'native-base';

interface ITrainingFieldHeaderProps {
  data: ITrainable;
  asAdditional?: boolean;
}

export const TrainingFieldHeader = ({
  data,
  asAdditional = false,
}: ITrainingFieldHeaderProps): JSX.Element => {
  const hasTwoFields =
    data.type === ExerciseType.DISTANCE_TIME ||
    data.type === ExerciseType.WEIGHTED_TIME ||
    data.type === ExerciseType.WEIGHTED_REPS;

  const mutedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const getFirstFieldName = React.useCallback(() => {
    switch (data.type) {
      case ExerciseType.REPS:
      case ExerciseType.WEIGHTED_REPS:
        return 'Reps';
      case ExerciseType.DISTANCE_TIME:
      case ExerciseType.DISTANCE:
        return 'Distance';
    }

    return null;
  }, [data.type]);

  const getSecondFieldName = React.useCallback(() => {
    switch (data.type) {
      case ExerciseType.WEIGHTED_REPS:
      case ExerciseType.WEIGHTED_TIME:
        return 'Weight';
      case ExerciseType.DISTANCE_TIME:
        return 'Time';
    }

    return null;
  }, [data.type]);

  return (
    <HStack w={'100%'} mt={asAdditional ? 0 : 2}>
      <Box w={'20%'}>
        {!asAdditional && (
          <Text color={mutedTextColor} fontWeight={'semibold'}>
            Set #
          </Text>
        )}
      </Box>

      <Box w={'40%'}>
        <Text color={mutedTextColor} fontWeight={'semibold'}>
          {getFirstFieldName()}
        </Text>
      </Box>

      {hasTwoFields && (
        <Box w={'40%'}>
          <Text color={mutedTextColor} fontWeight={'semibold'}>
            {getSecondFieldName()}
          </Text>
        </Box>
      )}
    </HStack>
  );
};
