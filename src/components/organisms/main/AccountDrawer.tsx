import React from 'react';
import {useAccountDrawerContext} from '../../../context/account/AccountDrawerContext';
import {useAccountContext} from '../../../context/account/AccountContext';
import AccountDrawerHeader from '../../molecules/main/account-drawer/AccountDrawerHeader';
import AccountDrawerButtonStack from '../../molecules/main/account-drawer/AccountDrawerButtonStack';
import AccountDrawerFooter from '../../molecules/main/account-drawer/AccountDrawerFooter';
import {Box, HStack, Pressable, useColorModeValue} from 'native-base';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

const AccountDrawer = () => {
  const {account} = useAccountContext();
  const {isAccountDrawerOpen, setAccountDrawerOpen} = useAccountDrawerContext();

  const backgroundColor = useColorModeValue('apple.gray.50', 'apple.gray.900');

  if (!isAccountDrawerOpen) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut.delay(200)}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 2,
      }}>
      <HStack w={'100%'} h={'100%'}>
        <Animated.View
          entering={FadeIn.delay(200)}
          exiting={FadeOut.delay(0)}
          style={{
            width: '20%',
            height: '100%',
          }}>
          <Pressable
            onPress={() => setAccountDrawerOpen(false)}
            w={'100%'}
            h={'100%'}
            bgColor={backgroundColor}
            opacity={0.75}
          />
        </Animated.View>

        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutRight.delay(150)}
          style={{
            width: '80%',
            height: '100%',
          }}>
          <Box bgColor={backgroundColor} w={'100%'} h={'100%'} pt={12} px={4}>
            {account && <AccountDrawerHeader account={account} />}

            <AccountDrawerButtonStack />
            <AccountDrawerFooter />
          </Box>
        </Animated.View>
      </HStack>
    </Animated.View>
  );
};

export default AccountDrawer;
