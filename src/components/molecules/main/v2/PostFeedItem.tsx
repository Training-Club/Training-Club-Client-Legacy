import React from 'react';
import {ContentType, IFeedData} from '../../../../models/Content';
import {SharedElement} from 'react-navigation-shared-element';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {PostAuthorDetails} from '../../../atoms/main/home/post/PostAuthorDetails';
import {PostActionStack} from '../post/PostActionStack';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';
import {HStack, Pressable, ScrollView, View} from 'native-base';

interface IPostFeedItemProps {
  width?: number;
  height?: number;
  data: IFeedData;
}

export const PostFeedItem = ({
  width,
  height,
  data,
}: IPostFeedItemProps): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const videoRef = React.useRef<any>(null);
  const screenWidth = Dimensions.get('screen').width;
  const cardWidth = width ?? screenWidth;
  const cardHeight = height ?? cardWidth * 1.33;
  const cardGap = 4;
  const cardHalfGap = cardGap / 2;
  const snapToOffsets = data.content?.map((_, i) => {
    return cardWidth * i + cardHalfGap * i;
  });

  // napToOffsets={[...Array(dataNum.length)].map((x, i) => (i * (this.IMAGE_WIDTH + 2 * this.image_margin) - (this.nishhar * 0.5)))}
  /**
   * Handles navigation to the post details screen with the provided
   * data as the route params
   */
  const handleDetailsExpand = React.useCallback(() => {
    navigation.navigate('MainPostDetails', {
      data: data,
    });
  }, [data, navigation]);

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
        <ScrollView
          scrollEnabled={true}
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
          scrollEventThrottle={100}
          decelerationRate={0}
          overScrollMode={'never'}
          snapToAlignment={'center'}
          snapToOffsets={snapToOffsets}>
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
                  <SharedElement id={`post-item-${data.id}-${index}`}>
                    <Video
                      ref={videoRef}
                      source={{uri: entry.destination}}
                      repeat={true}
                      playInBackground={false}
                      playWhenInactive={false}
                      ignoreSilentSwitch={'ignore'}
                      mixWithOthers={'duck'}
                      resizeMode={'cover'}
                      style={{
                        width: cardWidth ?? '100%',
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
