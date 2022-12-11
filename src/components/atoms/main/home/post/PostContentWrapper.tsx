import React, {useRef} from 'react';
import {PostContentAudioControl} from './PostContentAudioControl';
import {ContentType, IContentItem} from '../../../../../models/Content';
import Video from 'react-native-video';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Box, Image, Spinner, Square, useColorModeValue} from 'native-base';

interface IPostContentWrapperProps {
  content?: IContentItem;
  paused?: boolean;

  currentPosition: {
    post: number;
    index: number;
  };

  position: {
    post: number;
    index: number;
  };

  contentWidth?: number;
}

export const PostContentWrapper = ({
  content,
  paused,
  currentPosition,
  position,
  contentWidth,
}: IPostContentWrapperProps): JSX.Element => {
  const [muted, setMuted] = React.useState(true);
  const [loaded, setLoaded] = React.useState(false);
  const playerRef = useRef<Video>(null);

  const loadingBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const loadingSpinnerColor = useColorModeValue('black', 'white');

  const onToggleMute = React.useCallback(() => {
    setMuted(!muted);
  }, [muted, setMuted]);

  /**
   * Seeks the content back to 0 when the pause value is set to false
   */
  React.useEffect(() => {
    if (!playerRef || !playerRef.current) {
      return;
    }

    if (paused) {
      return;
    }

    playerRef.current.seek(0);
  }, [paused]);

  /**
   * Automatically sets the content as loaded if there is no
   * content to query.
   */
  React.useEffect(() => {
    if (!content) {
      setLoaded(true);
    }
  }, [content]);

  return (
    <Box w={contentWidth ?? '100%'} h={'100%'}>
      {!loaded && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Square
            w={'100%'}
            h={'100%'}
            bgColor={loadingBgColor}
            borderRadius={12}>
            <Spinner size={'lg'} color={loadingSpinnerColor} />
          </Square>
        </Animated.View>
      )}

      {content && content.type === ContentType.IMAGE && (
        <Image
          key={content.destination}
          source={{uri: content.destination}}
          onLoad={() => setLoaded(true)}
          w={contentWidth ?? '100%'}
          h={'100%'}
          alt={content.type}
          borderRadius={'12px'}
        />
      )}

      {content && content.type === ContentType.VIDEO && (
        <>
          <PostContentAudioControl
            muted={muted}
            onAudioToggle={() => onToggleMute()}
          />

          <Video
            ref={playerRef}
            source={{uri: content.destination}}
            muted={muted || paused || currentPosition.index !== position.index}
            repeat={true}
            playWhenInactive={false}
            playInBackground={false}
            ignoreSilentSwitch={'ignore'}
            mixWithOthers={'duck'}
            paused={
              paused ||
              currentPosition.post !== position.post ||
              currentPosition.index !== position.index
            }
            resizeMode={'cover'}
            onLoad={() => setLoaded(true)}
            onError={err => console.warn(err.error)}
            style={{
              width: contentWidth ?? '100%',
              height: '100%',
              borderRadius: 12,
            }}
          />
        </>
      )}
    </Box>
  );
};
