import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {ContentType, IFeedData} from '../../../models/Content';
import {SharedElement} from 'react-navigation-shared-element';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ILocation, LocationType} from '../../../models/Location';
import Video from 'react-native-video';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {isSmallScreen} from '../../../utils/DeviceUtil';
import {ExpandedPostAuthorDetails} from '../../atoms/main/home/post/details/ExpandedPostAuthorDetails';
import {ExpandedPostHeader} from '../../atoms/main/home/post/details/ExpandedPostHeader';
import {ExpandedPostActionStack} from '../../atoms/main/home/post/details/ExpandedPostActionStack';
import {getMockExerciseData} from '../../../data/Training';
import {ExerciseSummaryCard} from '../../molecules/training/ExerciseSummaryCard';

import {
  ExerciseInfo,
  ExerciseType,
  ITrainingSession,
  TrainingSessionStatus,
} from '../../../models/Training';

import MainNavigation, {
  MainNavigationScreen,
} from '../../molecules/main/MainNavigation';

import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import {
  HStack,
  IconButton,
  ScrollView,
  Text,
  View,
  useColorModeValue,
} from 'native-base';

// we use react navigation prop mapping here
type PostDetailsScreenProps = {
  route: RouteProp<{params: {data: IFeedData}}, 'params'>;
};

export const PostDetailsScreen = ({route}: PostDetailsScreenProps) => {
  const isSmallDevice = isSmallScreen();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const contentOpacity = useSharedValue(0);
  const {data} = route.params;
  const videoRef = React.useRef<any>(null);
  const scrollRef = React.useRef<any>(null);
  const cardWidth = Dimensions.get('screen').width;
  const cardHeight = isSmallDevice ? cardWidth : cardWidth * 1.33;

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

  const bgColor = useColorModeValue(
    'core.background.light',
    'core.background.dark',
  );

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

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
      exercises: [mockBench, mockBench, mockBench, mockSprint],
    };

    return result;
  }, []);

  const handleBack = React.useCallback(() => {
    navigation.navigate('MainFeed');
  }, [navigation]);

  React.useEffect(() => {
    contentOpacity.value = withDelay(500, withTiming(1, {duration: 250}));
  }, [contentOpacity]);

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
        mb={32}>
        <ScrollView
          ref={scrollRef}
          w={'100%'}
          maxH={cardHeight}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={cardWidth}
          snapToAlignment={'center'}>
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
