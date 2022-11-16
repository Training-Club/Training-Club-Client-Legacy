import React from 'react';
import {Dimensions} from 'react-native';
import GreetingText from '../../atoms/main/home/GreetingText';
import useAccountStore from '../../../store/AccountStore';
import AccountDrawer from '../../organisms/main/AccountDrawer';
import PostFeed, {PostFeedItem} from '../../organisms/main/PostFeed';
import {useNavigation} from '@react-navigation/native';
import {ILocation} from '../../../models/Location';
import {ContentType, IContentItem} from '../../../models/Content';
import {HStack, ScrollView, View, useColorModeValue} from 'native-base';

import {
  AdditionalExerciseType,
  ExerciseType,
  ITrainingSession,
  TrainingSessionStatus,
} from '../../../models/Training';

import {
  DistanceMeasurement,
  MeasurementSystem,
} from '../../../models/Measurement';

const FeedScreen = () => {
  const account = useAccountStore(state => state.account);
  const navigation = useNavigation();
  const [currentPostPosition, setCurrentPostPosition] = React.useState(0);
  const [currentIndexPosition, setCurrentIndexPosition] = React.useState(0);
  const [isSuspended, setSuspended] = React.useState(false);

  const feedOffset = 100.0;
  const feedCardHeight = Dimensions.get('screen').width * 1.33;
  const name = account?.profile?.name ?? account?.username;
  const time = new Date();

  const bgColor = useColorModeValue(
    'core.background.light',
    'core.background.dark',
  );

  // TODO: Sample data, remove this
  const sampleLocation: ILocation = {
    id: '#',
    author: '',
    name: 'PROTOGYM',
    description: '',
  };

  const sampleContent: IContentItem[] = [
    {
      destination:
        'https://media.discordapp.net/attachments/462762564133060621/1038164214994436176/IMG_0616.jpg?width=702&height=936',
      type: ContentType.IMAGE,
    },
    {
      destination:
        'https://cdn.discordapp.com/attachments/481691188739702797/1035019561021481072/RPReplay_Final1663101410.mov',
      type: ContentType.VIDEO,
    },
    {
      destination:
        'https://cdn.discordapp.com/attachments/462762564133060621/1035019135853281280/trim.8F5FB98A-FB19-4F11-B272-AED7BDAD0AAD.mov',
      type: ContentType.VIDEO,
    },
  ];

  const sampleTrainingSession: ITrainingSession = {
    id: '0',
    author: '0',
    sessionName: 'Powerlifting D4W3',
    timestamp: new Date('2021-10-29'),
    status: TrainingSessionStatus.COMPLETED,
    exercises: [
      {
        id: '0',
        exerciseName: 'Benchpress',
        addedAt: new Date(),
        values: {
          reps: 8,
          weight: {
            measurement: MeasurementSystem.IMPERIAL,
            plateCounterEnabled: false,
            value: 135,
          },
        },
        performed: true,
        type: ExerciseType.WEIGHTED_REPS,
        additionalExercises: [
          {
            exerciseName: 'Incline Dumbbell Press',
            addedAt: new Date(),
            variant: AdditionalExerciseType.SUPERSET,
            type: ExerciseType.WEIGHTED_REPS,
            performed: true,
            values: {
              reps: 8,
              weight: {
                measurement: MeasurementSystem.IMPERIAL,
                plateCounterEnabled: false,
                value: 65,
              },
            },
          },
        ],
      },
      {
        id: '1',
        exerciseName: 'Benchpress',
        addedAt: new Date(),
        values: {
          reps: 5,
          weight: {
            measurement: MeasurementSystem.IMPERIAL,
            plateCounterEnabled: false,
            value: 225,
          },
        },
        additionalExercises: [
          {
            exerciseName: 'Incline Dumbbell Press',
            addedAt: new Date(),
            variant: AdditionalExerciseType.SUPERSET,
            type: ExerciseType.WEIGHTED_REPS,
            performed: true,
            values: {
              reps: 8,
              weight: {
                measurement: MeasurementSystem.IMPERIAL,
                plateCounterEnabled: false,
                value: 65,
              },
            },
          },
        ],
        performed: true,
        type: ExerciseType.WEIGHTED_REPS,
      },
      {
        id: '2',
        exerciseName: 'Run',
        addedAt: new Date(),
        values: {
          distance: {
            value: 3,
            measurement: DistanceMeasurement.MILE,
          },
          time: {
            value: {
              hours: 0,
              minutes: 10,
              seconds: 30,
              milliseconds: 0,
            },
            timeRenderMillis: false,
          },
        },
        performed: true,
        type: ExerciseType.DISTANCE_TIME,
      },
    ],
  };

  const samplePosts: PostFeedItem[] = [
    {
      content: sampleContent,
      trainingSession: sampleTrainingSession,
      location: sampleLocation,
    },
  ];

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

  // TODO: Handle this properly
  if (!account) {
    return null;
  }

  return (
    <AccountDrawer account={account} onTranslate={onAccountDrawerTranslate}>
      <View px={2} w={'100%'}>
        <ScrollView
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
            data={samplePosts}
            onIndexUpdate={onIndexUpdate}
          />
        </ScrollView>
      </View>
    </AccountDrawer>
  );
};

export default FeedScreen;
