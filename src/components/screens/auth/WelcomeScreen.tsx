import React from 'react';
import {Heading, View} from 'native-base';
import WelcomeButtonStack from '../../molecules/auth/welcome/WelcomeButtonStack';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const spacing = 4;

  function navigateToCreateAccount() {
    navigation.navigate('Auth' as never, {screen: 'Register'} as never);
  }

  function navigateToApple() {
    navigation.navigate('Auth' as never, {screen: 'Apple'} as never);
  }

  function navigateToEmail() {
    navigation.navigate('Auth' as never, {screen: 'Login'} as never);
  }

  return (
    <View px={spacing}>
      <Heading>Training Club</Heading>

      <WelcomeButtonStack
        spacing={spacing}
        onPressCreateAccount={navigateToCreateAccount}
        onPressContinueWithApple={navigateToApple}
        onPressContinueWithEmail={navigateToEmail}
      />
    </View>
  );
};

export default WelcomeScreen;
