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

  return (
    <Pressable
      onPress={onPress}
      borderTopRadius={style?.roundedTop ? 12 : 0}
      borderTopWidth={style && style.roundedTop ? 0 : 1}
      borderBottomRadius={style?.roundedBottom ? 12 : 0}
      borderBottomWidth={style && style.roundedBottom ? 0 : 1}
      borderColor={style?.borderColor ?? defaultBorderColor}
      bgColor={style?.backgroundColor ?? defaultBackgroundColor}
      _pressed={{
        backgroundColor:
          style?.pressedBackgroundColor ?? defaultPressedBackgroundColor,
      }}
      p={3}>
      <HStack space={3}>
        {icon && (
          <Icon
            as={MaterialIcons}
            name={icon.name}
            size={icon.size}
            color={style?.textColor ?? defaultTextColor}
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
