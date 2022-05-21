import React from 'react';
import {Input, useColorModeValue} from 'native-base';

interface IInputFieldProps {
  value: string;
  setValue: (s: string) => void;
  options?: {
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    autoComplete?:
      | 'birthdate-day'
      | 'birthdate-full'
      | 'birthdate-month'
      | 'birthdate-year'
      | 'cc-csc'
      | 'cc-exp'
      | 'cc-exp-day'
      | 'cc-exp-month'
      | 'cc-exp-year'
      | 'cc-number'
      | 'email'
      | 'gender'
      | 'name'
      | 'name-family'
      | 'name-given'
      | 'name-middle'
      | 'name-middle-initial'
      | 'name-prefix'
      | 'name-suffix'
      | 'password'
      | 'password-new'
      | 'postal-address'
      | 'postal-address-country'
      | 'postal-address-extended'
      | 'postal-address-extended-postal-code'
      | 'postal-address-locality'
      | 'postal-address-region'
      | 'postal-code'
      | 'street-address'
      | 'sms-otp'
      | 'tel'
      | 'tel-country-code'
      | 'tel-national'
      | 'tel-device'
      | 'username'
      | 'username-new'
      | 'off'
      | undefined;
  };
}

const InputField = ({
  value,
  setValue,
  options,
}: IInputFieldProps): JSX.Element => {
  const backgroundColor = useColorModeValue('apple.gray.50', 'apple.gray.900');

  return (
    <Input
      testID={'input-field'}
      value={value}
      onChangeText={e => setValue(e)}
      bgColor={backgroundColor}
      autoCapitalize={options?.autoCapitalize}
      autoComplete={options?.autoComplete}
      size={'lg'}
    />
  );
};

export default React.memo(InputField);
