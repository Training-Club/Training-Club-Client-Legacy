import React from 'react';
import {Box, View, Text} from 'native-base';

const AnalyticsScreen = (): JSX.Element => {
  const spacing = 4;

  return (
    <View>
      <Box w={'100%'} px={spacing}>
        <Text>Analytics</Text>
      </Box>
    </View>
  );
};

export default AnalyticsScreen;
