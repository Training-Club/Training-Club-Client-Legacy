import React from 'react';
import {Box, View, Text} from 'native-base';

const DiscoveryScreen = (): JSX.Element => {
  const spacing = 4;

  return (
    <View>
      <Box w={'100%'} px={spacing}>
        <Text>Discovery</Text>
      </Box>
    </View>
  );
};

export default DiscoveryScreen;
