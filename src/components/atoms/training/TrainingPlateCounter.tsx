import React from 'react';
import {IPlateCountResponse} from '../../../utils/PlateCounter';
import {MeasurementSystem} from '../../../models/Measurement';

import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  FadeInUp,
  FadeOutUp,
  Keyframe,
} from 'react-native-reanimated';

import {Box, Heading, HStack, Text, useColorModeValue} from 'native-base';

interface ITrainingPlateCounterProps {
  data: IPlateCountResponse;
}

const TrainingPlateCounter = ({
  data,
}: ITrainingPlateCounterProps): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  const mutedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const suffix = data.measurement === MeasurementSystem.IMPERIAL ? 'lb' : 'kg';

  const entering:
    | typeof BaseAnimationBuilder
    | BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe
    | undefined = FadeInUp.springify();

  const exiting:
    | typeof BaseAnimationBuilder
    | BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe
    | undefined = FadeOutUp.springify();

  const multiplierStyle = {
    fontWeight: 'bold',
    fontSize: 12,
    color: textColor,
  };

  const weightStyle = {
    fontWeight: 'bold',
    fontSize: 16,
    color: textColor,
  };

  const suffixStyle = {
    fontSize: 16,
    fontWeight: 'semibold',
    color: mutedTextColor,
  };

  return (
    <Box position={'relative'} w={'70%'}>
      <Heading size={'xs'}>Plate Counter</Heading>

      <HStack w={'100%'} flexWrap={'wrap'}>
        {!!(data.fortyFivePlates && data.fortyFivePlates > 0) && (
          <Animated.View
            entering={entering}
            exiting={exiting}
            style={{width: '33.333%'}}>
            <HStack space={0.5} alignItems={'center'} w={'100%'}>
              <Text {...multiplierStyle}>x{data.fortyFivePlates}</Text>
              <Text {...weightStyle}>45</Text>
              <Text {...suffixStyle}>{suffix}</Text>
            </HStack>
          </Animated.View>
        )}

        {!!(data.twentyFivePlates && data.twentyFivePlates > 0) && (
          <Animated.View
            entering={entering}
            exiting={exiting}
            style={{width: '33.333%'}}>
            <HStack space={0.5} alignItems={'center'} w={'100%'}>
              <Text {...multiplierStyle}>x{data.twentyFivePlates}</Text>
              <Text {...weightStyle}>25</Text>
              <Text {...suffixStyle}>{suffix}</Text>
            </HStack>
          </Animated.View>
        )}

        {!!(data.twentyPlates && data.twentyPlates > 0) && (
          <Animated.View
            entering={entering}
            exiting={exiting}
            style={{width: '33.333%'}}>
            <HStack space={0.5} alignItems={'center'} w={'100%'}>
              <Text {...multiplierStyle}>x{data.twentyPlates}</Text>
              <Text {...weightStyle}>20</Text>
              <Text {...suffixStyle}>{suffix}</Text>
            </HStack>
          </Animated.View>
        )}

        {!!(data.tenPlates && data.tenPlates > 0) && (
          <Animated.View
            entering={entering}
            exiting={exiting}
            style={{width: '33.333%'}}>
            <HStack space={0.5} alignItems={'center'} w={'100%'}>
              <Text {...multiplierStyle}>x{data.tenPlates}</Text>
              <Text {...weightStyle}>10</Text>
              <Text {...suffixStyle}>{suffix}</Text>
            </HStack>
          </Animated.View>
        )}

        {!!(data.fivePlates && data.fivePlates > 0) && (
          <Animated.View
            entering={entering}
            exiting={exiting}
            style={{width: '33.333%'}}>
            <HStack space={0.5} alignItems={'center'} w={'100%'}>
              <Text {...multiplierStyle}>x{data.fivePlates}</Text>
              <Text {...weightStyle}>5</Text>
              <Text {...suffixStyle}>{suffix}</Text>
            </HStack>
          </Animated.View>
        )}

        {!!(data.twoPtFivePlates && data.twoPtFivePlates > 0) && (
          <Animated.View
            entering={entering}
            exiting={exiting}
            style={{width: '33.333%'}}>
            <HStack space={0.5} alignItems={'center'} w={'100%'}>
              <Text {...multiplierStyle}>x{data.twoPtFivePlates}</Text>
              <Text {...weightStyle}>2.5</Text>
              <Text {...suffixStyle}>{suffix}</Text>
            </HStack>
          </Animated.View>
        )}
      </HStack>
    </Box>
  );
};

export default React.memo(TrainingPlateCounter);
