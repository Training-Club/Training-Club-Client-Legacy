import React from 'react';
import {View} from 'native-base';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import {useDebounce} from 'use-debounce';
import Animated, {FadeOut, SlideInRight} from 'react-native-reanimated';
import EmailInput, {IEmailInputErrors} from '../../organisms/auth/EmailInput';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';

import UsernameInput, {
  IUsernameInputErrors,
} from '../../organisms/auth/UsernameInput';

import PasswordInput, {
  IPasswordInputErrors,
} from '../../organisms/auth/PasswordInput';

import {
  EmailValidatorResponse,
  isValidEmail,
  isValidPassword,
  isValidUsername,
  PasswordValidatorResponse,
  UsernameValidatorResponse,
} from '../../../utils/ValidatorUtil';

export enum RegisterScreenState {
  USERNAME,
  EMAIL,
  PASSWORD,
}

const RegisterScreen = () => {
  const {setPushdownConfig} = usePushdownContext();

  const [state, setState] = React.useState<RegisterScreenState>(
    RegisterScreenState.USERNAME,
  );

  const [username, setUsername] = React.useState<string>('');
  const [usernameDebounced] = useDebounce(username, 500);
  const [usernameErrors, setUsernameErrors] =
    React.useState<IUsernameInputErrors>({
      minLength: true,
      maxLength: true,
      available: true,
      specialChars: true,
    });

  const [email, setEmail] = React.useState<string>('');
  const [emailDebounced] = useDebounce(email, 500);
  const [emailErrors, setEmailErrors] = React.useState<IEmailInputErrors>({
    format: true,
    minLength: true,
    maxLength: true,
    available: true,
  });

  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [passwordDebounced] = useDebounce(password, 500);
  const [confirmPasswordDebounced] = useDebounce(confirmPassword, 500);
  const [passwordErrors, setPasswordErrors] =
    React.useState<IPasswordInputErrors>({
      match: true,
      minLength: true,
      maxLength: true,
      specialChars: true,
    });

  const spacing = 4;

  React.useEffect(() => {
    isValidUsername(usernameDebounced).then(result => {
      setUsernameErrors(result.errors);
    });
  }, [usernameDebounced]);

  React.useEffect(() => {
    isValidEmail(emailDebounced).then(result => {
      setEmailErrors(result.errors);
    });
  }, [emailDebounced]);

  React.useEffect(() => {
    isValidPassword(passwordDebounced, confirmPasswordDebounced).then(
      result => {
        setPasswordErrors(result.errors);
      },
    );
  }, [passwordDebounced, confirmPasswordDebounced]);

  async function submitUsernameSelection() {
    const result: UsernameValidatorResponse = await isValidUsername(username);

    if (!result.valid) {
      setUsernameErrors(result.errors);

      setPushdownConfig({
        status: 'error',
        title: 'Whoops, you missed something',
        body: 'The username you provided is missing some of our username requirements.',
        duration: 5000,
        show: true,
      });

      return;
    }

    setState(RegisterScreenState.EMAIL);
  }

  async function submitEmailSelection() {
    const result: EmailValidatorResponse = await isValidEmail(email);

    if (!result.valid) {
      setEmailErrors(result.errors);

      setPushdownConfig({
        status: 'error',
        title: 'Whoops, you missed something',
        body: 'The username you provided is missing some of our email requirements.',
        duration: 5000,
        show: true,
      });

      return;
    }

    setState(RegisterScreenState.PASSWORD);
  }

  async function submitPasswordSelection() {
    const result: PasswordValidatorResponse = await isValidPassword(
      password,
      confirmPassword,
    );

    if (!result.valid) {
      setPasswordErrors(result.errors);

      setPushdownConfig({
        status: 'error',
        title: 'Whoops, you missed something',
        body: 'The username you provided is missing some of our email requirements.',
        duration: 5000,
        show: true,
      });

      return;
    }

    // TODO: Complete registration process
  }

  return (
    <View px={spacing}>
      <CloseableHeader
        pageTitle={'Join Training Club'}
        closeButton={{
          stackName: 'Auth',
          screenName: 'Welcome',
        }}
      />

      {state === RegisterScreenState.USERNAME && (
        <Animated.View entering={SlideInRight.delay(100)} exiting={FadeOut}>
          <UsernameInput
            value={username}
            setValue={setUsername}
            onSubmit={submitUsernameSelection}
            errors={usernameErrors}
          />
        </Animated.View>
      )}

      {state === RegisterScreenState.EMAIL && (
        <Animated.View entering={SlideInRight.delay(100)} exiting={FadeOut}>
          <EmailInput
            value={email}
            setValue={setEmail}
            onSubmit={submitEmailSelection}
            onBack={() => setState(RegisterScreenState.USERNAME)}
            errors={emailErrors}
          />
        </Animated.View>
      )}

      {state === RegisterScreenState.PASSWORD && (
        <Animated.View entering={SlideInRight.delay(100)} exiting={FadeOut}>
          <PasswordInput
            value={password}
            confirmValue={confirmPassword}
            setValue={setPassword}
            setConfirmValue={setConfirmPassword}
            isVisible={passwordVisible}
            setVisible={setPasswordVisible}
            onSubmit={submitPasswordSelection}
            onBack={() => setState(RegisterScreenState.EMAIL)}
            errors={passwordErrors}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default React.memo(RegisterScreen);
