import React from 'react';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider, Text} from 'native-base';
import theme from '../src/Theme';
import PressablePill from '../src/components/atoms/design/PressablePill';
import {NavigationContainer} from '@react-navigation/native';

describe('Start New Actionsheet ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render pressable pill', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <PressablePill onPress={jest.fn()}>
            <Text>Test Pill</Text>
          </PressablePill>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const pillElem = getByText('Test Pill');
    expect(pillElem).toBeTruthy();
  });
});
