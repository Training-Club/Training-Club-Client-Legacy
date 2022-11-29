import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useNavigation} from '@react-navigation/core';
import {Box, Heading, HStack, IconButton, useColorModeValue} from 'native-base';

export enum CloseButtonPosition {
  LEFT,
  RIGHT,
}

export interface ICloseableHeaderProps {
  pageTitle?: string;
  textColor?: ColorType;
  closeButton?: {
    position?: CloseButtonPosition;
    backgroundColor?: ColorType;
    pressedBackgroundColor?: ColorType;
    iconColor?: ColorType;
    stackName: string;
    screenName: string;
  };
}

const CloseableHeader = ({
  pageTitle,
  textColor,
  closeButton,
}: ICloseableHeaderProps): JSX.Element => {
  const navigation = useNavigation();

  const title = pageTitle ?? 'Page Title';
  const closeButtonStackName = closeButton?.stackName ?? 'Main';
  const closeButtonScreenName = closeButton?.screenName ?? 'Home';

  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

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

  if (closeButton?.position === CloseButtonPosition.LEFT) {
    return (
      <HStack testID={'closeable-header'} w={'100%'} mt={4} zIndex={10}>
        {closeButton && (
          <IconButton
            testID={'closeable-header-btn'}
            position={'absolute'}
            top={1}
            left={0}
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
              as: MaterialIcons,
              name: 'arrow-back',
              color: closeButton.iconColor ?? defaultCloseButtonIconColor,
            }}
            onPress={() => {
              navigation.navigate(
                closeButtonStackName as never,
                {screen: closeButtonScreenName} as never,
              );
            }}
          />
        )}

        <Heading
          size={'lg'}
          color={textColor ?? defaultTextColor}
          ml={12}
          mt={1}>
          {title}
        </Heading>
      </HStack>
    );
  }

  return (
    <Box testID={'closeable-header'} w={'100%'} mt={4} zIndex={10}>
      <Heading size={'xl'} color={textColor ?? defaultTextColor}>
        {title}
      </Heading>

      {closeButton && (
        <IconButton
          testID={'closeable-header-btn'}
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
            navigation.navigate(
              closeButtonStackName as never,
              {screen: closeButtonScreenName} as never,
            );
          }}
        />
      )}
    </Box>
  );
};

export default CloseableHeader;
