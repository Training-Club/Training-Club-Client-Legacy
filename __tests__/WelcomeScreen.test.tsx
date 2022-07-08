import React from 'react';
import {render} from '@testing-library/react-native';
import WelcomeButtonStack from '../src/components/molecules/auth/welcome/WelcomeButtonStack';
import {NativeBaseProvider} from 'native-base';

describe('WelcomeScreen ->', () => {
  it('should render Welcome Button Stack', () => {
    const inset = {
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    };

    const {getByTestId, getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <WelcomeButtonStack
          onPressCreateAccount={function (): void {
            throw new Error('Function not implemented.');
          }}
          onPressContinueWithApple={function (): void {
            throw new Error('Function not implemented.');
          }}
          onPressContinueWithEmail={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </NativeBaseProvider>,
    );

    const btnStack = getByTestId('welcome-btn-stack');
    const createAccountBtn = getByText('Create Account');
    const continueWithEmailBtn = getByText('Continue with Email');

    expect(btnStack).toBeTruthy();
    expect(createAccountBtn).toBeTruthy();
    expect(continueWithEmailBtn).toBeTruthy();
  });
});
