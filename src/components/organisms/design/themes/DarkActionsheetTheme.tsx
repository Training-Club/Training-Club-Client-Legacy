import React, {useMemo} from 'react';
import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import {useColorModeValue} from 'native-base';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

const DarkActionsheetTheme: React.FC<BottomSheetBackgroundProps> = ({
  style,
}) => {
  // values have to be hardcoded to be used in a container style
  const backgroundColor = useColorModeValue('#F2F2F2', '#17181A');

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  }));

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default DarkActionsheetTheme;
