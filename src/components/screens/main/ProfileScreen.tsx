import React from 'react';
import {Box, View, Text} from 'native-base';

const ProfileScreen = (): JSX.Element => {
  const spacing = 4;

  return (
    <View>
      <Box w={'100%'} px={spacing}>
        <Text>Profile</Text>
      </Box>
    </View>
  );
};

export default ProfileScreen;
