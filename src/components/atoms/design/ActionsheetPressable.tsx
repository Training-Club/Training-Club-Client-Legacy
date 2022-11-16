import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  HStack,
  Icon,
  Pressable,
  Text,
  ITextProps,
  useColorModeValue,
} from 'native-base';

interface IActionsheetPressableProps {
  onPress: () => void;

  text: {
    primary: string;
    secondary?: string;
  };

  icon?: {
    family?: any;
    name: string;
    size: number;
  };

  styling?: {
    primary?: ITextProps;
    secondary?: ITextProps;
    borderBottom?: boolean;
  };
}

export const ActionsheetPressable = ({
  onPress,
  text,
  icon,
  styling,
}: IActionsheetPressableProps): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  const borderBottomColor = useColorModeValue(
    'apple.gray.50',
    'apple.gray.800',
  );

  const textMutedColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  return (
    <Pressable
      onPress={onPress}
      py={2.5}
      borderBottomWidth={styling?.borderBottom ? 1 : 0}
      borderBottomColor={borderBottomColor}>
      <HStack space={3}>
        {icon && (
          <Icon
            testID={'actionsheet-pressable-icon'}
            as={icon.family ?? MaterialIcons}
            name={icon.name}
            size={icon.size}
            color={textMutedColor}
          />
        )}

        <Text
          color={textColor}
          fontSize={'md'}
          fontWeight={'semibold'}
          {...styling?.primary}>
          {text.primary}
        </Text>

        {text.secondary && (
          <Text color={textMutedColor} fontSize={'md'} {...styling?.secondary}>
            {text.secondary}
          </Text>
        )}
      </HStack>
    </Pressable>
  );
};
