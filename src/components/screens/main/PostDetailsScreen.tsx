import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {ContentType, IFeedData} from '../../../models/Content';
import {SharedElement} from 'react-navigation-shared-element';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ILocation, LocationType} from '../../../models/Location';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {PostContentAudioControl} from '../../atoms/main/home/post/PostContentAudioControl';
import {isSmallScreen} from '../../../utils/DeviceUtil';
import {ExpandedPostAuthorDetails} from '../../atoms/main/home/post/details/ExpandedPostAuthorDetails';
import {ExpandedPostHeader} from '../../atoms/main/home/post/details/ExpandedPostHeader';
import {ExpandedPostActionStack} from '../../atoms/main/home/post/details/ExpandedPostActionStack';
import {getMockExerciseData} from '../../../data/Training';
import {ExerciseSummaryCard} from '../../molecules/training/ExerciseSummaryCard';
import {getCurrentContentCarouselIndex} from '../../../data/Content';

import {
  ExerciseInfo,
  ExerciseType,
  ITrainingSession,
  TrainingSessionStatus,
} from '../../../models/Training';

import MainNavigation, {
  MainNavigationScreen,
} from '../../molecules/main/MainNavigation';

import {
  HStack,
  IconButton,
  ScrollView,
  Text,
  View,
  Box,
  useColorModeValue,
} from 'native-base';
import {PostScrollIndicator} from '../../molecules/main/post/PostScrollIndicator';
import {PostVideoWrapper} from '../../atoms/main/home/post/PostVideoWrapper';

type PostDetailsScreenProps = {
  route: RouteProp<{params: {data: IFeedData}}, 'params'>;
};

export const PostDetailsScreen = ({route}: PostDetailsScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {data} = route.params;

  const [carouselIndex, setCarouselIndex] = React.useState(1);
  const [isMuted, setMuted] = React.useState(true);

  const scrollRef = React.useRef<any>(null);

  const isSmallDevice = isSmallScreen();
  const cardWidth = Dimensions.get('screen').width;
  const cardHeight = isSmallDevice ? cardWidth : cardWidth * 1.33;
  const cardGap = 4;

  const mockLocation: ILocation = {
    id: '0',
    author: '0',
    name: 'PROTOGYM',
    description: 'Powerlifting Gym in Henderson, NV',
    type: LocationType.GYM,
  };

  const textColor = useColorModeValue('core.text.light', 'core.text.dark');
  const closeButtonBgColor = 'rgba(0,0,0,0.5)';
  const closeButtonPressedBgColor = 'rgba(0,0,0,0.75)';
  const closeButtonIconColor = 'white';

  const getMockTrainingSession = React.useCallback(() => {
    const benchpressData: ExerciseInfo = {
      id: '0',
      name: 'Benchpress',
      type: ExerciseType.WEIGHTED_REPS,
      verified: true,
    };

    const pullupData: ExerciseInfo = {
      id: '1',
      name: 'Pullups',
      type: ExerciseType.REPS,
      verified: true,
    };

    const sprintData: ExerciseInfo = {
      id: '2',
      name: '100m Sprint',
      type: ExerciseType.DISTANCE_TIME,
      verified: true,
    };

    const mockBench = getMockExerciseData([benchpressData, pullupData]);
    const mockSprint = getMockExerciseData([sprintData]);

    const result: ITrainingSession = {
      id: '0',
      author: '0',
      status: TrainingSessionStatus.COMPLETED,
      exercises: [
        {...mockBench, id: '0'},
        {...mockBench, id: '1'},
        {...mockBench, id: '2'},
        {...mockSprint, id: '3'},
      ],
    };

    return result;
  }, []);

  /**
   * Handles navigating back to the main feed screen
   */
  const handleBack = React.useCallback(() => {
    navigation.navigate('MainFeed');
  }, [navigation]);

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
   * Handles calculating the current index and updating state if needed
   *
   * Also handles the firing of the onIndexUpdate callback for event
   * manipulation and listening.
   */
  const handleIndexChange = React.useCallback(
    (scrollPos: number) => {
      const currentPage = getCurrentPage(scrollPos);

      if (currentPage !== carouselIndex) {
        console.log(currentPage);
        setCarouselIndex(currentPage);
      }
    },
    [carouselIndex, getCurrentPage],
  );

  return (
    <View p={0} m={0} w={'100%'} h={'100%'}>
      <MainNavigation current={MainNavigationScreen.FEED} />

      <Animated.View
        entering={FadeIn.delay(400)}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: isSmallDevice ? 32 : 48,
          right: 16,
        }}>
        <IconButton
          onPress={() => handleBack()}
          size={'xs'}
          borderRadius={'full'}
          bgColor={closeButtonBgColor}
          _pressed={{
            bgColor: closeButtonPressedBgColor,
          }}
          _icon={{
            as: MaterialIcons,
            name: 'close',
            size: 6,
            color: closeButtonIconColor,
          }}
        />
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        contentContainerStyle={{paddingBottom: 128}}>
        <Box zIndex={2} position={'absolute'} top={cardHeight} w={'100%'}>
          <PostScrollIndicator
            index={carouselIndex}
            size={data.content?.length ?? 0}
          />
        </Box>

        <ScrollView
          scrollEnabled={data.content && data.content.length > 1}
          ref={scrollRef}
          w={'100%'}
          maxH={cardHeight}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={cardWidth}
          snapToAlignment={'center'}
          scrollEventThrottle={250}
          onScroll={e => handleIndexChange(e.nativeEvent.contentOffset.x)}>
          <HStack>
            {data.content?.map((entry, index) => {
              if (entry.type === ContentType.IMAGE) {
                return (
                  <SharedElement
                    key={entry.destination}
                    id={`post-item-${data.id}-${index}`}>
                    <FastImage
                      source={{uri: entry.destination}}
                      style={{width: cardWidth, height: cardHeight}}
                    />
                  </SharedElement>
                );
              }

              return (
                <Box w={'100%'} h={'100%'}>
                  <SharedElement
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: isSmallDevice ? 32 : 42,
                      right: 56,
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
                      paused={carouselIndex - 1 !== index}
                      uri={entry.destination}
                      styleProps={{
                        width: cardWidth ?? '100%',
                        height: '100%',
                      }}
                    />
                  </SharedElement>
                </Box>
              );
            })}
          </HStack>
        </ScrollView>

        <Animated.View
          entering={FadeIn.delay(250)}
          style={{paddingHorizontal: 8, marginTop: 8}}>
          <HStack justifyContent={'space-between'}>
            <ExpandedPostAuthorDetails
              author={{...data.author, verified: true}}
              cardHeight={cardHeight}
              onPress={() => console.log('onPress: ' + data.author.id)}
            />

            <ExpandedPostActionStack
              cardHeight={cardHeight}
              onComment={() => console.log('onComment')}
              onMore={() => console.log('onMore')}
              onLike={() => console.log('onLike')}
              attributes={{
                isLiked: data.isLiked,
                likeCount: data.likes,
                commentCount: data.comments,
              }}
            />
          </HStack>

          <ExpandedPostHeader
            title={'Test title'}
            date={data.createdAt}
            location={mockLocation}
          />

          {data.text && (
            <Text mt={2} color={textColor}>
              {data.text}
            </Text>
          )}

          <ExerciseSummaryCard session={getMockTrainingSession()} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};
