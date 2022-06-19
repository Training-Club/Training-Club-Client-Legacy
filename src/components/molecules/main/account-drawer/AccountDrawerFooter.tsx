import React from 'react';
import {Dimensions} from 'react-native';
import AccountDrawerPressable from '../../../atoms/main/account-drawer/AccountDrawerPressable';
import {Box, HStack, useColorMode} from 'native-base';

interface IAccountDrawerFooterProps {}

const AccountDrawerFooter = ({}: IAccountDrawerFooterProps): JSX.Element => {
  const {colorMode, toggleColorMode} = useColorMode();
  const {width} = Dimensions.get('screen');
  const smallDevice = width <= 375;

  return (
    <Box w={'100%'} position={'absolute'} bottom={smallDevice ? 0 : 8} left={4}>
      <HStack space={2}>
        <Box w={'80%'}>
          <AccountDrawerPressable
            onPress={() => console.log('Settings')}
            text={'Settings'}
            styling={{
              roundedBottom: true,
              roundedTop: true,
            }}
            icon={{
              iconName: 'settings',
              iconSize: 6,
            }}
          />
        </Box>

        <Box w={'18%'}>
          <AccountDrawerPressable
            onPress={toggleColorMode}
            styling={{
              roundedBottom: true,
              roundedTop: true,
              centerContent: true,
            }}
            icon={{
              iconName: colorMode === 'light' ? 'nightlight-round' : 'wb-sunny',
              iconSize: 6,
            }}
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default AccountDrawerFooter;
