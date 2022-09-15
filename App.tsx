import React from 'react';
import {LogBox} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {PushdownContextProvider} from './src/context/pushdown/PushdownContext.Provider';
import {AccountContextProvider} from './src/context/account/AccountContext.Provider';
import {ActionsheetContextProvider} from './src/context/actionsheet/ActionsheetContext.Provider';
import {SessionContextProvider} from './src/context/session/SessionContext.Provider';
import {ExerciseContextProvider} from './src/context/exercise/ExerciseContext.Provider';
import {ContentDraftContextProvider} from './src/context/content/ContentDraftContext.Provider';
import theme from './src/Theme';
import Navigation from './src/Navigation';

LogBox.ignoreLogs([
  'Check the render method of `ExerciseCard`. See https://reactjs.org/link/warning-keys for more information.',
]);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider theme={theme()}>
        <AccountContextProvider>
          <NavigationContainer>
            <ActionsheetContextProvider>
              <PushdownContextProvider>
                <SessionContextProvider>
                  <ExerciseContextProvider>
                    <ContentDraftContextProvider>
                      <Navigation />
                    </ContentDraftContextProvider>
                  </ExerciseContextProvider>
                </SessionContextProvider>
              </PushdownContextProvider>
            </ActionsheetContextProvider>
          </NavigationContainer>
        </AccountContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

export default App;
