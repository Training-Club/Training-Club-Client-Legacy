import React from 'react';
import InputRequirement from '../../molecules/design/input/InputRequirement';
import InputRequirementItem from '../../atoms/design/InputRequirementItem';
import InputField from '../../atoms/design/InputField';

import {
  Box,
  Button,
  Heading,
  Text,
  View,
  useColorModeValue,
  FormControl,
} from 'native-base';

export interface IUsernameInputErrors {
  minLength: boolean;
  maxLength: boolean;
  specialChars: boolean;
  available: boolean;
}

interface IUsernameInputProps {
  value: string;
  setValue: (s: string) => void;
  errors: IUsernameInputErrors;
  onSubmit: () => void;
}

const UsernameInput = ({
  value,
  setValue,
  errors,
  onSubmit,
}: IUsernameInputProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');

  return (
    <View w={'100%'} h={'100%'}>
      <Box mt={-4} mb={4}>
        <Heading size={'md'} color={textColor}>
          Username
        </Heading>

        <Text color={textColor} fontSize={'xs'}>
          This is how other club members will see you.
        </Text>
      </Box>

      <Box my={2}>
        <InputRequirement direction={'column'} space={2}>
          <InputRequirementItem valid={errors.minLength}>
            Min. length of 2 characters
          </InputRequirementItem>

          <InputRequirementItem valid={errors.maxLength}>
            Max. length of 16 characters
          </InputRequirementItem>

          <InputRequirementItem valid={errors.specialChars}>
            No special characters (besides _, -, and .)
          </InputRequirementItem>

          <InputRequirementItem valid={errors.available}>
            Available
          </InputRequirementItem>
        </InputRequirement>
      </Box>

      <FormControl
        isInvalid={
          value.length > 0 &&
          (!errors.minLength ||
            !errors.maxLength ||
            !errors.specialChars ||
            !errors.available)
        }>
        <InputField
          value={value}
          setValue={setValue}
          options={{
            autoCapitalize: 'none',
            autoComplete: 'off',
            placeholder: 'Enter a username',
          }}
        />
      </FormControl>

      <Box position={'absolute'} bottom={20} w={'100%'}>
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
      </Box>
    </View>
  );
};

export default React.memo(UsernameInput);
