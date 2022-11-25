import React from 'react';
import {Dimensions} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
import {PostActionStack} from '../../molecules/main/post/PostActionStack';
import {PostAuthorDetails} from '../../atoms/main/home/post/PostAuthorDetails';
import {PostCarousel} from '../../molecules/main/post/PostCarousel';
import {PostScrollIndicator} from '../../molecules/main/post/PostScrollIndicator';
import {PostContentWrapper} from '../../atoms/main/home/post/PostContentWrapper';
import {createLike, removePostLike} from '../../../requests/Content';
import {ITrainingSession} from '../../../models/Training';
import {ILocation} from '../../../models/Location';
import {IContentItem, PostItemType} from '../../../models/Content';
import {Box, IBoxProps} from 'native-base';
import useAccountStore from '../../../store/AccountStore';

interface IPostItemProps {
  scrollEnabled?: boolean;

  postId: string;
  content: IContentItem[];
  username: string;

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
  scrollEnabled,
  postId,
  username,
  content,
  currentPosition,
  position,
  trainingSession,
  location,
  onIndexUpdate,
  attributes,
  style,
}: IPostItemProps): JSX.Element => {
  const accessToken = useAccountStore(state => state.accessToken);
  const [index, setIndex] = React.useState(1);

  const [likes, setLikes] = React.useState(attributes?.likeCount ?? 0);
  const [isLiked, setLiked] = React.useState(attributes?.liked ?? false);

  const {width} = Dimensions.get('screen');

  /**
   * Handles performing the HTTP request to add/remove a like
   *
   * Request performs on a 1sec debounce to prevent spammed requests
   */
  const handleLikeProcessing = useDebouncedCallback(isLikedDebounced => {
    if (isLikedDebounced) {
      createLike(postId, PostItemType.POST, accessToken).catch(err => {
        console.error('failed to create like: ' + err);
      });

      return;
    }

    removePostLike(postId, accessToken).catch(err => {
      console.error('failed to remove like: ' + err);
    });
  }, 1000);

  /**
   * Returns true if this post is an album
   */
  const isAlbum = React.useCallback(() => {
    return content.length > 1;
  }, [content.length]);

  /**
   * Callback when the post like button is pressed
   */
  const onLike = React.useCallback(async () => {
    const prev = isLiked;
    setLiked(!prev);
    setLikes(prevState => (prev ? prevState - 1 : prevState + 1));
    handleLikeProcessing(!prev);
  }, [handleLikeProcessing, isLiked]);

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
        username={username}
        avatarUri={'https://source.unsplash.com/random/?strong,man'}
        location={location}
        onPress={onAuthorPress}
      />

      <PostActionStack
        onLike={onLike}
        onComment={onComment}
        onMore={onMore}
        attributes={{
          likeCount: likes,
          commentCount: attributes?.commentCount,
          isLiked: isLiked,
        }}
      />

      {isAlbum() && (
        <>
          <PostScrollIndicator
            index={index}
            size={trainingSession ? content.length + 1 : content.length}
          />

          <PostCarousel
            scrollEnabled={scrollEnabled}
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
          paused={!scrollEnabled}
          content={content[0]}
          currentPosition={currentPosition}
          position={{post: position.post, index: index}}
        />
      )}
    </Box>
  );
};
