import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Icon} from 'native-base';

interface IPostScrollIndicatorItemProps {
  isSelected: boolean;
}

export const PostScrollIndicatorItem = ({
  isSelected,
}: IPostScrollIndicatorItemProps): JSX.Element => {
  const opacityTransition = useSharedValue(isSelected ? 1 : 0);

  const startTransition = React.useCallback(() => {
    if (!isSelected) {
      opacityTransition.value = withTiming(0, {duration: 200});
      return;
    }

    opacityTransition.value = withTiming(1, {duration: 200});
  }, [isSelected, opacityTransition]);

  React.useEffect(() => {
    startTransition();
  }, [startTransition]);

  const indicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(opacityTransition.value, [0, 1], [0.5, 1.0]);

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      testID={'post-scroll-indicator-item'}
      style={[indicatorStyle]}>
      <Icon as={MaterialIcons} name={'circle'} color={'white'} size={2} />
    </Animated.View>
  );
};
