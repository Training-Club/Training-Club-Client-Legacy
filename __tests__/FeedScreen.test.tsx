import React from 'react';
import theme from '../src/Theme';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import GreetingText from '../src/components/atoms/main/home/GreetingText';

describe('LoginScreen ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render greeting text', () => {
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <GreetingText name={'John Doe'} />
      </NativeBaseProvider>,
    );

    const headingElem = getByTestId('greeting-text-heading');
    expect(headingElem).toBeTruthy();
  });
});
