import React from 'react';
import {Box, HStack, ScrollView} from 'native-base';

interface ITogglePillRowProps {
  children: Element | Element[];
}

const TogglePillRow = ({children}: ITogglePillRowProps): JSX.Element => {
  return (
    <Box testID={'toggle-pill-row'} w={'100%'} h={'auto'}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        w={'100%'}
        mt={2}>
        <HStack w={'100%'} h={'36px'} space={2} ml={4} pr={4}>
          {children}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default React.memo(TogglePillRow);
