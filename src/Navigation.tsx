import React from 'react';
import {StatusBar, useColorMode} from 'native-base';
import WelcomeScreen from './components/screens/auth/WelcomeScreen';
import LoginScreen from './components/screens/auth/LoginScreen';
import RegisterScreen from './components/screens/auth/RegisterScreen';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useAccountContext} from './context/account/AccountContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {account} = useAccountContext();
  const {colorMode} = useColorMode();

  const initialStack = account ? 'Main' : 'Auth';

  const AuthStack = () => {
    return (
      <Stack.Navigator initialRouteName={'Welcome'}>
        <Stack.Screen
          name={'Welcome'}
          component={WelcomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'Login'}
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'Register'}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
      />

      <Stack.Navigator initialRouteName={initialStack}>
        <Stack.Screen
          name={'Auth'}
          component={AuthStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
