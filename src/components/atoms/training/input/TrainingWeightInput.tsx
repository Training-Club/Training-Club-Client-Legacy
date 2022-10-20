import React from 'react';
import {Dimensions, TextInput} from 'react-native';
import {ITrainingInputProps} from '../TrainingInput';
import {IExerciseValueWeight} from '../../../../models/Training';
import {usePushdownContext} from '../../../../context/pushdown/PushdownContext';
import {useActionsheetContext} from '../../../../context/actionsheet/ActionsheetContext';
import DarkActionsheetTheme from '../../../organisms/design/themes/DarkActionsheetTheme';
import MeasurementSelectActionsheet from '../../../molecules/training/MeasurementSelectActionsheet';
import {Factory, HStack, Text, useColorModeValue} from 'native-base';

import {
  getConvertedWeight,
  MeasurementSystem,
} from '../../../../models/Measurement';

const TrainingWeightInput = ({
  value,
  setValue,
  defaultValue,
  performed,
  style,
}: ITrainingInputProps<IExerciseValueWeight | undefined>): JSX.Element => {
  const FactoryTextInput = Factory(TextInput);
  const {setPushdownConfig} = usePushdownContext();
  const {actionSheetRef, setActionSheetConfig} = useActionsheetContext();
  const {width} = Dimensions.get('screen');
  const smallDevice = width <= 375;

  // TODO: This should be made to be more elegant, as it can lead to difficult tracing
  const measurementSuffix =
    (value && value.measurement) === MeasurementSystem.METRIC ? 'kg' : 'lbs';

  const snapPoints = React.useMemo(
    () => [smallDevice ? '50%' : '40%'],
    [smallDevice],
  );

  const defaultTextColor = useColorModeValue('black', 'white');
  const defaultMutedTextColor = useColorModeValue(
    'apple.gray.400',
    'apple.gray.600',
  );

  /**
   * Handles setting the value fields attached to this input
   */
  const handleSetValue = React.useCallback(
    (input: string) => {
      const asNumber = Number(input);

      if (!value) {
        setValue({
          value: asNumber,
          measurement: MeasurementSystem.IMPERIAL,
        });

        return;
      }

      setValue({
        value: asNumber,
        measurement: value.measurement,
      });
    },
    [setValue, value],
  );

  /**
   * Handles setting the measurement system and converting the weight
   * if the measurement system differs the currently set one
   */
  const handleSetMeasurementSystem = React.useCallback(
    (measurementName: 'imperial' | 'metric') => {
      const asMeasurement =
        measurementName === 'imperial'
          ? MeasurementSystem.IMPERIAL
          : MeasurementSystem.METRIC;

      let convertedWeight = value?.value ?? 0.0;

      if (!asMeasurement) {
        setPushdownConfig({
          title: 'Something went wrong',
          body: 'We encountered an error while trying to update your measurement',
          status: 'error',
          duration: 3000,
          show: true,
        });

        return;
      }

      if (value) {
        convertedWeight = getConvertedWeight(value.value, asMeasurement);
      }

      setValue({
        value: convertedWeight ?? 0,
        measurement: asMeasurement,
      });
    },
    [setPushdownConfig, setValue, value],
  );

  /**
   * Displays the measurement selector action sheet
   */
  const handleWeightMeasurementSelectActionsheet = React.useCallback(() => {
    if (!actionSheetRef || !actionSheetRef.current) {
      return;
    }

    setActionSheetConfig({
      children: (
        <MeasurementSelectActionsheet
          value={value?.measurement}
          setValue={handleSetMeasurementSystem}
        />
      ),
      index: -1,
      backgroundComponent: DarkActionsheetTheme,
      snapPoints: snapPoints,
    });
  }, [
    actionSheetRef,
    handleSetMeasurementSystem,
    setActionSheetConfig,
    snapPoints,
    value?.measurement,
  ]);

  return (
    <HStack w={'100%'}>
      <FactoryTextInput
        testID={'weight-input-field'}
        editable={!performed}
        keyboardType={'decimal-pad'}
        defaultValue={'' + defaultValue}
        fontSize={16}
        color={style?.textColor ?? defaultTextColor}
        borderColor={'rgba(0, 0, 0, 0.0)'}
        p={0}
        px={1}
        fontWeight={'bold'}
        selectTextOnFocus={true}
        onBlur={e => {
          handleSetValue(e.nativeEvent.text);
        }}
      />

      <Text
        color={style?.mutedTextColor ?? defaultMutedTextColor}
        fontWeight={'bold'}
        fontSize={'md'}
        textAlign={'center'}
        onLongPress={() => handleWeightMeasurementSelectActionsheet()}>
        {measurementSuffix}
      </Text>
    </HStack>
  );
};

const propsAreEqual = (
  prevProps: Readonly<ITrainingInputProps<IExerciseValueWeight | undefined>>,
  nextProps: ITrainingInputProps<IExerciseValueWeight | undefined>,
) => {
  if (prevProps.value !== nextProps.value) {
    return false;
  }

  if (prevProps.performed !== nextProps.performed) {
    return false;
  }

  return true;
};

export default React.memo(TrainingWeightInput, propsAreEqual);
