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

  it('should render good morning text', () => {
    const morningDate = Date.parse('01 Jan 1970 00:00:00 GMT');

    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <GreetingText name={'John Doe'} time={new Date(morningDate)} />
      </NativeBaseProvider>,
    );

    const headingElem = getByTestId('greeting-text-heading');
    expect(headingElem).toBeTruthy();
  });

  it('should render good afternoon text', () => {
    const afternoonDate = Date.parse('01 Jan 1970 13:00:00 GMT');

    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <GreetingText name={'John Doe'} time={new Date(afternoonDate)} />
      </NativeBaseProvider>,
    );

    const headingElem = getByTestId('greeting-text-heading');
    expect(headingElem).toBeTruthy();
  });

  it('should render good evening text', () => {
    const eveningDate = Date.parse('01 Jan 1970 20:00:00 GMT');

    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <GreetingText name={'John Doe'} time={new Date(eveningDate)} />
      </NativeBaseProvider>,
    );

    const headingElem = getByTestId('greeting-text-heading');
    expect(headingElem).toBeTruthy();
  });
});
