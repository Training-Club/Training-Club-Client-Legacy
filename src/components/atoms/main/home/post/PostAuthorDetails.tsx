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
  Box,
} from 'native-base';

interface IPostAuthorDetailsProps {
  username: string;
  avatarUri?: string;
  verified?: boolean;
  location?: ILocation;
  onPress: () => void;
}

export const PostAuthorDetails = ({
  onPress,
  avatarUri,
  verified,
  username,
  location,
}: IPostAuthorDetailsProps): JSX.Element => {
  const avatarBgColor = useColorModeValue(
    'apple.mint.light',
    'apple.orange.dark',
  );

  const verifiedColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  const verifiedBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
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
      {verified && (
        <Box
          zIndex={2}
          position={'absolute'}
          bottom={0}
          left={5}
          bgColor={verifiedBgColor}
          borderRadius={'full'}>
          <Icon
            as={MaterialIcons}
            name={'verified'}
            size={4}
            color={verifiedColor}
          />
        </Box>
      )}

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
