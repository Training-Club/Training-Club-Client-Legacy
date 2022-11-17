import React from 'react';
import {PostItem} from './PostItem';
import {IFeedData} from '../../../models/Content';
import {Box, Heading, VStack} from 'native-base';

interface IPostFeedProps {
  scrollEnabled?: boolean;
  currentPosition: {
    post: number;
    index: number;
  };

  data: IFeedData[];
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
              key={entry.content[0].destination}
              scrollEnabled={scrollEnabled}
              content={entry.content}
              username={entry.author.username}
              position={{post: i}}
              location={entry.location}
              trainingSession={entry.trainingSession}
              onIndexUpdate={onIndexUpdate}
              currentPosition={currentPosition}
              attributes={{
                likeCount: entry.likes,
                commentCount: entry.comments,
                liked: entry.isLiked,
              }}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default PostFeed;
