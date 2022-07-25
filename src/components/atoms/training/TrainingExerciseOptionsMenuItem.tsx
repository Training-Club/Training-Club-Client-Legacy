import React from 'react';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  Pressable,
  Square,
  Text,
  useColorMode,
  useColorModeValue,
} from 'native-base';

interface ITrainingExerciseOptionsMenuItem {
  isSelected: boolean;
  onSelect: () => void;
  text: string;
}

const TrainingExerciseOptionsMenuItem = ({
  isSelected,
  onSelect,
  text,
}: ITrainingExerciseOptionsMenuItem): JSX.Element => {
  const {colorMode} = useColorMode();
  const bgTransition = useSharedValue(isSelected ? 1 : 0);

  const startTransition = React.useCallback(() => {
    if (!isSelected) {
      bgTransition.value = withTiming(0, {duration: 100});
      return;
    }

    bgTransition.value = withTiming(1, {duration: 100});
  }, [bgTransition, isSelected]);

  React.useEffect(() => {
    startTransition();
  }, [bgTransition.value, isSelected, startTransition]);

  const bgStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      bgTransition.value,
      [0, 1],
      [
        colorMode === 'light' ? 'rgb(229, 229, 234)' : 'rgb(44, 44, 46)',
        colorMode === 'light' ? 'rgb(0, 122, 255)' : 'rgb(10, 132, 255)',
      ],
      'RGB',
    );

    return {
      backgroundColor,
    };
  });

  const selectedTextColor = 'white';
  const textColor = useColorModeValue('black', 'white');

  return (
    <Square w={'33.333%'}>
      <Pressable
        onPress={() => {
          onSelect();
          startTransition();
        }}>
        <Animated.View
          style={[
            bgStyle,
            {paddingVertical: 3, paddingHorizontal: 36, borderRadius: 6},
          ]}>
          <Text
            fontSize={'md'}
            fontWeight={'semibold'}
            color={isSelected ? selectedTextColor : textColor}>
            {text}
          </Text>
        </Animated.View>
      </Pressable>
    </Square>
  );
};

export default TrainingExerciseOptionsMenuItem;
