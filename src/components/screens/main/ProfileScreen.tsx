import React from 'react';

import MainNavigation, {
  MainNavigationScreen,
} from '../../molecules/main/MainNavigation';

import {Box, Text, View} from 'native-base';

const ProfileScreen = (): JSX.Element => {
  const spacing = 4;

  return (
    <>
      <MainNavigation current={MainNavigationScreen.PROFILE} />

      <View>
        <Box w={'100%'} px={spacing}>
          <Text>Profile</Text>
        </Box>
      </View>
    </>
  );
};

export default ProfileScreen;
