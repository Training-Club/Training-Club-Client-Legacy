import React from 'react';
import {HStack, IconButton, Input, useColorModeValue} from 'native-base';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';

interface IRenameableHeaderProps {
  text: string;
  setText: (s: string) => void;

  options?: {
    maxLength?: number;
  };

  closeButton?: {
    backgroundColor?: ColorType;
    pressedBackgroundColor?: ColorType;
    iconColor?: ColorType;
    screenName: string;
  };
}

const RenameableHeader = ({
  text,
  setText,
  options,
  closeButton,
}: IRenameableHeaderProps): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const closeButtonScreenName = closeButton?.screenName ?? 'MainFeed';
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  const defaultCloseButtonBackgroundColor = useColorModeValue(
    'apple.gray.100',
    'apple.gray.800',
  );

  const defaultCloseButtonPressedBackgroundColor = useColorModeValue(
    'apple.gray.300',
    'apple.gray.600',
  );

  const defaultCloseButtonIconColor = useColorModeValue(
    'apple.gray.800',
    'apple.gray.100',
  );

  return (
    <HStack
      testID={'renameable-header'}
      w={'100%'}
      justifyContent={'space-between'}>
      <Input
        variant={'unstyled'}
        fontSize={24}
        fontWeight={'bold'}
        color={textColor}
        w={'100%'}
        pl={0}
        maxLength={options?.maxLength}
        defaultValue={text}
        onBlur={e => setText(e.nativeEvent.text)}
      />

      {closeButton && (
        <IconButton
          testID={'renameable-header-close-btn'}
          position={'absolute'}
          top={1}
          right={0}
          size={'sm'}
          rounded={'full'}
          variant={'solid'}
          bgColor={
            closeButton.backgroundColor ?? defaultCloseButtonBackgroundColor
          }
          _pressed={{
            bgColor:
              closeButton.pressedBackgroundColor ??
              defaultCloseButtonPressedBackgroundColor,
          }}
          _icon={{
            as: MaterialCommunityIcons,
            name: 'window-close',
            color: closeButton.iconColor ?? defaultCloseButtonIconColor,
          }}
          onPress={() => {
            navigation.navigate(closeButtonScreenName);
          }}
        />
      )}
    </HStack>
  );
};

export default RenameableHeader;
