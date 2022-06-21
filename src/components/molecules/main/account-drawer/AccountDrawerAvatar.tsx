import React from 'react';
import {Avatar, Pressable, useColorModeValue} from 'native-base';

interface IAccountDrawerAvatarProps {
  setAccountDrawerOpen: (b: boolean) => void;
  avatar: {
    uri?: string;
    initials?: string;
    showNotificationBubble?: boolean;
  };
}

const AccountDrawerAvatar = ({
  setAccountDrawerOpen,
  avatar,
}: IAccountDrawerAvatarProps): JSX.Element => {
  const backgroundColor = useColorModeValue('black', 'white');
  const notificationBubbleColor = useColorModeValue(
    'apple.red.light',
    'apple.red.dark',
  );

  return (
    <Pressable onPressIn={() => setAccountDrawerOpen(true)}>
      <Avatar size={'sm'} bgColor={backgroundColor}>
        {avatar.initials}

        <Avatar.Badge bg={notificationBubbleColor} />
      </Avatar>
    </Pressable>
  );
};

export default AccountDrawerAvatar;
