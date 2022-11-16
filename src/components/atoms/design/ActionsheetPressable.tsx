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
  };
}

export const ActionsheetPressable = ({
  onPress,
  text,
  icon,
  styling,
}: IActionsheetPressableProps): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');
  const textMutedColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  return (
    <Pressable onPress={onPress} py={2}>
      <HStack space={3}>
        {icon && (
          <Icon
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
