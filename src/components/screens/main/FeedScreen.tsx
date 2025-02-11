import React from 'react';
import {IFeedData} from '../../../models/Content';
import {AxiosError} from 'axios';
import {Dimensions} from 'react-native';
import GreetingText from '../../atoms/main/home/GreetingText';
import useAccountStore from '../../../store/AccountStore';
import {ActionCardList} from '../../organisms/main/ActionCardList';
import {getFeedContent} from '../../../requests/Discovery';
import {useNavigation} from '@react-navigation/native';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import AccountDrawer from '../../organisms/main/AccountDrawer';
import {PostFeed} from '../../organisms/main/v2/PostFeed';

import MainNavigation, {
  MainNavigationScreen,
} from '../../molecules/main/MainNavigation';

import {HStack, View, useColorModeValue} from 'native-base';

const FeedScreen = () => {
  const account = useAccountStore(state => state.account);
  const accessToken = useAccountStore(state => state.accessToken);

  const [content, setContent] = React.useState<IFeedData[]>([]);
  const [currentPostPosition, setCurrentPostPosition] = React.useState(0);
  const [currentIndexPosition, setCurrentIndexPosition] = React.useState(0);
  const [isSuspended, setSuspended] = React.useState(false);
  const [isRefreshing] = React.useState(false);

  const navigation = useNavigation();
  const {setPushdownConfig} = usePushdownContext();

  const feedOffset = 100.0;
  const feedCardHeight = Dimensions.get('screen').width * 1.33;
  const name = account?.profile?.name ?? account?.username;
  const time = new Date();

  const bgColor = useColorModeValue(
    'core.background.light',
    'core.background.dark',
  );

  /**
   * Reads on current scroll pos and determines which post the user
   * is looking at by adjusting their scroll position with feed offset
   * and padding of each post in the scroll view.
   *
   * If a different post is detected state will be set accordingly.
   */
  const onScrollUpdate = React.useCallback(
    (pos: number) => {
      const predictedViewedPost = Math.round(
        (pos + feedOffset) / (feedCardHeight + 8),
      );

      if (currentPostPosition !== predictedViewedPost) {
        setCurrentPostPosition(predictedViewedPost);
      }
    },
    [currentPostPosition, feedCardHeight],
  );

  /**
   * Performs an index position update when the user changes their current
   * card in the post they are looking at.
   *
   * If a different index is detected state will be set accordingly.
   */
  const onIndexUpdate = React.useCallback(
    (page: number) => {
      if (currentIndexPosition !== page) {
        setCurrentIndexPosition(page);
      }
    },
    [currentIndexPosition],
  );

  /**
   * Callback function that triggers when the account drawers
   * translateX has changed.
   *
   * If the account drawer state has changed state will be updated and
   * scroll views will be locked.
   */
  const onAccountDrawerTranslate = React.useCallback(
    (translation: number) => {
      if (translation === 0) {
        if (isSuspended) {
          setSuspended(false);
        }

        return;
      }

      if (!isSuspended) {
        setSuspended(true);
      }
    },
    [isSuspended],
  );

  /**
   * Populate feed with content
   */
  const getContent = React.useCallback(
    (page?: number) => {
      getFeedContent(page ?? 0, accessToken)
        .then(data => {
          setContent(data);
        })
        .catch(err => {
          const axiosError = err as AxiosError;
          console.log(axiosError.response);

          setPushdownConfig({
            status: 'error',
            title: 'An error has occurred',
            body: 'We were unable to fetch your feed content',
            duration: 5000,
            show: true,
          });
        });
    },
    [accessToken, setPushdownConfig],
  );

  /**
   * Suspend content when screen is unfocused
   */
  React.useEffect(() => {
    const listener = navigation.addListener('blur', () => {
      setSuspended(true);
    });

    return listener;
  }, [navigation]);

  /**
   * Unsuspended content when screen is remounted
   */
  React.useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      setSuspended(false);
    });

    return listener;
  }, [navigation]);

  /**
   * Performs initial content load
   */
  React.useEffect(() => {
    getContent();
  }, [accessToken, getContent, setPushdownConfig]);

  // TODO: Handle this properly
  if (!account) {
    return null;
  }

  return (
    <>
      <MainNavigation current={MainNavigationScreen.FEED} />

      <AccountDrawer account={account} onTranslate={onAccountDrawerTranslate}>
        <View px={2}>
          <PostFeed>
            {name && (
              <HStack w={'100%'} px={2} justifyContent={'space-between'}>
                <GreetingText name={name} time={time} />
              </HStack>
            )}

            <ActionCardList />
          </PostFeed>
        </View>
      </AccountDrawer>
    </>
  );
};

export default FeedScreen;
