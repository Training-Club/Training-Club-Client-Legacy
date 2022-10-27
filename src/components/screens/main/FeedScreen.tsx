import React from 'react';
import GreetingText from '../../atoms/main/home/GreetingText';
import {useAccountContext} from '../../../context/account/AccountContext';
import AccountDrawer from '../../organisms/main/AccountDrawer';
import PostFeed from '../../organisms/main/PostFeed';
import {HStack, ScrollView, View, useColorModeValue} from 'native-base';

const FeedScreen = () => {
  const {account} = useAccountContext();
  const name = account?.profile?.name ?? account?.username;
  const time: Date = new Date();

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
      <View px={2} w={'100%'}>
        <ScrollView
          w={'100%'}
          h={'100%'}
          shadow={6}
          bgColor={bgColor}
          showsVerticalScrollIndicator={false}>
          {name && (
            <HStack w={'100%'} px={2} justifyContent={'space-between'}>
              <GreetingText name={name} time={time} />
            </HStack>
          )}

          <PostFeed />
        </ScrollView>
      </View>
    </AccountDrawer>
  );
};

export default FeedScreen;
