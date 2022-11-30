import React from 'react';
import {ITrainingSession} from '../../../../models/Training';
import {ILocation} from '../../../../models/Location';
import {PostTrainingSessionTitle} from '../../../atoms/main/home/post/PostTrainingSessionTitle';
import {getAsGroupedExercises} from '../../../../data/Training';
import {PostTrainingSessionExercise} from '../../../atoms/main/home/post/PostTrainingSessionExercise';
import {Box, VStack, useColorModeValue} from 'native-base';

interface IPostTrainingSessionCardProps {
  trainingSession: ITrainingSession;
  location?: ILocation;
  contentWidth?: number;
}

export const PostTrainingSessionCard = ({
  trainingSession,
  location,
  contentWidth,
}: IPostTrainingSessionCardProps): JSX.Element => {
  const groupedExercises = getAsGroupedExercises(trainingSession.exercises);

  const bgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  return (
    <Box
      w={contentWidth ?? '100%'}
      h={'100%'}
      borderRadius={'12px'}
      bgColor={bgColor}
      p={2}
      pt={12}>
      <PostTrainingSessionTitle
        sessionName={trainingSession.sessionName}
        location={location}
        date={trainingSession.timestamp}
      />

      <VStack space={4}>
        {groupedExercises &&
          groupedExercises.map(groupedExercise => (
            <PostTrainingSessionExercise
              key={groupedExercise.exercises[0].id}
              groupedExercise={groupedExercise}
            />
          ))}
      </VStack>
    </Box>
  );
};
