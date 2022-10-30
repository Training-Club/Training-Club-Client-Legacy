import React from 'react';
import {Box, View} from 'native-base';
import BottomSheet from '@gorhom/bottom-sheet';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';

interface IActionsheetProps {
  children?: any;
}

const Actionsheet = ({children}: IActionsheetProps): JSX.Element | null => {
  const {actionSheetRef, actionSheetConfig} = useActionsheetContext();
  const defaultSnapPoints = React.useMemo(() => ['50%'], []);

  if (!actionSheetConfig) {
    return null;
  }

  return (
    <Box
      position={'absolute'}
      top={0}
      left={0}
      zIndex={2}
      w={'100%'}
      h={'100%'}
      pointerEvents={'box-none'}>
      <BottomSheet
        ref={actionSheetRef}
        index={-1}
        enablePanDownToClose={true}
        keyboardBehavior={actionSheetConfig.keyboardBehavior}
        keyboardBlurBehavior={actionSheetConfig.keyboardBlurBehavior}
        handleComponent={actionSheetConfig.handleComponent}
        backdropComponent={actionSheetConfig.backdropComponent}
        backgroundComponent={actionSheetConfig.backgroundComponent}
        footerComponent={actionSheetConfig.footerComponent}
        snapPoints={actionSheetConfig.snapPoints ?? defaultSnapPoints}
        style={{
          shadowColor: 'black',
          shadowRadius: 4.65,
          shadowOpacity: 0.25,
          elevation: 6,
          shadowOffset: {
            width: 0,
            height: 3,
          },
        }}
        backgroundStyle={{
          backgroundColor: '#f2f2f2',
        }}>
        <View flex={1} zIndex={3} bgColor={'rgba(0,0,0,0.0)'}>
          {children}
        </View>
      </BottomSheet>
    </Box>
  );
};

export default Actionsheet;
