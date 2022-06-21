import React from 'react';
import AccountDrawerPressable from '../../../atoms/main/account-drawer/AccountDrawerPressable';
import {Box, useColorModeValue} from 'native-base';

const AccountDrawerButtonStack = (): JSX.Element => {
  const dangerColor = useColorModeValue('apple.red.light', 'apple.red.dark');

  return (
    <Box w={'100%'} h={'100%'}>
      <AccountDrawerPressable
        onPress={() => console.log('Not implemented')}
        text={'My Account'}
        styling={{
          roundedTop: true,
        }}
        icon={{iconName: 'account-circle', iconSize: 6}}
      />

      <AccountDrawerPressable
        onPress={() => console.log('Not implemented')}
        text={'Inbox'}
        badge={{
          color: dangerColor,
          text: '100',
        }}
        icon={{iconName: 'email', iconSize: 6}}
      />

      <AccountDrawerPressable
        onPress={() => console.log('Not implemented')}
        text={'Settings'}
        styling={{
          roundedBottom: true,
        }}
        icon={{iconName: 'settings', iconSize: 6}}
      />

      <AccountDrawerPressable
        onPress={() => console.log('Not implemented')}
        text={'Exercise Templates'}
        styling={{
          roundedTop: true,
        }}
        icon={{iconName: 'fitness-center', iconSize: 6}}
      />

      <AccountDrawerPressable
        onPress={() => console.log('Not implemented')}
        text={'Your Foods'}
        styling={{
          roundedBottom: true,
        }}
        icon={{iconName: 'lunch-dining', iconSize: 6}}
      />

      <AccountDrawerPressable
        onPress={() => console.log('Not implemented')}
        text={'Sign out'}
        styling={{
          roundedTop: true,
          roundedBottom: true,
          color: dangerColor,
        }}
        icon={{iconName: 'logout', iconSize: 6}}
      />
    </Box>
  );
};

export default AccountDrawerButtonStack;
