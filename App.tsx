import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/Theme';
import Navigation from './src/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PushdownContextProvider} from './src/context/PushdownContext.Provider';

const App = () => {
  return (
    <NativeBaseProvider theme={theme()}>
      <PushdownContextProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PushdownContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
