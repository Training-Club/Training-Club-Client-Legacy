import React from 'react';
import {StyleSheet, View as RNView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import MainNavigation, {
  MainNavigationScreen,
} from '../../molecules/main/MainNavigation';
import {Box} from 'native-base';

const DiscoveryScreen = (): JSX.Element => {
  return (
    <RNView style={StyleSheet.absoluteFill}>
      <MainNavigation current={MainNavigationScreen.DISCOVERY} />

      <RNView style={StyleSheet.absoluteFill}>
        <SharedElement id={'image-test'} style={{flex: 1}}>
          <Box
            position={'absolute'}
            top={64}
            left={2.5}
            w={372}
            h={372}
            bgColor={'red.500'}
          />
        </SharedElement>
      </RNView>
    </RNView>
  );
};

export default DiscoveryScreen;
