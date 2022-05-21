import React from 'react';
import WelcomeScreen from '../src/components/screens/auth/WelcomeScreen';
import {render} from '@testing-library/react-native';

describe('WelcomeScreen ->', async () => {
  it('should render Welcome Button Stack', async () => {
    const {getByTestId, getByText} = render(<WelcomeScreen />);
    const btnStack = getByTestId('welcome-btn-stack');
    const createAccountBtn = getByText('Create Account');
    const continueWithEmailBtn = getByText('Continue with Email');

    expect(btnStack).toBeTruthy();
    expect(createAccountBtn).toBeTruthy();
    expect(continueWithEmailBtn).toBeTruthy();
  });
});
