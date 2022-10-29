import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {ILocation} from '../../../../../models/Location';

import {
  Text,
  HStack,
  Avatar,
  Pressable,
  useColorModeValue,
  VStack,
  Icon,
} from 'native-base';

interface IPostAuthorDetailsProps {
  avatarUri?: string;
  username: string;
  location?: ILocation;
  onPress: () => void;
}

export const PostAuthorDetails = ({
  onPress,
  avatarUri,
  username,
  location,
}: IPostAuthorDetailsProps): JSX.Element => {
  const avatarBgColor = useColorModeValue(
    'apple.mint.light',
    'apple.orange.dark',
  );

  const textColor = 'core.text.dark';
  const shadowColor = 'black';
  const shadowRadius = 4;

  const shadowStyling = {
    textShadowColor: shadowColor,
    textShadowRadius: shadowRadius,
  };

  return (
    <Pressable
      onPress={onPress}
      zIndex={1}
      position={'absolute'}
      left={2}
      top={2}>
      <HStack alignItems={'center'} space={2}>
        <Avatar
          testID={'post-author-avatar'}
          size={8}
          source={{uri: avatarUri}}
          bgColor={avatarBgColor}
        />

        <VStack>
          <Text
            fontWeight={'semibold'}
            color={textColor}
            style={{...shadowStyling}}>
            {username}
          </Text>

          {location && (
            <HStack space={1} alignItems={'center'}>
              <Icon
                as={MaterialIcons}
                name={'location-on'}
                size={3}
                color={textColor}
              />

              <Text
                color={textColor}
                fontSize={'10px'}
                fontWeight={'semibold'}
                style={{...shadowStyling}}>
                {location.name}
              </Text>
            </HStack>
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
};
