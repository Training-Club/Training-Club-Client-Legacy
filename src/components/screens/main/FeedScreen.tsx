import React from 'react';
import {Box, HStack, View} from 'native-base';
import GreetingText from '../../atoms/main/home/GreetingText';
import {useAccountContext} from '../../../context/account/AccountContext';
import {useAccountDrawerContext} from '../../../context/account/AccountDrawerContext';
import AccountDrawerAvatar from '../../molecules/main/account-drawer/AccountDrawerAvatar';

const FeedScreen = (): JSX.Element => {
  const {account} = useAccountContext();
  const {setAccountDrawerOpen} = useAccountDrawerContext();

  const name = account?.profile?.name ?? account?.username;
  const spacing = 4;

  return (
    <View>
      {name && (
        <HStack w={'100%'} px={spacing} justifyContent={'space-between'}>
          <GreetingText name={name} />

          <Box mt={4}>
            <AccountDrawerAvatar
              setAccountDrawerOpen={setAccountDrawerOpen}
              avatar={{uri: '', showNotificationBubble: true}}
            />
          </Box>
        </HStack>
      )}
    </View>
  );
};

export default FeedScreen;
