import React from 'react';
import Animated, {FadeIn} from 'react-native-reanimated';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  Text,
  HStack,
  Square,
  Icon,
  Pressable,
  useColorModeValue,
} from 'native-base';

interface IExpandedPostActionStackProps {
  cardHeight: number;

  attributes?: {
    isLiked?: boolean;
    likeCount?: number;
    commentCount?: number;
  };

  onLike: () => void;
  onComment: () => void;
  onMore: () => void;
}

export const ExpandedPostActionStack = ({
  cardHeight,
  attributes,
  onLike,
  onComment,
  onMore,
}: IExpandedPostActionStackProps): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  const textStyling = {
    fontSize: 10,
    fontWeight: 'semibold',
    color: textColor,
  };

  return (
    <HStack
      zIndex={1}
      space={4}>
      <Animated.View entering={FadeIn.delay(250)}>
        <Pressable onPress={onLike}>
          <Square>
            <Icon
              as={MaterialIcons}
              name={`favorite${
                !attributes || !attributes.isLiked ? '-outline' : ''
              }`}
              color={textColor}
              size={6}
            />

            <Text {...textStyling}>{attributes?.likeCount}</Text>
          </Square>
        </Pressable>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(250)}>
        <Pressable onPress={onComment}>
          <Square>
            <Icon
              as={MaterialIcons}
              name={'chat-bubble-outline'}
              color={textColor}
              size={6}
            />

            <Text {...textStyling}>{attributes?.commentCount}</Text>
          </Square>
        </Pressable>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(250)}>
        <Pressable onPress={onComment}>
          <Square>
            <Icon
              as={MaterialIcons}
              name={'ios-share'}
              color={textColor}
              size={6}
            />
          </Square>
        </Pressable>
      </Animated.View>
    </HStack>
  );
};
