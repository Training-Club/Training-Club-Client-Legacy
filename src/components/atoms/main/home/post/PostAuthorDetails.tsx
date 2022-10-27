import React from 'react';
import {Text, HStack, Avatar, Pressable, useColorModeValue} from 'native-base';

interface IPostAuthorDetailsProps {
  avatarUri?: string;
  username: string;
  onPress: () => void;
}

export const PostAuthorDetails = ({
  onPress,
  avatarUri,
  username,
}: IPostAuthorDetailsProps): JSX.Element => {
  const avatarBgColor = useColorModeValue(
    'apple.mint.light',
    'apple.orange.dark',
  );

  return (
    <Pressable
      onPress={onPress}
      zIndex={1}
      position={'absolute'}
      left={2}
      bottom={2}>
      <HStack alignItems={'center'} space={2}>
        <Avatar
          testID={'post-author-avatar'}
          size={8}
          source={{uri: avatarUri}}
          bgColor={avatarBgColor}
        />

        <Text fontWeight={'semibold'} color={'white'}>
          {username}
        </Text>
      </HStack>
    </Pressable>
  );
};
