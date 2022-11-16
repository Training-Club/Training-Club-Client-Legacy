import React, {useRef} from 'react';
import {ContentType, IContentItem} from '../../../../../models/Content';
import Video from 'react-native-video';
import {PostContentAudioControl} from './PostContentAudioControl';
import {Box, Image} from 'native-base';

interface IPostContentWrapperProps {
  content: IContentItem;
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
  const playerRef = useRef<Video>(null);

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

  return (
    <Box w={contentWidth ?? '100%'} h={'100%'}>
      {content.type === ContentType.IMAGE && (
        <Image
          key={content.destination}
          w={contentWidth ?? '100%'}
          h={'100%'}
          source={{uri: content.destination}}
          alt={content.type}
          borderRadius={'12px'}
        />
      )}

      {content.type === ContentType.VIDEO && (
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
