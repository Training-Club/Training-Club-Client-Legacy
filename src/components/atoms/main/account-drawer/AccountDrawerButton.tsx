import React from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {
  HStack,
  Icon,
  Pressable,
  Square,
  Text,
  useColorModeValue,
} from 'native-base';

interface IAccountDrawerButtonProps {
  onPress: () => void;
  text: string;

  style?: {
    badge?: {
      color: ColorType;
      text: string;
      textColor?: string;
    };

    button?: {
      textColor?: ColorType;
      bgColor?: ColorType;
      bgColorPressed?: ColorType;
      renderBottomBorder?: boolean;
      borderBottomColor?: ColorType;
    };

    icon?: {
      iconName: string;
      iconSize: number;
      iconColor: ColorType;
    };
  };
}

const AccountDrawerButton = ({
  onPress,
  text,
  style,
}: IAccountDrawerButtonProps): JSX.Element => {
  const defaultTextColor = useColorModeValue('black', 'white');
  const defaultButtonBgColor = useColorModeValue('white', 'black');
  const defaultButtonBorderBottomColor = useColorModeValue(
    'apple.gray.200',
    'apple.gray.700',
  );

  const defaultBadgeColor = useColorModeValue(
    'apple.red.light',
    'apple.red.dark',
  );

  const defaultButtonBgColorPressed = useColorModeValue(
    'apple.gray.50',
    'apple.gray.900',
  );

  return (
    <Pressable
      onPress={onPress}
      bgColor={style?.button?.bgColor ?? defaultButtonBgColor}
      py={4}
      px={2}
      borderBottomWidth={style?.button?.renderBottomBorder ? 1 : 0}
      borderBottomColor={
        style?.button?.borderBottomColor ?? defaultButtonBorderBottomColor
      }
      _pressed={{
        bgColor: style?.button?.bgColorPressed ?? defaultButtonBgColorPressed,
      }}>
      <HStack space={3}>
        {style?.icon && (
          <Icon
            as={MaterialIcons}
            color={style.icon.iconColor}
            name={style.icon.iconName}
            size={style.icon.iconSize}
          />
        )}

        <Text
          mt={0.5}
          fontWeight={'semibold'}
          color={style?.button?.textColor ?? defaultTextColor}>
          {text}
        </Text>

        {style?.badge && (
          <Square
            px={2}
            borderRadius={'12px'}
            bgColor={style?.badge.color ?? defaultBadgeColor}>
            <Text
              fontSize={'2xs'}
              fontWeight={'semibold'}
              color={style.badge.textColor ?? defaultTextColor}>
              {style?.badge.text}
            </Text>
          </Square>
        )}
      </HStack>
    </Pressable>
  );
};

export default AccountDrawerButton;
