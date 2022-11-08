import React, {useRef} from 'react';
import {ContentType, IContentItem} from '../../../../../models/Content';
import Video from 'react-native-video';
import {PostContentAudioControl} from './PostContentAudioControl';
import {Image} from 'native-base';

interface IPostContentWrapperProps {
  content: IContentItem;

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
  currentPosition,
  position,
  contentWidth,
}: IPostContentWrapperProps): JSX.Element => {
  const [muted, setMuted] = React.useState(true);
  const playerRef = useRef<Video>(null);

  const onToggleMute = React.useCallback(() => {
    setMuted(!muted);
  }, [muted, setMuted]);

  return (
    <>
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
            muted={muted}
            repeat={true}
            playWhenInactive={false}
            playInBackground={false}
            paused={
              currentPosition.post !== position.post ||
              currentPosition.index !== position.index
            }
            resizeMode={'cover'}
            onBuffer={data => console.info(`buffering: ${data.isBuffering}`)}
            onError={err => console.warn(err.error)}
            style={{
              width: contentWidth ?? '100%',
              height: '100%',
              borderRadius: 12,
            }}
          />
        </>
      )}
    </>
  );
};
