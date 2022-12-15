import React from 'react';
import {ContentType, IFeedData} from '../../../../models/Content';
import {SharedElement} from 'react-navigation-shared-element';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PostVideoWrapper} from '../../../atoms/main/home/post/PostVideoWrapper';
import {useNavigation} from '@react-navigation/native';
import {PostAuthorDetails} from '../../../atoms/main/home/post/PostAuthorDetails';
import {PostActionStack} from '../post/PostActionStack';
import {PostContentAudioControl} from '../../../atoms/main/home/post/PostContentAudioControl';
import {PostScrollIndicator} from '../post/PostScrollIndicator';
import {getCurrentContentCarouselIndex} from '../../../../data/Content';
import {ExerciseSummaryCard} from '../../training/ExerciseSummaryCard';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';
import {HStack, Pressable, ScrollView, View} from 'native-base';

interface IPostFeedItemProps {
  suspended?: boolean;
  width?: number;
  height?: number;
  data: IFeedData;
}

const PostFeedItem = ({
  suspended = true,
  width,
  height,
  data,
}: IPostFeedItemProps): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isMuted, setMuted] = React.useState(true);
  const [carouselIndex, setCarouselIndex] = React.useState(1);

  const screenWidth = Dimensions.get('screen').width;
  const cardWidth = width ?? screenWidth;
  const cardHeight = height ?? cardWidth * 1.33;
  const cardGap = 4;
  const cardHalfGap = cardGap / 2;
  const snapToOffsets = data.content?.map((_, i) => {
    return cardWidth * i + cardHalfGap * i;
  });

  /**
   * Returns the current index position in the scrollview
   */
  const getCurrentPage = React.useCallback(
    (x: number) => {
      const contentSize = (data.content && data.content.length) ?? 0;

      const contentLength = data.trainingSession
        ? contentSize + 1
        : contentSize;

      return getCurrentContentCarouselIndex(
        x,
        contentLength,
        cardWidth,
        cardGap,
      );
    },
    [cardWidth, data.content, data.trainingSession],
  );

  /**
   * Handles navigation to the post details screen with the provided
   * data as the route params
   */
  const handleDetailsExpand = React.useCallback(() => {
    navigation.navigate('MainPostDetails', {
      data: data,
    });
  }, [data, navigation]);

  /**
   * Handles calculating the current index and updating state if needed
   *
   * Also handles the firing of the onIndexUpdate callback for event
   * manipulation and listening.
   */
  const handleIndexChange = React.useCallback(
    (scrollPos: number) => {
      const currentPage = getCurrentPage(scrollPos);

      if (currentPage !== carouselIndex) {
        setCarouselIndex(currentPage);
      }
    },
    [carouselIndex, getCurrentPage],
  );

  return (
    <View w={'100%'} h={cardHeight} p={0} m={0}>
      <PostAuthorDetails
        avatarUri={
          'https://media.discordapp.net/attachments/948293251947987075/1048226488937365515/unknown.png'
        }
        verified={true}
        username={data.author.username}
        onPress={() => console.log(data.author.id)}
      />

      <PostActionStack
        attributes={{
          isLiked: true,
          likeCount: 10,
          commentCount: 24,
        }}
        onLike={() => console.log('onLike')}
        onComment={() => console.log('onComment')}
        onMore={() => console.log('onMore')}
      />

      {data.content && data.content.length > 1 && (
        <PostScrollIndicator
          index={carouselIndex - 1}
          size={data.content.length}
        />
      )}

      {data.trainingSession && (
        <ExerciseSummaryCard session={data.trainingSession} />
      )}

      {data.content && data.content.length > 0 && (
        <ScrollView
          scrollEnabled={data.content.length > 1 && !suspended}
          horizontal={true}
          w={'100%'}
          h={cardHeight}
          pagingEnabled={true}
          flex={1}
          contentContainerStyle={{flexGrow: 1}}
          directionalLockEnabled={true}
          disableIntervalMomentum={true}
          scrollToOverflowEnabled={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={250}
          decelerationRate={0}
          overScrollMode={'never'}
          snapToAlignment={'center'}
          snapToOffsets={snapToOffsets}
          onScroll={e => handleIndexChange(e.nativeEvent.contentOffset.x)}>
          <HStack space={cardGap}>
            {data.content.map((entry, index) => {
              if (entry.type === ContentType.IMAGE) {
                return (
                  <Pressable
                    key={entry.destination}
                    onPress={() => handleDetailsExpand()}>
                    <SharedElement id={`post-item-${data.id}-${index}`}>
                      <FastImage
                        source={{uri: entry.destination}}
                        style={{
                          width: cardWidth - 16,
                          height: cardHeight,
                          borderRadius: 12,
                        }}
                      />
                    </SharedElement>
                  </Pressable>
                );
              }

              return (
                <Pressable
                  key={entry.destination}
                  onPress={() => handleDetailsExpand()}>
                  <SharedElement
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 2,
                    }}
                    id={`post-item-volume-controller-${data.id}-${index}`}>
                    <PostContentAudioControl
                      muted={isMuted}
                      onAudioToggle={() => setMuted(!isMuted)}
                    />
                  </SharedElement>

                  <SharedElement id={`post-item-${data.id}-${index}`}>
                    <PostVideoWrapper
                      muted={isMuted || carouselIndex - 1 !== index}
                      paused={suspended || carouselIndex - 1 !== index}
                      uri={entry.destination}
                      styleProps={{
                        width: cardWidth - 16 ?? '100%',
                        height: '100%',
                        borderRadius: 12,
                      }}
                    />
                  </SharedElement>
                </Pressable>
              );
            })}
          </HStack>
        </ScrollView>
      )}
    </View>
  );
};

const propsAreEqual = (
  prevProps: Readonly<IPostFeedItemProps>,
  nextProps: Readonly<IPostFeedItemProps>,
): boolean => {
  if (prevProps.suspended !== nextProps.suspended) {
    return false;
  }

  return true;
};

export default React.memo(PostFeedItem, propsAreEqual);
