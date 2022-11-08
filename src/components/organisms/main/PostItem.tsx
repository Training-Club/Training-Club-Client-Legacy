import React from 'react';
import {Dimensions} from 'react-native';
import {PostActionStack} from '../../molecules/main/post/PostActionStack';
import {PostAuthorDetails} from '../../atoms/main/home/post/PostAuthorDetails';
import {PostCarousel} from '../../molecules/main/post/PostCarousel';
import {PostScrollIndicator} from '../../molecules/main/post/PostScrollIndicator';
import {PostContentWrapper} from '../../atoms/main/home/post/PostContentWrapper';
import {ITrainingSession} from '../../../models/Training';
import {ILocation} from '../../../models/Location';
import {IContentItem} from '../../../models/Content';
import {Box, IBoxProps} from 'native-base';

interface IPostItemProps {
  content: IContentItem[];

  currentPosition: {
    post: number;
    index: number;
  };

  position: {
    post: number;
  };

  trainingSession?: ITrainingSession;
  location?: ILocation;
  onIndexUpdate?: (page: number) => void;

  attributes?: {
    liked?: boolean;
    likeCount?: number;
    commentCount?: number;
  };

  style?: IBoxProps;
}

export const PostItem = ({
  content,
  currentPosition,
  position,
  trainingSession,
  location,
  onIndexUpdate,
  attributes,
  style,
}: IPostItemProps): JSX.Element => {
  const {width} = Dimensions.get('screen');
  const [index, setIndex] = React.useState(1);

  /**
   * Returns true if this post is an album
   */
  const isAlbum = React.useCallback(() => {
    return content.length > 1;
  }, [content.length]);

  /**
   * Callback when the post like button is pressed
   */
  const onLike = React.useCallback(() => {
    console.log('onLike called');
  }, []);

  /**
   * Callback when the post comment button is pressed
   */
  const onComment = React.useCallback(() => {
    console.log('onComment called');
  }, []);

  /**
   * Callback when the post more button is pressed
   */
  const onMore = React.useCallback(() => {
    console.log('onMore called');
  }, []);

  /**
   * Callback when the author name is pressed
   */
  const onAuthorPress = React.useCallback(() => {
    console.log('onAuthorPress called');
  }, []);

  /**
   * Callback when the index changes in the scroll view
   */
  const onIndexChange = React.useCallback(
    (i: number) => {
      if (i === index) {
        return;
      }

      setIndex(i);

      if (onIndexUpdate) {
        onIndexUpdate(i);
      }
    },
    [index, onIndexUpdate],
  );

  return (
    <Box w={'100%'} h={width * 1.33} borderRadius={12} {...style}>
      <PostAuthorDetails
        username={'john'}
        avatarUri={'https://source.unsplash.com/random/?strong,man'}
        location={location}
        onPress={onAuthorPress}
      />

      <PostActionStack
        onLike={onLike}
        onComment={onComment}
        onMore={onMore}
        attributes={{
          likeCount: attributes?.likeCount,
          commentCount: attributes?.commentCount,
          isLiked: attributes?.liked,
        }}
      />

      {isAlbum() && (
        <>
          <PostScrollIndicator
            index={index}
            size={trainingSession ? content.length + 1 : content.length}
          />

          <PostCarousel
            currentPosition={currentPosition}
            position={{post: position.post, index: index}}
            content={content}
            trainingSession={trainingSession}
            location={location}
            contentWidth={width}
            onIndexChange={onIndexChange}
          />
        </>
      )}

      {!isAlbum() && (
        <PostContentWrapper
          content={content[0]}
          currentPosition={currentPosition}
          position={{post: position.post, index: index}}
        />
      )}
    </Box>
  );
};
