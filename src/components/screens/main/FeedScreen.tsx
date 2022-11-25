import React from 'react';
import {IFeedData} from '../../../models/Content';
import {Dimensions, RefreshControl} from 'react-native';
import GreetingText from '../../atoms/main/home/GreetingText';
import useAccountStore from '../../../store/AccountStore';
import {getFeedContent} from '../../../requests/Discovery';
import AccountDrawer from '../../organisms/main/AccountDrawer';
import PostFeed from '../../organisms/main/PostFeed';
import {useNavigation} from '@react-navigation/native';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {HStack, ScrollView, View, useColorModeValue} from 'native-base';

const FeedScreen = () => {
  const account = useAccountStore(state => state.account);
  const accessToken = useAccountStore(state => state.accessToken);
  const navigation = useNavigation();
  const {setPushdownConfig} = usePushdownContext();

  const [content, setContent] = React.useState<IFeedData[]>([]);
  const [currentPostPosition, setCurrentPostPosition] = React.useState(0);
  const [currentIndexPosition, setCurrentIndexPosition] = React.useState(0);
  const [isSuspended, setSuspended] = React.useState(false);
  const [isRefreshing, setRefreshing] = React.useState(false);

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
  const getContent = React.useCallback((page?: number) => {
    getFeedContent(page ?? 0, accessToken)
      .then(data => {
        setContent(data);
      })
      .catch(() => {
        setPushdownConfig({
          status: 'error',
          title: 'An error has occurred',
          body: 'We were unable to fetch your feed content',
          duration: 5000,
          show: true,
        });
      });
  }, []);

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
    <AccountDrawer account={account} onTranslate={onAccountDrawerTranslate}>
      <View px={2} w={'100%'}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => getContent()}
              refreshing={isRefreshing}
              title={'Loading Content...'}
            />
          }
          scrollEnabled={!isSuspended}
          w={'100%'}
          h={'100%'}
          shadow={6}
          bgColor={bgColor}
          showsVerticalScrollIndicator={false}
          onScroll={e => onScrollUpdate(e.nativeEvent.contentOffset.y)}
          scrollEventThrottle={500}>
          {name && (
            <HStack w={'100%'} px={2} justifyContent={'space-between'}>
              <GreetingText name={name} time={time} />
            </HStack>
          )}

          <PostFeed
            scrollEnabled={!isSuspended}
            currentPosition={{
              post: currentPostPosition,
              index: currentIndexPosition,
            }}
            data={content}
            onIndexUpdate={onIndexUpdate}
          />
        </ScrollView>
      </View>
    </AccountDrawer>
  );
};

export default FeedScreen;
