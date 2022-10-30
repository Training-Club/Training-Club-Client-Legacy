import React from 'react';
import {VStack, useColorModeValue, useColorMode} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import AccountDrawerButton from '../../../atoms/main/account-drawer/AccountDrawerButton';

interface IAccountDrawerButtonStackProps {
  options?: {
    hasNotifications?: boolean;
  };

  style?: {
    bgColor?: ColorType;
    textColor?: ColorType;
    borderRadius?: number | string;
    spacing?: number;
  };
}

const AccountDrawerButtonStack = ({
  options,
  style,
}: IAccountDrawerButtonStackProps): JSX.Element => {
  const {toggleColorMode} = useColorMode(); // TODO: Remove this later

  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

  const defaultBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const defaultSpacing = 4;
  const defaultBorderRadius = 12;

  return (
    <VStack
      w={'100%'}
      bgColor={style?.bgColor ?? defaultBgColor}
      px={style?.spacing ?? defaultSpacing}
      py={2}
      mt={style?.spacing ?? defaultSpacing}
      borderRadius={style?.borderRadius ?? defaultBorderRadius}>
      <AccountDrawerButton
        onPress={() => console.log('My Account')}
        text={'My Account'}
        style={{
          button: {renderBottomBorder: true, roundedTop: true},
          icon: {
            iconName: 'account-circle',
            iconSize: 6,
            iconColor: style?.textColor ?? defaultTextColor,
          },
        }}
      />

      <AccountDrawerButton
        onPress={() => console.log('Inbox')}
        text={'Inbox'}
        style={{
          button: {renderBottomBorder: true},
          badge: options?.hasNotifications
            ? {color: 'apple.red.light', text: '8', textColor: 'white'}
            : undefined,
          icon: {
            iconName: 'email',
            iconSize: 6,
            iconColor: style?.textColor ?? defaultTextColor,
          },
        }}
      />

      <AccountDrawerButton
        onPress={() => console.log('Create Community')}
        text={'Create Community'}
        style={{
          button: {renderBottomBorder: true},
          icon: {
            iconName: 'forum',
            iconSize: 6,
            iconColor: style?.textColor ?? defaultTextColor,
          },
        }}
      />

      <AccountDrawerButton
        onPress={() => console.log('Exercise Templates')}
        text={'Exercise Templates'}
        style={{
          button: {renderBottomBorder: true},
          icon: {
            iconName: 'fitness-center',
            iconSize: 6,
            iconColor: style?.textColor ?? defaultTextColor,
          },
        }}
      />

      <AccountDrawerButton
        onPress={() => toggleColorMode()}
        text={'Settings'}
        style={{
          button: {roundedBottom: true},
          icon: {
            iconName: 'settings',
            iconSize: 6,
            iconColor: style?.textColor ?? defaultTextColor,
          },
        }}
      />
    </VStack>
  );
};

export default AccountDrawerButtonStack;
