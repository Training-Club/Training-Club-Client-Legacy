import React from 'react';
import theme from './Theme';
import {NativeBaseProvider} from 'native-base';
import {AccountContextProvider} from './context/account/AccountContext.Provider';
import {NavigationContainer} from '@react-navigation/native';
import {ActionsheetContextProvider} from './context/actionsheet/ActionsheetContext.Provider';
import {PushdownContextProvider} from './context/pushdown/PushdownContext.Provider';
import {SessionContextProvider} from './context/session/SessionContext.Provider';
import {ExerciseContextProvider} from './context/exercise/ExerciseContext.Provider';
import {ContentDraftContextProvider} from './context/content/ContentDraftContext.Provider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface IProvidersProps {
  children: any;
}

export const Providers = ({children}: IProvidersProps): JSX.Element => {
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
                      {children}
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
