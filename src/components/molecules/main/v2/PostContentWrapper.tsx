import React, {useRef} from 'react';
import {PostContentAudioControl} from '../../../atoms/main/home/post/PostContentAudioControl';
import Video from 'react-native-video';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ContentType, IContentItem} from '../../../../models/Content';
import {Box, Image, Spinner, Square, useColorModeValue, View} from 'native-base';
import {SharedElement} from 'react-navigation-shared-element';

interface IPostContentWrapperProps {
  id: string;
  content?: IContentItem;
  suspended?: boolean;
  width: number;
  height: number;
}

export const PostContentWrapper = ({
  id,
  content,
  suspended,
  width,
  height,
}: IPostContentWrapperProps): JSX.Element => {
  const [isMuted, setMuted] = React.useState(true);
  const [isLoaded, setLoaded] = React.useState(false);
  const playerRef = useRef<Video>(null);

  const loadingBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const loadingSpinnerColor = useColorModeValue('black', 'white');

  /**
   * Sets the mute state
   */
  const onToggleMute = React.useCallback(() => {
    setMuted(!isMuted);
  }, [isMuted, setMuted]);

  /**
   * Seeks the content back to 0 when the pause value is set to false
   */
  React.useEffect(() => {
    if (!playerRef || !playerRef.current) {
      return;
    }

    if (suspended) {
      return;
    }

    playerRef.current.seek(0);
  }, [suspended]);

  return (
    <View w={'100%'} h={'100%'} p={0} m={0}>
      {!isLoaded && (
        <SharedElement id={`post-item-${id}-loading-indicator`}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Square
              w={width}
              h={height}
              bgColor={loadingBgColor}
              borderRadius={12}>
              <Spinner size={'lg'} color={loadingSpinnerColor} />
            </Square>
          </Animated.View>
        </SharedElement>
      )}

      {content && content.type === ContentType.IMAGE && (
        <SharedElement id={`post-item-${id}-image`}>
          <Image
            key={content.destination}
            source={{uri: content.destination}}
            alt={content.type}
            onLoad={() => setLoaded(true)}
            style={{borderRadius: 12, width: width, height: height}}
          />
        </SharedElement>
      )}

      {content && content.type === ContentType.VIDEO && (
        <SharedElement id={`post-item-${id}-video`}>
          <PostContentAudioControl
            muted={isMuted}
            onAudioToggle={() => onToggleMute()}
          />

          <Video
            ref={playerRef}
            source={{uri: content.destination}}
            muted={isMuted || suspended}
            repeat={true}
            playWhenInactive={false}
            playInBackground={false}
            ignoreSilentSwitch={'ignore'}
            mixWithOthers={'duck'}
            paused={suspended}
            resizeMode={'cover'}
            onLoad={() => setLoaded(true)}
            onError={err => console.warn(err.error)}
            style={{
              width: width,
              height: height,
              borderRadius: 12,
            }}
          />
        </SharedElement>
      )}
    </View>
  );
};
