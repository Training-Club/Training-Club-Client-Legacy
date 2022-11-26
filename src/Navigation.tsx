import React from 'react';
import {StatusBar, useColorMode} from 'native-base';
import useAccountStore from './store/AccountStore';
import FeedScreen from './components/screens/main/FeedScreen';
import RegisterScreen from './components/screens/auth/RegisterScreen';
import WelcomeScreen from './components/screens/auth/WelcomeScreen';
import LoginScreen from './components/screens/auth/LoginScreen';
import MainNavigation from './components/molecules/main/MainNavigation';
import AnalyticsScreen from './components/screens/main/AnalyticsScreen';
import DiscoveryScreen from './components/screens/main/DiscoveryScreen';
import ProfileScreen from './components/screens/main/ProfileScreen';
import CurrentSessionScreen from './components/screens/training/CurrentSessionScreen';
import ExerciseSearchScreen from './components/screens/training/ExerciseSearchScreen';
import CreateExerciseScreen from './components/screens/training/CreateExerciseScreen';
import ExerciseAdditionalSearchScreen from './components/screens/training/ExerciseAdditionalSearchScreen';
import CurrentSessionSummaryScreen from './components/screens/training/CurrentSessionSummaryScreen';
import SelectContentScreen from './components/screens/content/SelectContentScreen';
import EditContentScreen from './components/screens/content/EditContentScreen';
import DetailsContentScreen from './components/screens/content/DetailsContentScreen';

import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigation = () => {
  const account = useAccountStore(state => state.account);
  const {colorMode} = useColorMode();
  const initialStack = account ? 'Main' : 'Auth';

  const globalScreenOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'Welcome'}
        screenOptions={globalScreenOptions}>
        <Stack.Screen
          name={'Welcome'}
          component={WelcomeScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'Login'}
          component={LoginScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'Register'}
          component={RegisterScreen}
          options={globalScreenOptions}
        />
      </Stack.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <>
        <MainNavigation />

        <Stack.Navigator
          initialRouteName={'Feed'}
          screenOptions={globalScreenOptions}>
          <Stack.Screen
            name={'Feed'}
            component={FeedScreen}
            options={{...globalScreenOptions, animationEnabled: false}}
          />

          <Stack.Screen
            name={'Discovery'}
            component={DiscoveryScreen}
            options={{...globalScreenOptions, animationEnabled: false}}
          />

          <Stack.Screen
            name={'Analytics'}
            component={AnalyticsScreen}
            options={{...globalScreenOptions, animationEnabled: false}}
          />

          <Stack.Screen
            name={'Profile'}
            component={ProfileScreen}
            options={{...globalScreenOptions, animationEnabled: false}}
          />
        </Stack.Navigator>
      </>
    );
  };

  const TrainingStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'CurrentSession'}
        screenOptions={globalScreenOptions}>
        <Stack.Screen
          name={'CurrentSession'}
          component={CurrentSessionScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'ExerciseSearch'}
          component={ExerciseSearchScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'AdditionalExerciseSearch'}
          component={ExerciseAdditionalSearchScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'CreateExercise'}
          component={CreateExerciseScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'SessionSummary'}
          component={CurrentSessionSummaryScreen}
          options={globalScreenOptions}
        />
      </Stack.Navigator>
    );
  };

  const ContentStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'ContentSelect'}
        screenOptions={globalScreenOptions}>
        <Stack.Screen
          name={'ContentSelect'}
          component={SelectContentScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'ContentEdit'}
          component={EditContentScreen}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'ContentDetails'}
          component={DetailsContentScreen}
          options={globalScreenOptions}
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

      <Stack.Navigator
        initialRouteName={initialStack}
        screenOptions={globalScreenOptions}>
        <Stack.Screen
          name={'Auth'}
          component={AuthStack}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'Main'}
          component={MainStack}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'Training'}
          component={TrainingStack}
          options={globalScreenOptions}
        />

        <Stack.Screen
          name={'Content'}
          component={ContentStack}
          options={globalScreenOptions}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
