import React from 'react';
import {StatusBar, useColorMode} from 'native-base';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useAccountContext} from './context/account/AccountContext';

import FeedScreen from './components/screens/main/FeedScreen';
import RegisterScreen from './components/screens/auth/RegisterScreen';
import WelcomeScreen from './components/screens/auth/WelcomeScreen';
import LoginScreen from './components/screens/auth/LoginScreen';
import MainNavigation from './components/molecules/main/MainNavigation';
import AnalyticsScreen from './components/screens/main/AnalyticsScreen';
import DiscoveryScreen from './components/screens/main/DiscoveryScreen';
import ProfileScreen from './components/screens/main/ProfileScreen';
import AccountDrawer from './components/organisms/main/AccountDrawer';
import CurrentSessionScreen from './components/screens/training/CurrentSessionScreen';
import ExerciseSearchScreen from './components/screens/training/ExerciseSearchScreen';
import CreateExerciseScreen from './components/screens/training/CreateExerciseScreen';
import ExerciseAdditionalSearchScreen from './components/screens/training/ExerciseAdditionalSearchScreen';

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

  const MainStack = () => {
    return (
      <>
        <AccountDrawer />
        <MainNavigation />

        <Stack.Navigator
          initialRouteName={'Feed'}
          screenOptions={{stackAnimation: 'none'}}>
          <Stack.Screen
            name={'Feed'}
            component={FeedScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'Discovery'}
            component={DiscoveryScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'Analytics'}
            component={AnalyticsScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'Profile'}
            component={ProfileScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </>
    );
  };

  const TrainingStack = () => {
    return (
      <>
        <Stack.Navigator
          initialRouteName={'CurrentSession'}
          screenOptions={{stackAnimation: 'none'}}>
          <Stack.Screen
            name={'CurrentSession'}
            component={CurrentSessionScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'ExerciseSearch'}
            component={ExerciseSearchScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'AdditionalExerciseSearch'}
            component={ExerciseAdditionalSearchScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'CreateExercise'}
            component={CreateExerciseScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </>
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

        <Stack.Screen
          name={'Main'}
          component={MainStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name={'Training'}
          component={TrainingStack}
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
