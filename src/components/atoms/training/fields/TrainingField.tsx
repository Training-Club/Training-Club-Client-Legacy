import React from 'react';
import {MeasurementSystem} from '../../../../models/Measurement';
import {FormatTimeField} from '../../../../utils/StringUtil';

import {
  ExerciseType,
  ITrainable,
  isAdditionalExercise,
} from '../../../../models/Training';

import {Box, HStack, Text, IBoxProps, useColorModeValue} from 'native-base';

interface ITrainingFieldProps {
  index: number;
  data: ITrainable;
  boxProps?: IBoxProps;
}

export const TrainingField = ({
  index,
  data,
  boxProps,
}: ITrainingFieldProps): JSX.Element => {
  const isAdditional = isAdditionalExercise(data);

  const textColor = useColorModeValue('core.text.light', 'core.text.dark');
  const mutedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const FirstField = (): JSX.Element | null => {
    if (
      data.type === ExerciseType.REPS ||
      data.type === ExerciseType.WEIGHTED_REPS
    ) {
      return (
        <HStack space={1}>
          <Text color={textColor} fontWeight={'semibold'}>
            {data.values.reps}
          </Text>

          <Text color={mutedTextColor}>reps</Text>
        </HStack>
      );
    }

    if (
      data.type === ExerciseType.DISTANCE_TIME ||
      data.type === ExerciseType.DISTANCE
    ) {
      return (
        <HStack space={1}>
          <Text color={textColor} fontWeight={'semibold'}>
            {data.values.distance?.value}
          </Text>

          <Text color={mutedTextColor}>
            {data.values.distance?.measurement}
          </Text>
        </HStack>
      );
    }

    return null;
  };

  // TODO: Create time format field formatter
  const SecondField = (): JSX.Element | null => {
    if (
      data.type === ExerciseType.WEIGHTED_TIME ||
      data.type === ExerciseType.WEIGHTED_REPS
    ) {
      return (
        <HStack space={1}>
          <Text color={textColor} fontWeight={'semibold'}>
            {data.values.weight?.value}
          </Text>

          <Text color={mutedTextColor}>
            {data.values.weight?.measurement === MeasurementSystem.IMPERIAL
              ? 'lbs'
              : 'kg'}
          </Text>
        </HStack>
      );
    }

    if (data.type === ExerciseType.DISTANCE_TIME) {
      const prettyTime = FormatTimeField(
        data.values.time ?? {
          value: {hours: 0, minutes: 0, seconds: 0, milliseconds: 0},
          timeRenderMillis: false,
        },
      );

      return (
        <HStack space={1}>
          <Text color={textColor} fontWeight={'semibold'}>
            {prettyTime.hours}:{prettyTime.minutes}:{prettyTime.seconds}.
            {prettyTime.milliseconds}
          </Text>
        </HStack>
      );
    }

    return null;
  };

  return (
    <HStack w={'100%'} alignItems={'center'} py={2} {...boxProps}>
      <Box w={'20%'}>{!isAdditional && <Text>Set {index + 1}</Text>}</Box>

      <Box w={'40%'}>
        <FirstField />
      </Box>

      <Box w={'40%'}>
        <SecondField />
      </Box>
    </HStack>
  );
};
