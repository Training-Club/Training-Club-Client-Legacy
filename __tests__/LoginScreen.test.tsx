import React from 'react';
import theme from '../src/Theme';
import StandardLoginInput from '../src/components/organisms/auth/StandardLoginInput';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';

describe('LoginScreen ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render input fields', () => {
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <StandardLoginInput
          email={''}
          password={''}
          isVisible={false}
          setEmail={() => {}}
          setPassword={() => {}}
          setVisible={() => {}}
          onSubmit={() => {}}
          onForgotPassword={() => {}}
          onBack={() => {}}
        />
      </NativeBaseProvider>,
    );

    const emailInputElem = getByTestId('email-input');
    const passwordInputElem = getByTestId('password-input');
    const forgotPasswordElem = getByTestId('forgot-password-btn');

    expect(emailInputElem).toBeTruthy();
    expect(passwordInputElem).toBeTruthy();
    expect(forgotPasswordElem).toBeTruthy();
  });
});
