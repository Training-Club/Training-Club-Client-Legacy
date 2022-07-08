import React from 'react';
import InputField from '../../atoms/design/InputField';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {
  useColorModeValue,
  View,
  VStack,
  Text,
  Box,
  Button,
  Icon,
} from 'native-base';

interface IStandardLoginInputProps {
  email: string;
  password: string;
  isVisible: boolean;
  setEmail: (s: string) => void;
  setPassword: (s: string) => void;
  setVisible: (b: boolean) => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
}

const StandardLoginInput = ({
  email,
  password,
  isVisible,
  setEmail,
  setPassword,
  setVisible,
  onSubmit,
  onForgotPassword,
  onBack,
}: IStandardLoginInputProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');
  const backButtonTextColor = useColorModeValue('white', 'black');
  const linkTextColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  const togglePasswordIcon = () => {
    return (
      <Icon
        as={MaterialIcons}
        name={isVisible ? 'visibility-off' : 'visibility'}
        size={5}
        mr={2}
        color={'muted.400'}
        onPress={() => setVisible(!isVisible)}
      />
    );
  };

  return (
    <View w={'100%'} h={'100%'}>
      <VStack space={4}>
        <Box testID={'email-input'}>
          <Text color={textColor} mb={2}>
            Email
          </Text>

          <InputField
            value={email}
            setValue={setEmail}
            options={{
              autoCapitalize: 'none',
              autoComplete: 'email',
              placeholder: 'example@email.com',
            }}
          />
        </Box>

        <Box testID={'password-input'}>
          <Text color={textColor} mb={2}>
            Password
          </Text>

          <InputField
            value={password}
            setValue={setPassword}
            options={{
              autoCapitalize: 'none',
              autoComplete: 'password',
              inputRightElement: togglePasswordIcon(),
              type: isVisible ? 'text' : 'password',
            }}
          />
        </Box>

        <Box testID={'forgot-password-btn'}>
          <Text textAlign={'center'} color={textColor} mt={4}>
            Trouble signing in?
          </Text>

          <Button
            variant={'ghost'}
            p={1}
            size={'lg'}
            _text={{color: linkTextColor}}
            _pressed={{bgColor: 'rgba(0, 0, 0, 0.0)'}}
            onPressIn={() => onForgotPassword()}>
            Forgot Password
          </Button>
        </Box>
      </VStack>

      <Box position={'absolute'} bottom={20} w={'100%'}>
        <VStack space={2}>
          <Button
            w={'100%'}
            variant={'info'}
            size={'lg'}
            _text={{
              color: 'white',
              fontWeight: 'semibold',
            }}
            onPress={() => onSubmit()}>
            Sign in
          </Button>

          <Button
            w={'100%'}
            variant={'basic'}
            size={'lg'}
            _text={{
              color: backButtonTextColor,
              fontWeight: 'semibold',
            }}
            onPress={() => onBack()}>
            Back
          </Button>
        </VStack>
      </Box>
    </View>
  );
};

export default React.memo(StandardLoginInput);
