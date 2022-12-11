import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import WelcomeButtonStack from '../../molecules/auth/welcome/WelcomeButtonStack';
import {Button, Heading, useColorMode, View} from 'native-base';

const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {colorMode, setColorMode} = useColorMode();

  const spacing = 4;

  function navigateToCreateAccount() {
    navigation.navigate('AuthRegister');
  }

  function navigateToApple() {
    console.log('navigateToApple called');
  }

  function navigateToEmail() {
    navigation.navigate('AuthLogin');
  }

  return (
    <View px={spacing}>
      <Heading>Training Club</Heading>

      <Button
        onPress={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Change color mode
      </Button>

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
