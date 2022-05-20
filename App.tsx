import React from 'react';
import {NativeBaseProvider} from 'native-base';
import theme from './src/Theme';
import Navigation from './src/Navigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NativeBaseProvider theme={theme()}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
