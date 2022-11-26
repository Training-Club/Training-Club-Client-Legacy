import React from 'react';
import Animated from 'react-native-reanimated';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  FadeOut,
  SequencedTransition,
  SlideInRight,
} from 'react-native-reanimated';

import {
  HStack,
  Icon,
  Pressable,
  Square,
  Text,
  useColorModeValue,
} from 'native-base';

interface IChipProps {
  text: string;
  onPress: () => void;
  style?: {
    bgColor?: ColorType | string;
    textColor?: ColorType | string;
  };
}

export const Chip = ({text, onPress, style}: IChipProps): JSX.Element => {
  const defaultBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

  return (
    <Animated.View
      entering={SlideInRight}
      layout={SequencedTransition.delay(300)}
      exiting={FadeOut.duration(250)}>
      <Pressable onPress={onPress}>
        <Square
          bgColor={style?.bgColor ?? defaultBgColor}
          mt={2}
          py={1}
          px={3}
          minW={16}
          borderRadius={'full'}>
          <HStack space={1} justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'xs'} color={style?.textColor ?? defaultTextColor}>
              {text}
            </Text>

            <Icon
              as={MaterialIcons}
              name={'close'}
              size={4}
              color={style?.textColor ?? defaultTextColor}
            />
          </HStack>
        </Square>
      </Pressable>
    </Animated.View>
  );
};
