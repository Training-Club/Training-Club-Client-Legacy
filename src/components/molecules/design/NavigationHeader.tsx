import React from 'react';
import {isSmallScreen} from '../../../utils/DeviceUtil';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {InterfaceViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {Box, View, Heading, Icon, Button, useColorModeValue} from 'native-base';

interface INavigationHeaderButtonProps {
  text: string;
  onPress?: () => void;
  navigationProps?: {
    stackName: string;
    screenName: string;
  };
}

interface INavigationHeaderBackButtonProps
  extends INavigationHeaderButtonProps {
  textStyle?: {
    color?: ColorType | string;
    pressedColor?: ColorType | string;
  };
}

interface INavigationHeaderActionButtonProps
  extends INavigationHeaderButtonProps {
  isDisabled?: boolean;
  textStyle?: {
    color?: ColorType | string;
    pressedColor?: ColorType | string;
    disabledColor?: ColorType | string;
  };
}

interface INavigationHeaderProps {
  title?: string;
  backButton?: INavigationHeaderBackButtonProps;
  actionButton?: INavigationHeaderActionButtonProps;
  viewStyle?: InterfaceViewProps;
  boxStyle?: {
    bgColor?: ColorType | string;
  };
  children: JSX.Element | JSX.Element[];
}

export const NavigationHeader = ({
  title,
  backButton,
  actionButton,
  viewStyle,
  boxStyle,
  children,
}: INavigationHeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const topSpacing = isSmallScreen() ? 8 : 24;
  const contentSpacing = 2;

  const defaultBgColor = useColorModeValue('white', 'black');

  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

  const defaultPressedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const defaultActionTextColor = useColorModeValue(
    'apple.blue.dark',
    'apple.blue.light',
  );

  const defaultActionPressedTextColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  const defaultActionDisabledTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const actionStyling = {
    fontWeight: 'normal',
    color: actionButton?.isDisabled
      ? actionButton.textStyle?.disabledColor ?? defaultActionDisabledTextColor
      : actionButton?.textStyle?.color ?? defaultActionTextColor,
  };

  const pressedActionStyling = {
    fontWeight: 'normal',
    color: actionButton?.isDisabled
      ? actionButton.textStyle?.disabledColor ?? defaultActionDisabledTextColor
      : actionButton?.textStyle?.pressedColor ?? defaultActionPressedTextColor,
  };

  /**
   * Handles logic when action button is pressed
   *
   * If navigation props are present, they will be prioritized
   */
  const performAction = React.useCallback(() => {
    if (actionButton?.navigationProps) {
      navigation.navigate(actionButton.navigationProps.stackName, {
        screen: actionButton.navigationProps.screenName,
      });

      return;
    }

    if (actionButton?.onPress) {
      actionButton.onPress();
      return;
    }

    console.warn('attempted to fire action button with no action specified');
  }, [actionButton, navigation]);

  /**
   * Handles logic when back button is pressed
   *
   * If navigation props are present, they will be prioritized.
   */
  const performBackAction = React.useCallback(() => {
    if (backButton?.navigationProps) {
      navigation.navigate(backButton.navigationProps.stackName, {
        screen: backButton.navigationProps.screenName,
      });

      return;
    }

    if (backButton?.onPress) {
      backButton.onPress();
      return;
    }

    console.warn(
      'attempted to fire a back button action with no action specified',
    );
  }, [backButton, navigation]);

  return (
    <View>
      <Box
        zIndex={10}
        position={'absolute'}
        left={0}
        top={0}
        w={'100%'}
        pt={topSpacing}
        bgColor={boxStyle?.bgColor ?? defaultBgColor}>
        {backButton && (
          <Button
            zIndex={10}
            position={'absolute'}
            left={contentSpacing}
            bottom={contentSpacing}
            p={0}
            bgColor={'rgba(0,0,0,0.0)'}
            onPress={performBackAction}
            _text={{
              fontWeight: 'normal',
              color: backButton.textStyle?.color ?? defaultTextColor,
            }}
            _icon={{
              color: backButton.textStyle?.color ?? defaultTextColor,
            }}
            _pressed={{
              _text: {
                color:
                  backButton.textStyle?.pressedColor ?? defaultPressedTextColor,
              },

              _icon: {
                color:
                  backButton.textStyle?.pressedColor ?? defaultPressedTextColor,
              },
            }}
            leftIcon={
              <Icon as={MaterialIcons} name={'arrow-back-ios'} size={'sm'} />
            }>
            {backButton.text}
          </Button>
        )}

        {actionButton && (
          <Button
            zIndex={10}
            position={'absolute'}
            right={contentSpacing}
            bottom={contentSpacing}
            p={0}
            onPress={performAction}
            bgColor={'rgba(0,0,0,0.0)'}
            _text={actionStyling}
            _icon={actionStyling}
            _pressed={{
              _icon: pressedActionStyling,
              _text: pressedActionStyling,
            }}
            rightIcon={
              <Icon as={MaterialIcons} name={'arrow-forward-ios'} size={'sm'} />
            }>
            {actionButton.text}
          </Button>
        )}

        {title && (
          <Heading
            position={'absolute'}
            bottom={2.5}
            left={0}
            w={'100%'}
            textAlign={'center'}
            size={'sm'}>
            {title}
          </Heading>
        )}
      </Box>

      <View mt={topSpacing / 2} {...viewStyle}>
        {children}
      </View>
    </View>
  );
};
