import React from 'react';
import theme from './Theme';
import {AccountComponentWrapper} from './store/AccountStore';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {ActionsheetContextProvider} from './context/actionsheet/ActionsheetContext.Provider';
import {PushdownContextProvider} from './context/pushdown/PushdownContext.Provider';
import {SessionContextProvider} from './context/session/SessionContext.Provider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface IProvidersProps {
  children: any;
}

export const Providers = ({children}: IProvidersProps): JSX.Element => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider theme={theme()}>
        <NavigationContainer>
          <ActionsheetContextProvider>
            <PushdownContextProvider>
              <SessionContextProvider>
                <AccountComponentWrapper>{children}</AccountComponentWrapper>
              </SessionContextProvider>
            </PushdownContextProvider>
          </ActionsheetContextProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};
