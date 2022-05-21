import React from 'react';
import {Box, Button, Icon, useColorModeValue, VStack} from 'native-base';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';

interface IWelcomeButtonStackProps {
  spacing?: number;
  onPressCreateAccount: () => void;
  onPressContinueWithApple: () => void;
  onPressContinueWithEmail: () => void;
}

const WelcomeButtonStack = ({
  spacing,
  onPressContinueWithApple,
  onPressContinueWithEmail,
  onPressCreateAccount,
}: IWelcomeButtonStackProps): JSX.Element => {
  const os = Platform.OS;
  const textColor = useColorModeValue('black', 'white');
  const logoColor = useColorModeValue('white', 'black');

  return (
    <Box position={'absolute'} bottom={4} left={spacing} w={'100%'}>
      <VStack space={2}>
        <Button
          variant={'info'}
          size={'lg'}
          onPress={() => onPressCreateAccount()}
          _text={{
            color: 'white',
            fontWeight: 'semibold',
          }}>
          Create Account
        </Button>

        {os === 'ios' && (
          <Button
            variant={'basic'}
            size={'lg'}
            onPress={() => onPressContinueWithApple()}
            _text={{
              color: 'white',
              fontWeight: 'semibold',
            }}
            leftIcon={
              <Icon
                as={MaterialCommunityIcons}
                name={'apple'}
                size={6}
                color={logoColor}
              />
            }>
            Continue with Apple
          </Button>
        )}

        <Button
          variant={'ghost'}
          size={'lg'}
          onPress={() => onPressContinueWithEmail()}
          _text={{color: textColor}}>
          Continue with Email
        </Button>
      </VStack>
    </Box>
  );
};

export default React.memo(WelcomeButtonStack);
