import React from 'react';
import {Box, Square} from 'native-base';
import {BottomSheetHandleProps} from '@gorhom/bottom-sheet';

const Handle: React.FC<BottomSheetHandleProps> = () => {
  const color = '#AAAAAA';

  return (
    <Square position={'absolute'} top={3} left={0} w={'100%'}>
      <Box w={'32px'} h={'3px'} borderRadius={'full'} bgColor={color} />
    </Square>
  );
};

export default Handle;
