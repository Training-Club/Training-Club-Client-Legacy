import React from 'react';
import GreetingText from '../../atoms/main/home/GreetingText';
import {useAccountContext} from '../../../context/account/AccountContext';
import AccountDrawer from '../../organisms/main/AccountDrawer';
import {HStack, useColorModeValue, View} from 'native-base';

const FeedScreen = () => {
  const {account} = useAccountContext();
  const name = account?.profile?.name ?? account?.username;
  const time: Date = new Date();
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
            <GreetingText name={name} time={time} />
          </HStack>
        )}
      </View>
    </AccountDrawer>
  );
};

export default FeedScreen;
