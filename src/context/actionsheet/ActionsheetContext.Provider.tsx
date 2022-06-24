import React from 'react';
import {ActionsheetContext, IActionsheetConfig} from './ActionsheetContext';
import BottomSheet from '@gorhom/bottom-sheet';
import Actionsheet from '../../components/organisms/design/Actionsheet';

interface IActionsheetContextProviderProps {
  children?: any;
}

export function ActionsheetContextProvider({
  children,
}: IActionsheetContextProviderProps) {
  const [actionSheetConfig, setActionSheetConfig] =
    React.useState<IActionsheetConfig>({});

  const actionSheetRef = React.useRef<BottomSheet>(null);

  return (
    <ActionsheetContext.Provider
      value={{actionSheetConfig, setActionSheetConfig, actionSheetRef}}>
      {actionSheetConfig && (
        <Actionsheet>{actionSheetConfig.children}</Actionsheet>
      )}

      {children}
    </ActionsheetContext.Provider>
  );
}
