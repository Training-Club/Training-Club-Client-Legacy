import React from 'react';
import {PostItem} from './PostItem';
import {IContentItem} from '../../../models/Content';
import {ITrainingSession} from '../../../models/Training';
import {ILocation} from '../../../models/Location';
import {Box, Heading, VStack} from 'native-base';

export type PostFeedItem = {
  scrollEnabled?: boolean;
  content: IContentItem[];
  location?: ILocation;
  trainingSession?: ITrainingSession;
};

interface IPostFeedProps {
  scrollEnabled?: boolean;
  currentPosition: {
    post: number;
    index: number;
  };

  data?: PostFeedItem[];
  onIndexUpdate?: (page: number) => void;
}

const PostFeed = ({
  scrollEnabled = true,
  currentPosition,
  data,
  onIndexUpdate,
}: IPostFeedProps): JSX.Element => {
  return (
    <Box w={'100%'}>
      <Heading ml={2} mb={2}>
        {"What's new"}
      </Heading>

      <VStack space={8} mb={32}>
        {data &&
          data.map((entry, i) => (
            <PostItem
              scrollEnabled={scrollEnabled}
              content={entry.content}
              position={{post: i}}
              location={entry.location}
              trainingSession={entry.trainingSession}
              onIndexUpdate={onIndexUpdate}
              currentPosition={currentPosition}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default PostFeed;
