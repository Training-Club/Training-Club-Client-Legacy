import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {Icon, Pressable, Square, Text, VStack} from 'native-base';

interface IPostActionStackProps {
  attributes?: {
    isLiked?: boolean;
    likeCount?: number;
    commentCount?: number;
  };

  onLike: () => void;
  onComment: () => void;
  onMore: () => void;
}

export const PostActionStack = ({
  attributes,
  onLike,
  onComment,
  onMore,
}: IPostActionStackProps) => {
  const textStyling = {
    fontSize: 10,
    fontWeight: 'semibold',
    color: 'white',
  };

  return (
    <VStack zIndex={1} space={4} position={'absolute'} bottom={2} right={2}>
      <Pressable onPress={onLike}>
        <Square>
          <Icon
            as={MaterialIcons}
            name={`favorite${
              !attributes || !attributes.isLiked ? '-outline' : ''
            }`}
            color={'white'}
            size={6}
          />

          <Text {...textStyling}>{attributes?.likeCount}</Text>
        </Square>
      </Pressable>

      <Pressable onPress={onComment}>
        <Square>
          <Icon
            as={MaterialIcons}
            name={'chat-bubble-outline'}
            color={'white'}
            size={6}
          />

          <Text {...textStyling}>{attributes?.commentCount}</Text>
        </Square>
      </Pressable>

      <Pressable onPress={onMore}>
        <Square>
          <Icon
            as={MaterialIcons}
            name={'more-horiz'}
            color={'white'}
            size={6}
          />
        </Square>
      </Pressable>
    </VStack>
  );
};
