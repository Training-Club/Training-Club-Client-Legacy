import React from 'react';
import useAccountStore from './store/AccountStore';
import FeedScreen from './components/screens/main/FeedScreen';
import RegisterScreen from './components/screens/auth/RegisterScreen';
import WelcomeScreen from './components/screens/auth/WelcomeScreen';
import LoginScreen from './components/screens/auth/LoginScreen';
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
import {PostDetailsScreen} from './components/screens/main/PostDetailsScreen';

import {
  createSharedElementStackNavigator,
  SharedElementsConfig,
} from 'react-navigation-shared-element';

import {StackNavigationOptions} from '@react-navigation/stack';
import {ContentType, IContentItem} from './models/Content';

import {StatusBar, useColorMode} from 'native-base';

const Stack = createSharedElementStackNavigator();

const Navigation = () => {
  const account = useAccountStore(state => state.account);
  const {colorMode} = useColorMode();

  const globalScreenOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };

  // smooths shared element transitions within navigator
  // @ts-ignore
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={`${colorMode === 'light' ? 'dark' : 'light'}-content`}
      />

      <Stack.Navigator
        initialRouteName={account ? 'MainFeed' : 'AuthWelcome'}
        screenOptions={{cardStyleInterpolator: forFade}}>
        {account ? (
          <>
            <Stack.Screen
              name={'MainFeed'}
              component={FeedScreen}
              options={{...globalScreenOptions}}
            />

            <Stack.Screen
              name={'MainDiscovery'}
              component={DiscoveryScreen}
              sharedElements={() => {
                return [
                  {
                    id: 'image-test',
                    animation: 'fade',
                    resize: 'clip',
                  },
                ];
              }}
              options={{...globalScreenOptions}}
            />

            <Stack.Screen
              name={'MainAnalytics'}
              component={AnalyticsScreen}
              sharedElements={() => {
                return [
                  {
                    id: 'image-test',
                    animation: 'move',
                    resize: 'clip',
                  },
                ];
              }}
              options={{...globalScreenOptions}}
            />

            <Stack.Screen
              name={'MainProfile'}
              component={ProfileScreen}
              options={{...globalScreenOptions}}
            />

            <Stack.Screen
              name={'MainPostDetails'}
              component={PostDetailsScreen}
              options={{...globalScreenOptions}}
              sharedElements={route => {
                const {data} = route.params;
                let result: SharedElementsConfig = [];

                if (data && data.content) {
                  data.content.forEach((entry: IContentItem, index: number) => {
                    result.push({
                      id: `post-item-${data.id}-${index}`,
                      animation: 'move',
                    });

                    if (entry.type === ContentType.VIDEO) {
                      result.push({
                        id: `post-item-volume-controller-${data.id}-${index}`,
                        animation: 'fade-in',
                      });
                    }
                  });
                }

                return result;
              }}
            />

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

            <Stack.Screen
              name={'TrainingCurrentSession'}
              component={CurrentSessionScreen}
              options={globalScreenOptions}
            />

            <Stack.Screen
              name={'TrainingCurrentSessionSummary'}
              component={CurrentSessionSummaryScreen}
              options={globalScreenOptions}
            />

            <Stack.Screen
              name={'TrainingCreateExerciseScreen'}
              component={CreateExerciseScreen}
              options={globalScreenOptions}
            />

            <Stack.Screen
              name={'TrainingExerciseSearch'}
              component={ExerciseSearchScreen}
              options={globalScreenOptions}
            />

            <Stack.Screen
              name={'TrainingAdditionalExerciseSearch'}
              component={ExerciseAdditionalSearchScreen}
              options={globalScreenOptions}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={'AuthWelcome'}
              component={WelcomeScreen}
              options={globalScreenOptions}
            />

            <Stack.Screen
              name={'AuthLogin'}
              component={LoginScreen}
              options={globalScreenOptions}
            />

            <Stack.Screen
              name={'AuthRegister'}
              component={RegisterScreen}
              options={globalScreenOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
