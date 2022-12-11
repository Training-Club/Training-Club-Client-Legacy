import React from 'react';
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Pressable,
  useColorModeValue,
} from 'native-base';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

interface IExpandedPostAuthorDetailsProps {
  author: {
    id: string;
    username: string;
    avatarUri?: string;
    verified?: boolean;
  };

  cardHeight: number;
  onPress?: () => void;
}

export const ExpandedPostAuthorDetails = ({
  author,
  cardHeight,
  onPress,
}: IExpandedPostAuthorDetailsProps): JSX.Element => {
  const verifiedColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  const verifiedBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  return (
    <Pressable onPress={onPress} zIndex={1}>
      <HStack
        alignItems={'center'}
        space={4}>
        <Box>
          {author.verified && (
            <Box
              zIndex={2}
              position={'absolute'}
              bottom={-8}
              right={-8}
              bgColor={verifiedBgColor}
              borderRadius={'full'}>
              <Icon
                as={MaterialIcons}
                name={'verified'}
                size={5}
                color={verifiedColor}
              />
            </Box>
          )}

          <Avatar
            size={'sm'}
            borderRadius={12}
            source={{
              uri: 'https://media.discordapp.net/attachments/948293251947987075/1048226488937365515/unknown.png',
            }}
          />
        </Box>

        <Heading size={'sm'} fontWeight={'semibold'}>
          {author.username}
        </Heading>
      </HStack>
    </Pressable>
  );
};
