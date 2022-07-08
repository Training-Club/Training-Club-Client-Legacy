import React from 'react';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {SharedValue} from 'react-native-reanimated';

import {
  BottomSheetBackgroundProps,
  BottomSheetFooterProps,
  BottomSheetHandleProps,
} from '@gorhom/bottom-sheet';

export interface IActionsheetConfig {
  children?: JSX.Element; // child content to render within the actionsheet
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>; // snap points
  index?: number; // initial snap index
  keyboardBehavior?: 'interactive' | 'extend' | 'fillParent'; // defines the keyboard appearance behavior
  keyboardBlurBehavior?: 'none' | 'restore'; // defines the keyboard blur behavior
  handleComponent?: React.FC<BottomSheetHandleProps>; // component to be placed as the sheet handle
  backdropComponent?: React.FC<BottomSheetBackgroundProps>; // component to be placed as a sheet backdrop
  backgroundComponent?: React.FC<BottomSheetBackgroundProps>; // component to be placed as a sheet background
  footerComponent?: React.FC<BottomSheetFooterProps>; // component to be placed as the sheet footer
}

interface IActionsheetContext {
  actionSheetRef?: React.RefObject<BottomSheetMethods>;
  actionSheetConfig: IActionsheetConfig;
  setActionSheetConfig: (cfg: IActionsheetConfig) => void;
}

export const ActionsheetContext = React.createContext<IActionsheetContext>({
  actionSheetConfig: {index: -1},
  setActionSheetConfig: () => {},
});

export const useActionsheetContext = () => React.useContext(ActionsheetContext);
