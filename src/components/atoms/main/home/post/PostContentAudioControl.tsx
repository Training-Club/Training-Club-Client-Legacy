import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {IconButton} from 'native-base';

interface IPostContentAudioControlProps {
  muted: boolean;
  onAudioToggle: () => void;
}

export const PostContentAudioControl = ({
  muted,
  onAudioToggle,
}: IPostContentAudioControlProps): JSX.Element => {
  const bgColor = 'rgba(0, 0, 0, 0.5)';
  const iconColor = 'core.text.dark';

  return (
    <IconButton
      position={'absolute'}
      top={2}
      right={2}
      zIndex={1}
      rounded={'full'}
      size={'sm'}
      onPress={onAudioToggle}
      bg={bgColor}
      _pressed={{
        bg: 'none',
      }}
      _icon={{
        as: MaterialIcons,
        name: `volume-${muted ? 'off' : 'up'}`,
        color: iconColor,
      }}
    />
  );
};
