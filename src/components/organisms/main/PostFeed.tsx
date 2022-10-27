import React from 'react';
import {PostItem} from './PostItem';
import {ContentType, IContentItem} from '../../../models/Content';
import {Box, Heading, VStack} from 'native-base';

const PostFeed = (): JSX.Element => {
  // TODO: Sample data, remove this
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
      destination: 'https://source.unsplash.com/random/?strong,man',
      type: ContentType.IMAGE,
    },
    {
      destination:
        'https://cdn.discordapp.com/attachments/354081861909217280/1034333746398253056/-9SqHF5VSwvMxKIs.mp4',
      type: ContentType.VIDEO,
    },
  ];

  return (
    <Box w={'100%'}>
      <Heading ml={2} mb={2}>
        {"What's new"}
      </Heading>

      <VStack space={8} mb={32}>
        <PostItem
          content={sampleContent}
          attributes={{likeCount: 103, commentCount: 12, liked: true}}
        />

        <PostItem content={sampleContent} />
        <PostItem content={sampleContent} />
        <PostItem content={singleImageContent} />
      </VStack>
    </Box>
  );
};

export default PostFeed;
