import React from 'react';
import {View} from 'native-base';
import StandardLoginInput from '../../organisms/auth/StandardLoginInput';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import {useAccountContext} from '../../../context/account/AccountContext';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import LoadingIndicator from '../../molecules/design/LoadingIndicator';
import {attemptStandardLogin} from '../../../requests/Account';
import {setRefreshToken} from '../../../data/Account';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {setAccount, setAccessToken, setInitialLoad} = useAccountContext();
  const {setPushdownConfig} = usePushdownContext();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [visible, setVisible] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const spacing = 4;

  const onSubmit = React.useCallback(() => {
    setSubmitting(true);

    attemptStandardLogin(email, password)
      .then(response => {
        setAccount(response.account);
        setAccessToken(response.token);

        setRefreshToken(response.refresh_token)
          .then(() => {
            navigation.push('Main', {screen: 'Feed'});
            setInitialLoad(false);
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
  }, [
    email,
    navigation,
    password,
    setAccessToken,
    setAccount,
    setInitialLoad,
    setPushdownConfig,
  ]);

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
        onSubmit={onSubmit}
        onForgotPassword={onForgotPassword}
        onBack={() =>
          navigation.navigate('Auth' as never, {screen: 'Welcome'} as never)
        }
      />
    </View>
  );
};

export default LoginScreen;
