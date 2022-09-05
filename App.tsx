import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {PushdownContextProvider} from './src/context/pushdown/PushdownContext.Provider';
import {AccountContextProvider} from './src/context/account/AccountContext.Provider';
import {ActionsheetContextProvider} from './src/context/actionsheet/ActionsheetContext.Provider';
import {SessionContextProvider} from './src/context/session/SessionContext.Provider';
import {ExerciseContextProvider} from './src/context/exercise/ExerciseContext.Provider';
import theme from './src/Theme';
import Navigation from './src/Navigation';

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
                    <Navigation />
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
