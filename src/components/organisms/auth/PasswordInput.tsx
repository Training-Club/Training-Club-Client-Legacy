import React from 'react';
import InputRequirement from '../../molecules/design/input/InputRequirement';
import InputRequirementItem from '../../atoms/design/InputRequirementItem';
import InputField from '../../atoms/design/InputField';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  Box,
  Button,
  FormControl,
  Heading,
  Icon,
  useColorModeValue,
  View,
  VStack,
} from 'native-base';

export interface IPasswordInputErrors {
  match: boolean;
  minLength: boolean;
  maxLength: boolean;
  specialChars: boolean;
}

interface IPasswordInputProps {
  value: string;
  confirmValue: string;
  setValue: (s: string) => void;
  setConfirmValue: (s: string) => void;
  isVisible: boolean;
  setVisible: (b: boolean) => void;
  errors: IPasswordInputErrors;
  onSubmit: () => void;
  onBack: () => void;
}

const EmailInput = ({
  value,
  confirmValue,
  setValue,
  setConfirmValue,
  isVisible,
  setVisible,
  errors,
  onSubmit,
  onBack,
}: IPasswordInputProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');
  const backButtonTextColor = useColorModeValue('white', 'black');

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
      <Box mt={-4} mb={4}>
        <Heading testID={'password-heading'} size={'md'} color={textColor}>
          Password
        </Heading>
      </Box>

      <Box my={2}>
        <InputRequirement direction={'column'} space={2}>
          <InputRequirementItem valid={errors.minLength}>
            Min. length of 8 characters
          </InputRequirementItem>

          <InputRequirementItem valid={errors.maxLength}>
            Max. length of 32 characters
          </InputRequirementItem>

          <InputRequirementItem valid={errors.specialChars}>
            Contains at least 1 digit and special character
          </InputRequirementItem>

          <InputRequirementItem valid={errors.match}>
            Confirmed password matches
          </InputRequirementItem>
        </InputRequirement>
      </Box>

      <VStack w={'100%'} space={4}>
        <FormControl
          mt={4}
          isInvalid={
            value.length > 0 &&
            (!errors.minLength ||
              !errors.maxLength ||
              !errors.specialChars ||
              !errors.maxLength)
          }>
          <FormControl.Label>Password</FormControl.Label>

          <InputField
            value={value}
            setValue={setValue}
            options={{
              type: isVisible ? 'text' : 'password',
              autoCapitalize: 'none',
              autoComplete: 'password',
              inputRightElement: togglePasswordIcon(),
              placeholder: 'Enter a password 8-32 characters',
            }}
          />
        </FormControl>

        <FormControl isInvalid={!errors.match}>
          <FormControl.Label>Confirm Password</FormControl.Label>

          <InputField
            value={confirmValue}
            setValue={setConfirmValue}
            options={{
              type: isVisible ? 'text' : 'password',
              autoCapitalize: 'none',
              autoComplete: 'password',
              placeholder: 'Re-enter your password',
            }}
          />
        </FormControl>
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
            Create Account
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

export default React.memo(EmailInput);
