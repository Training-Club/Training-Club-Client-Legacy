import React from 'react';
import Video from 'react-native-video';
import {StyleProp, ViewStyle} from 'react-native';

interface IPostVideoWrapperProps {
  uri: string;
  muted?: boolean;
  paused?: boolean;
  styleProps?: StyleProp<ViewStyle>;
}

export const PostVideoWrapper = ({
  uri,
  muted,
  paused,
  styleProps,
}: IPostVideoWrapperProps): JSX.Element => {
  const playerRef = React.useRef<Video>(null);

  return (
    <Video
      ref={playerRef}
      source={{uri: uri}}
      muted={muted}
      paused={paused}
      repeat={true}
      playInBackground={false}
      playWhenInactive={true}
      ignoreSilentSwitch={'ignore'}
      mixWithOthers={'duck'}
      resizeMode={'cover'}
      style={styleProps}
    />
  );
};
