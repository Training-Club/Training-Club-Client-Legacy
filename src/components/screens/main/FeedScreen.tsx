import React from 'react';
import {HStack, useColorModeValue, View} from 'native-base';
import GreetingText from '../../atoms/main/home/GreetingText';
import {useAccountContext} from '../../../context/account/AccountContext';
import AccountDrawer from '../../organisms/main/AccountDrawer';

const FeedScreen = () => {
  const {account} = useAccountContext();

  const name = account?.profile?.name ?? account?.username;
  const spacing = 4;

  const bgColor = useColorModeValue(
    'core.background.light',
    'core.background.dark',
  );

  // TODO: Handle this properly
  if (!account) {
    return null;
  }

  return (
    <AccountDrawer account={account}>
      <View shadow={6} bgColor={bgColor}>
        {name && (
          <HStack w={'100%'} px={spacing} justifyContent={'space-between'}>
            <GreetingText name={name} />
          </HStack>
        )}
      </View>
    </AccountDrawer>
  );
};

export default FeedScreen;
