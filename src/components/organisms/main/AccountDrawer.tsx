import React, {useEffect, useState} from 'react';
import {IAccount} from '../../../models/Account';
import AccountDrawerButtonStack from '../../molecules/main/account-drawer/AccountDrawerButtonStack';
import {AccountDrawerVersionInfo} from '../../atoms/main/account-drawer/AccountDrawerVersionInfo';
import {getBothConnectionCounts} from '../../../requests/Follow';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {useAccountContext} from '../../../context/account/AccountContext';
import {Dimensions} from 'react-native';
import AccountDrawerHeader from '../../molecules/main/account-drawer/AccountDrawerHeader';
import {Box, View, useColorModeValue} from 'native-base';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface IAccountDrawerProps {
  account: IAccount;
  children: any;
}

const AccountDrawer = ({account, children}: IAccountDrawerProps) => {
  const {accessToken} = useAccountContext();

  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const {setPushdownConfig} = usePushdownContext();

  const {width} = Dimensions.get('screen');
  const translationThreshold = -(width * 0.9);
  const minTranslationDistance = -(width * 0.4);
  const minVelocityThreshold = -1000.0;
  const translateX = useSharedValue(0);

  const bgColor = useColorModeValue(
    'core.background.light',
    'core.background.dark',
  );

  const springConfig = React.useMemo(() => {
    return {overshootClamping: true, mass: 0.8, stiffness: 200.0};
  }, []);

  const panGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        if (event.translationX > 0.0) {
          translateX.value = withSpring(0, springConfig);
          return;
        }

        translateX.value = withSpring(event.translationX, springConfig);
      },

      onEnd: event => {
        if (event.velocityX <= minVelocityThreshold) {
          translateX.value = withSpring(translationThreshold, springConfig);
          return;
        }

        if (translateX.value >= minTranslationDistance) {
          translateX.value = withSpring(0, springConfig);
          return;
        }

        if (
          translateX.value < translationThreshold ||
          translateX.value + event.translationX < translationThreshold
        ) {
          translateX.value = withSpring(translationThreshold, springConfig);
          return;
        }
      },
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    zIndex: 10,
    width: '100%',
    height: '100%',
  }));

  useEffect(() => {
    getBothConnectionCounts(account.id, accessToken)
      .then(connectionCounts => {
        if (connectionCounts.followers !== followerCount) {
          setFollowerCount(connectionCounts.followers);
        }

        if (connectionCounts.following !== followingCount) {
          setFollowingCount(connectionCounts.following);
        }
      })
      .catch(() => {
        setPushdownConfig({
          title: 'Something went wrong.',
          body: 'Failed to load follower/following counts for your profile and may not be displayed accurately.',
          status: 'error',
          duration: 3000,
          show: true,
        });
      });
  }, [
    accessToken,
    account.id,
    followerCount,
    followingCount,
    setPushdownConfig,
  ]);

  return (
    <View position={'absolute'} top={0} left={0} w={'100%'} h={'100%'}>
      <PanGestureHandler
        onGestureEvent={panGestureHandler}
        activeOffsetX={[-10, 10]}>
        <Animated.View style={[animatedStyle]}>{children}</Animated.View>
      </PanGestureHandler>

      <Box
        position={'absolute'}
        top={0}
        right={0}
        px={4}
        py={16}
        w={'90%'}
        h={'100%'}
        bgColor={bgColor}>
        <AccountDrawerHeader
          account={account}
          data={{followerCount: followerCount, followingCount: followingCount}}
        />

        <AccountDrawerButtonStack
          options={{
            hasNotifications:
              true /* TODO: Remove this, for testing purposes */,
          }}
        />

        <AccountDrawerVersionInfo />
      </Box>
    </View>
  );
};

export default AccountDrawer;
