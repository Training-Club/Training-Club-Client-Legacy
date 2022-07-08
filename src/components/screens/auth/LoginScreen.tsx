import React from 'react';
import {View} from 'native-base';
import {useAccountContext} from '../../../context/account/AccountContext';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import LoadingIndicator from '../../molecules/design/LoadingIndicator';
import StandardLoginInput from '../../organisms/auth/StandardLoginInput';
import {useNavigation} from '@react-navigation/native';
import {attemptStandardLogin} from '../../../requests/Account';
import {setToken} from '../../../data/Account';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {setAccount} = useAccountContext();
  const {setPushdownConfig} = usePushdownContext();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [visible, setVisible] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const spacing = 4;

  function submit() {
    setSubmitting(true);

    attemptStandardLogin(email, password)
      .then(result => {
        setAccount(result.account);

        setToken(result.token)
          .then(() => {
            navigation.navigate('Main' as never, {screen: 'Home'} as never);
          })
          .catch(() => {
            setPushdownConfig({
              title: 'Something went wrong',
              body: 'Unable to store authentication credentials on your device',
              status: 'error',
              show: true,
              duration: 5000,
            });

            setSubmitting(false);
          });
      })
      .catch(err => {
        let body: string;

        switch (err.response.status) {
          case 500:
            body =
              'An internal error occurred. Please wait a moment and try again.';
            break;
          case 403:
            body = 'Invalid login information';
            break;
          case 404:
            body = 'Email and/or password combination does not match';
            break;
          default:
            body = 'An error has occurred. Please wait a moment and try again.';
        }

        if (body) {
          setPushdownConfig({
            title: 'Something went wrong',
            body: body,
            status: 'error',
            show: true,
            duration: 5000,
          });
        }

        setSubmitting(false);
      });
  }

  /**
   * Handles navigation towards the forgot password screen
   */
  function onForgotPassword() {
    navigation.navigate('Auth' as never, {screen: 'ForgotPassword'} as never);
  }

  return (
    <View px={spacing}>
      <CloseableHeader
        pageTitle={'Sign in'}
        closeButton={{
          stackName: 'Auth',
          screenName: 'Welcome',
        }}
      />

      {submitting && (
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            zIndex: 10,
            position: 'absolute',
          }}
          entering={FadeIn.springify()}
          exiting={FadeOut.springify()}>
          <LoadingIndicator loadingText={'Signing you in...'} />
        </Animated.View>
      )}

      <StandardLoginInput
        email={email}
        password={password}
        isVisible={visible}
        setEmail={setEmail}
        setPassword={setPassword}
        setVisible={setVisible}
        onSubmit={submit}
        onForgotPassword={onForgotPassword}
        onBack={() =>
          navigation.navigate('Auth' as never, {screen: 'Welcome'} as never)
        }
      />
    </View>
  );
};

export default LoginScreen;
