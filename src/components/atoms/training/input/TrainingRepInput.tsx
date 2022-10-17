import React from 'react';
import {ITrainingInputProps} from '../TrainingInput';
import {TextInput} from 'react-native';
import {Factory, HStack, Text, useColorModeValue} from 'native-base';

const TrainingRepInput = ({
  setValue,
  defaultValue,
  performed,
  style,
}: ITrainingInputProps<number>): JSX.Element => {
  const FactoryTextInput = Factory(TextInput);

  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

  const defaultMutedTextColor = useColorModeValue(
    'core.mutedText.light',
    'core.mutedText.dark',
  );

  const handleSetValue = React.useCallback(
    (input: string) => {
      setValue(Number(input));
    },
    [setValue],
  );

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

const propsAreEqual = (
  prevProps: Readonly<ITrainingInputProps<number>>,
  nextProps: Readonly<ITrainingInputProps<number>>,
): boolean => {
  if (prevProps.performed !== nextProps.performed) {
    return false;
  }

  return prevProps.value === nextProps.value;
};

export default React.memo(TrainingRepInput, propsAreEqual);
