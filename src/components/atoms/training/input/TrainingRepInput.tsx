import React from 'react';
import {Factory, HStack, Text, useColorModeValue} from 'native-base';
import {ITrainingInputProps} from '../TrainingInput';
import {TextInput} from 'react-native';

const TrainingRepInput = ({
  setValue,
  defaultValue,
  performed,
  style,
}: ITrainingInputProps<number>): JSX.Element => {
  const FactoryTextInput = Factory(TextInput);
  const defaultTextColor = useColorModeValue('black', 'white');
  const defaultMutedTextColor = useColorModeValue(
    'apple.gray.400',
    'apple.gray.600',
  );

  const handleSetValue = React.useCallback(
    (input: string) => {
      setValue(Number(input));
    },
    [setValue],
  );

  console.log('re-render');

  return (
    <HStack w={'100%'}>
      <FactoryTextInput
        testID={'rep-input-field'}
        editable={!performed}
        keyboardType={'number-pad'}
        defaultValue={'' + defaultValue}
        fontWeight={'bold'}
        fontSize={16}
        selectTextOnFocus={true}
        color={style?.textColor ?? defaultTextColor}
        borderColor={'rgba(0, 0, 0, 0.0)'}
        p={0}
        px={1}
        maxLength={4}
        onBlur={e => {
          handleSetValue(e.nativeEvent.text);
        }}
      />

      <Text
        color={style?.mutedTextColor ?? defaultMutedTextColor}
        fontWeight={'bold'}
        fontSize={'md'}
        textAlign={'center'}>
        reps
      </Text>
    </HStack>
  );
};

export default React.memo(TrainingRepInput);
