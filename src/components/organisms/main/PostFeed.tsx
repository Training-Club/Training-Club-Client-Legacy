import React from 'react';
import {PostItem} from './PostItem';
import {ContentType, IContentItem} from '../../../models/Content';

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

import {ILocation} from '../../../models/Location';

import {Box, Heading, VStack} from 'native-base';

const PostFeed = (): JSX.Element => {
  // TODO: Sample data, remove this
  const sampleLocation: ILocation = {
    id: '#',
    author: '',
    name: 'PROTOGYM',
    description: '',
  };

  const singleImageContent: IContentItem[] = [
    {
      destination: 'https://source.unsplash.com/random/?strong,man',
      type: ContentType.IMAGE,
    },
  ];

  const sampleContent: IContentItem[] = [
    {
      destination: 'https://source.unsplash.com/random/?strong,man',
      type: ContentType.IMAGE,
    },
    {
      destination: 'https://source.unsplash.com/random/?strong,man',
      type: ContentType.IMAGE,
    },
    {
      destination: 'https://source.unsplash.com/random/?strong,man',
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

  return (
    <Box w={'100%'}>
      <Heading ml={2} mb={2}>
        {"What's new"}
      </Heading>

      <VStack space={8} mb={32}>
        <PostItem
          content={sampleContent}
          location={sampleLocation}
          attributes={{likeCount: 103, commentCount: 12, liked: true}}
        />

        <PostItem
          content={sampleContent}
          trainingSession={sampleTrainingSession}
          location={sampleLocation}
        />

        <PostItem content={sampleContent} />
        <PostItem content={singleImageContent} />
      </VStack>
    </Box>
  );
};

export default PostFeed;
