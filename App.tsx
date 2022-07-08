import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import theme from './src/Theme';
import Navigation from './src/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PushdownContextProvider} from './src/context/pushdown/PushdownContext.Provider';
import {AccountContextProvider} from './src/context/account/AccountContext.Provider';
import {AccountDrawerContextProvider} from './src/context/account/AccountDrawerContext.Provider';
import {ActionsheetContextProvider} from './src/context/actionsheet/ActionsheetContext.Provider';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider theme={theme()}>
        <AccountContextProvider>
          <AccountDrawerContextProvider>
            <ActionsheetContextProvider>
              <PushdownContextProvider>
                <NavigationContainer>
                  <Navigation />
                </NavigationContainer>
              </PushdownContextProvider>
            </ActionsheetContextProvider>
          </AccountDrawerContextProvider>
        </AccountContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

export default App;
