import React from 'react';
import {ITrainingInputProps} from '../TrainingInput';
import {TextInput} from 'react-native';
import {IExerciseValueTime} from '../../../../models/Training';
import {Factory, HStack, Text, useColorModeValue} from 'native-base';

export enum TrainingTimeInputFieldType {
  HOUR = 'hours',
  MINUTE = 'minutes',
  SECOND = 'seconds',
  MILLISECOND = 'milliseconds',
}

const TrainingTimeInput = ({
  value,
  setValue,
  performed,
  style,
}: ITrainingInputProps<IExerciseValueTime | undefined>): JSX.Element => {
  const FactoryTextInput = Factory(TextInput);
  const defaultTextColor = useColorModeValue('black', 'white');
  const defaultMutedTextColor = useColorModeValue(
    'apple.gray.400',
    'apple.gray.600',
  );

  const getFormattedTimeValue = React.useCallback((input: number) => {
    if (input <= 0) {
      return '00';
    }

    if (input < 10) {
      return '0' + input;
    }

    return '' + input;
  }, []);

  const handleSetValue = React.useCallback(
    (e: string, fieldType: TrainingTimeInputFieldType) => {
      if (!value) {
        return;
      }

      let asNumber = Number(e);

      if (fieldType === TrainingTimeInputFieldType.HOUR) {
        if (asNumber >= 24) {
          asNumber = 23;
        }
      }

      if (
        fieldType === TrainingTimeInputFieldType.MINUTE ||
        fieldType === TrainingTimeInputFieldType.SECOND
      ) {
        if (asNumber >= 60) {
          asNumber = 59;
        }
      }

      if (fieldType === TrainingTimeInputFieldType.MILLISECOND) {
        if (asNumber >= 999) {
          asNumber = 999;
        }
      }

      setValue({
        ...value,
        [`${fieldType}`]: asNumber,
      });
    },
    [setValue, value],
  );

  return (
    <HStack w={'100%'}>
      {!value?.timeRenderMillis && (
        <>
          <FactoryTextInput
            testID={'time-hour-input-field'}
            key={'hour'}
            editable={!performed}
            keyboardType={'number-pad'}
            color={style?.textColor ?? defaultTextColor}
            borderColor={'rgba(0, 0, 0, 0.0)'}
            p={0}
            fontSize={16}
            fontWeight={'bold'}
            selectTextOnFocus={true}
            maxLength={2}
            onBlur={e =>
              handleSetValue(
                e.nativeEvent.text,
                TrainingTimeInputFieldType.HOUR,
              )
            }
            defaultValue={
              value && value.value
                ? getFormattedTimeValue(value.value.hours)
                : '00'
            }
          />

          <Text color={defaultMutedTextColor}>:</Text>
        </>
      )}

      <FactoryTextInput
        testID={'time-minute-input-field'}
        key={'minute'}
        editable={!performed}
        keyboardType={'number-pad'}
        color={style?.textColor ?? defaultTextColor}
        borderColor={'rgba(0, 0, 0, 0.0)'}
        p={0}
        fontSize={16}
        fontWeight={'bold'}
        selectTextOnFocus={true}
        maxLength={2}
        onBlur={e =>
          handleSetValue(e.nativeEvent.text, TrainingTimeInputFieldType.MINUTE)
        }
        defaultValue={
          value && value.value
            ? getFormattedTimeValue(value.value.minutes)
            : '00'
        }
      />

      <Text color={defaultMutedTextColor}>:</Text>

      <FactoryTextInput
        testID={'time-second-input-field'}
        key={'second'}
        editable={!performed}
        keyboardType={'number-pad'}
        color={style?.textColor ?? defaultTextColor}
        borderColor={'rgba(0, 0, 0, 0.0)'}
        p={0}
        fontSize={16}
        fontWeight={'bold'}
        selectTextOnFocus={true}
        maxLength={2}
        onBlur={e =>
          handleSetValue(e.nativeEvent.text, TrainingTimeInputFieldType.SECOND)
        }
        defaultValue={
          value && value.value
            ? getFormattedTimeValue(value.value.seconds)
            : '00'
        }
      />

      {value && value.timeRenderMillis && (
        <HStack>
          <Text color={style?.mutedTextColor ?? defaultMutedTextColor}>.</Text>

          <FactoryTextInput
            testID={'time-millisecond-input-field'}
            key={'millisecond'}
            editable={!performed}
            keyboardType={'number-pad'}
            color={style?.textColor ?? defaultTextColor}
            borderColor={'rgba(0, 0, 0, 0.0)'}
            p={0}
            fontSize={16}
            fontWeight={'bold'}
            selectTextOnFocus={true}
            maxLength={3}
            onBlur={e =>
              handleSetValue(
                e.nativeEvent.text,
                TrainingTimeInputFieldType.MILLISECOND,
              )
            }
            defaultValue={
              value && value.value
                ? getFormattedTimeValue(value.value.milliseconds)
                : '000'
            }
          />
        </HStack>
      )}
    </HStack>
  );
};

const propsAreEqual = (
  prevProps: Readonly<ITrainingInputProps<IExerciseValueTime | undefined>>,
  nextProps: Readonly<ITrainingInputProps<IExerciseValueTime | undefined>>,
) => {
  if (prevProps.performed !== nextProps.performed) {
    return false;
  }

  if (prevProps.value !== nextProps.value) {
    return false;
  }

  return true;
};

export default React.memo(TrainingTimeInput, propsAreEqual);
