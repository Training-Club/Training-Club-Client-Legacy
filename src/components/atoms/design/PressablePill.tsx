import React from 'react';
import {Box, HStack, Icon, Pressable, useColorModeValue} from 'native-base';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {ColorType} from 'native-base/lib/typescript/components/types';

interface IPressablePillProps {
  children?: JSX.Element;
  onPress: () => void;

  icon?: {
    name: string;
    size: number;
  };

  style?: {
    roundedTop?: boolean;
    roundedBottom?: boolean;
    backgroundColor?: ColorType | string;
    pressedBackgroundColor?: ColorType | string;
    textColor?: ColorType | string;
    borderColor?: ColorType | string;
  };
}

const PressablePill = ({
  children,
  onPress,
  icon,
  style,
}: IPressablePillProps): JSX.Element => {
  const defaultBackgroundColor = useColorModeValue(
    'core.pressable.background.light',
    'core.pressable.background.dark',
  );

  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

  const defaultPressedBackgroundColor = useColorModeValue(
    'core.pressable.pressedBackground.light',
    'core.pressable.pressedBackground.dark',
  );

  const defaultBorderColor = useColorModeValue(
    'apple.gray.50',
    'apple.gray.900',
  );

  const backgroundColor =
    style && style.backgroundColor
      ? style.backgroundColor
      : defaultBackgroundColor;

  const pressedBackgroundColor =
    style && style.pressedBackgroundColor
      ? style.pressedBackgroundColor
      : defaultPressedBackgroundColor;

  const textColor =
    style && style.textColor ? style.textColor : defaultTextColor;

  const borderColor =
    style && style.borderColor ? style.borderColor : defaultBorderColor;

  const borderRadiusTop = style && style.roundedTop ? 12 : 0;
  const borderRadiusBottom = style && style.roundedBottom ? 12 : 0;

  return (
    <Pressable
      onPress={onPress}
      borderTopRadius={borderRadiusTop}
      borderTopWidth={style && style.roundedTop ? 0 : 1}
      borderBottomRadius={borderRadiusBottom}
      borderBottomWidth={style && style.roundedBottom ? 0 : 1}
      borderColor={borderColor}
      bgColor={backgroundColor}
      _pressed={{backgroundColor: pressedBackgroundColor}}
      p={3}>
      <HStack space={3}>
        {icon && (
          <Icon
            as={MaterialIcons}
            name={icon.name}
            size={icon.size}
            color={textColor}
          />
        )}

        <Box mt={0.5} w={'100%'}>
          {children}
        </Box>
      </HStack>
    </Pressable>
  );
};

export default PressablePill;
