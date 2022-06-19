import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/Theme';
import Navigation from './src/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PushdownContextProvider} from './src/context/pushdown/PushdownContext.Provider';
import {AccountContextProvider} from './src/context/account/AccountContext.Provider';
import {AccountDrawerContextProvider} from './src/context/account/AccountDrawerContext.Provider';

const App = () => {
  return (
    <NativeBaseProvider theme={theme()}>
      <AccountContextProvider>
        <AccountDrawerContextProvider>
          <PushdownContextProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </PushdownContextProvider>
        </AccountDrawerContextProvider>
      </AccountContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
