import React from 'react';
import {StyleSheet, View as RNView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import MainNavigation, {
  MainNavigationScreen,
} from '../../molecules/main/MainNavigation';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue, withDelay,
  withTiming,
} from 'react-native-reanimated';
import {Box, Heading} from 'native-base';

const AnalyticsScreen = (): JSX.Element => {
  const contentOpacity = useSharedValue(0);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      zIndex: 999,
      opacity: contentOpacity.value,
      position: 'absolute',
      top: 408,
      left: 8,
    };
  });

  React.useEffect(() => {
    contentOpacity.value = withDelay(250, withTiming(1, {duration: 250}));
  }, [contentOpacity]);

  return (
    <RNView style={StyleSheet.absoluteFill}>
      <MainNavigation current={MainNavigationScreen.ANALYTICS} />

      <RNView style={StyleSheet.absoluteFill}>
        <SharedElement id={'image-test'} style={{flex: 1}}>
          <Box
            position={'absolute'}
            top={0}
            left={0}
            w={'100%'}
            h={400}
            bgColor={'red.500'}
          />
        </SharedElement>
      </RNView>

      <Animated.View style={[animatedTextStyle]}>
        <Heading color={'black'}>Here's a title</Heading>
      </Animated.View>
    </RNView>
  );
};

export default AnalyticsScreen;
