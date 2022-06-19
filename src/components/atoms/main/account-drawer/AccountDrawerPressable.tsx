import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {ColorType} from 'native-base/lib/typescript/components/types';

import {
  Icon,
  Text,
  Pressable,
  Square,
  useColorModeValue,
  HStack,
} from 'native-base';

interface IAccountDrawerPressableProps {
  onPress: () => void;
  text?: string;

  badge?: {
    color: ColorType | string;
    text: string;
    textColor?: ColorType | string;
  };

  styling?: {
    roundedTop?: boolean;
    roundedBottom?: boolean;
    centerContent?: boolean;
    color?: ColorType | string;
  };

  icon: {
    iconName: string;
    iconSize: number;
  };
}

const AccountDrawerPressable = ({
  onPress,
  text,
  badge,
  styling,
  icon,
}: IAccountDrawerPressableProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('apple.gray.50', 'apple.gray.900');
  const backgroundColor = useColorModeValue('white', 'black');
  const pressedBackgroundColor = useColorModeValue(
    'apple.gray.50',
    'apple.gray.900',
  );

  return (
    <Pressable
      onPress={onPress}
      px={2}
      py={3}
      borderTopRadius={styling && styling.roundedTop ? 8 : 0}
      borderBottomRadius={styling && styling.roundedBottom ? 8 : 0}
      borderBottomWidth={styling && styling.roundedBottom ? 0 : 1}
      mt={styling && styling.roundedTop ? 4 : 0}
      borderBottomColor={borderColor}
      bgColor={backgroundColor}
      _pressed={{
        bgColor: pressedBackgroundColor,
      }}>
      <HStack
        space={3}
        alignItems={styling && styling.centerContent ? 'center' : 'flex-start'}
        justifyContent={
          styling && styling.centerContent ? 'center' : 'flex-start'
        }>
        <Icon
          as={MaterialIcons}
          name={icon.iconName}
          size={icon.iconSize}
          color={styling?.color ?? textColor}
        />

        {text && (
          <Text
            mt={0.5}
            fontWeight={'semibold'}
            color={styling?.color ?? textColor}>
            {text}
          </Text>
        )}

        {badge && (
          <Square borderRadius={'12px'} bgColor={badge.color} px={2}>
            <Text
              fontSize={'2xs'}
              fontWeight={'semibold'}
              color={badge.textColor ?? 'white'}>
              {badge.text}
            </Text>
          </Square>
        )}
      </HStack>
    </Pressable>
  );
};

export default AccountDrawerPressable;
