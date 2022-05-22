import React from 'react';
import InputRequirement from '../../molecules/design/input/InputRequirement';
import InputRequirementItem from '../../atoms/design/InputRequirementItem';
import InputField from '../../atoms/design/InputField';

import {
  Box,
  Button,
  Heading,
  View,
  VStack,
  useColorModeValue,
} from 'native-base';

export interface IEmailInputErrors {
  format: boolean;
  minLength: boolean;
  maxLength: boolean;
  available: boolean;
}

interface IEmailInputProps {
  value: string;
  setValue: (s: string) => void;
  errors: IEmailInputErrors;
  onSubmit: () => void;
  onBack: () => void;
}

const EmailInput = ({
  value,
  setValue,
  errors,
  onSubmit,
  onBack,
}: IEmailInputProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');
  const backButtonTextColor = useColorModeValue('white', 'black');

  return (
    <View w={'100%'} h={'100%'}>
      <Box mt={-4} mb={4}>
        <Heading size={'md'} color={textColor}>
          Email
        </Heading>
      </Box>

      <Box my={2}>
        <InputRequirement direction={'column'} space={2}>
          <InputRequirementItem valid={errors.minLength}>
            Min. length of 2 characters
          </InputRequirementItem>

          <InputRequirementItem valid={errors.maxLength}>
            Max. length of 16 characters
          </InputRequirementItem>

          <InputRequirementItem valid={errors.format}>
            Valid Email Address
          </InputRequirementItem>

          <InputRequirementItem valid={errors.available}>
            Available
          </InputRequirementItem>
        </InputRequirement>
      </Box>

      <InputField
        value={value}
        setValue={setValue}
        options={{
          autoCapitalize: 'none',
          autoComplete: 'email',
          placeholder: 'example@email.com',
        }}
      />

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
            Next
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
