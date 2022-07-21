import React from 'react';
import {IExerciseValueDistance} from '../../../../models/Training';
import {ITrainingInputProps} from '../TrainingInput';
import {Dimensions, TextInput} from 'react-native';
import DistanceSelectActionsheet from '../../../molecules/training/DistanceSelectActionsheet';
import DarkActionsheetTheme from '../../../organisms/design/themes/DarkActionsheetTheme';
import {useActionsheetContext} from '../../../../context/actionsheet/ActionsheetContext';
import {usePushdownContext} from '../../../../context/pushdown/PushdownContext';
import {HStack, Text, useColorModeValue, Factory} from 'native-base';

import {
  DistanceMeasurement,
  getConvertedDistance,
  getDistanceMeasurement,
  getDistanceMeasurementSuffix,
} from '../../../../models/Measurement';

const TrainingDistanceInput = ({
  value,
  setValue,
  defaultValue,
  performed,
  style,
}: ITrainingInputProps<IExerciseValueDistance | undefined>): JSX.Element => {
  const FactoryTextInput = Factory(TextInput);
  const {actionSheetRef, setActionSheetConfig} = useActionsheetContext();
  const {setPushdownConfig} = usePushdownContext();
  const {width} = Dimensions.get('screen');
  const smallDevice = width <= 375;
  const measurement = value?.measurement
    ? getDistanceMeasurementSuffix(value.measurement)
    : 'm';

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
    (e: string) => {
      const asNumber = Number(e);

      if (!value) {
        setValue({
          value: asNumber,
          measurement: DistanceMeasurement.METER,
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
   * Handles updating the measurement system field with the provided measurement name
   */
  const handleSetMeasurementSystem = React.useCallback(
    (measurementName: string) => {
      const asMeasurement = getDistanceMeasurement(measurementName);
      const prevMeasurement = value?.measurement;
      let convertedDistance = value?.value;

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

      if (prevMeasurement && convertedDistance) {
        convertedDistance = getConvertedDistance(
          convertedDistance,
          prevMeasurement,
          asMeasurement,
        );
      }

      setValue({
        value: convertedDistance ?? 0,
        measurement: asMeasurement,
      });
    },
    [setPushdownConfig, setValue, value?.measurement, value?.value],
  );

  /**
   * Handles setting and opening the distance measurement system select Action sheet
   */
  const handleDistanceSelectActionsheet = React.useCallback(() => {
    if (!actionSheetRef || !actionSheetRef.current) {
      return;
    }

    setActionSheetConfig({
      index: -1,
      backgroundComponent: DarkActionsheetTheme,
      snapPoints: snapPoints,
      children: (
        <DistanceSelectActionsheet
          value={value?.measurement}
          setValue={handleSetMeasurementSystem}
        />
      ),
    });

    actionSheetRef.current.snapToIndex(0);
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
        testID={'distance-input-field'}
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
        onLongPress={handleDistanceSelectActionsheet}>
        {measurement}
      </Text>
    </HStack>
  );
};

const propsAreEqual = (
  prevProps: Readonly<ITrainingInputProps<IExerciseValueDistance | undefined>>,
  nextProps: Readonly<ITrainingInputProps<IExerciseValueDistance | undefined>>,
) => {
  if (prevProps.performed !== nextProps.performed) {
    return false;
  }

  if (prevProps.value !== nextProps.value) {
    return false;
  }

  return true;
};

export default React.memo(TrainingDistanceInput, propsAreEqual);
