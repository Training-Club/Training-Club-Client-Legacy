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
      destination: 'https://cdn.discordapp.com/attachments/481691188739702797/1035019561021481072/RPReplay_Final1663101410.mov',
      type: ContentType.VIDEO,
    },
    {
      destination:
        'https://cdn.discordapp.com/attachments/462762564133060621/1035019135853281280/trim.8F5FB98A-FB19-4F11-B272-AED7BDAD0AAD.mov',
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
