import React, {startTransition} from 'react';
import {MeasurementSystem} from '../../../models/Measurement';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import {Heading, HStack, Icon, Text, VStack} from 'native-base';
import PressablePill from '../../atoms/design/PressablePill';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {BottomSheetView} from '@gorhom/bottom-sheet';

interface IMeasurementSelectActionsheetProps {
  value?: MeasurementSystem;
  setValue: (e: MeasurementSystem) => void;
}

const MeasurementSelectActionsheet = ({
  value,
  setValue,
}: IMeasurementSelectActionsheetProps): JSX.Element => {
  const {actionSheetRef} = useActionsheetContext();

  const handleSetValue = React.useCallback(
    (e: MeasurementSystem) => {
      startTransition(() => {
        setValue(e);

        if (actionSheetRef && actionSheetRef.current) {
          actionSheetRef.current.close();
        }
      });
    },
    [actionSheetRef, setValue],
  );

  return (
    <BottomSheetView>
      <Heading size={'sm'} textAlign={'center'} mb={3}>
        Change Measurement System
      </Heading>

      <VStack px={4}>
        <PressablePill
          style={{roundedTop: true}}
          onPress={() => handleSetValue(MeasurementSystem.METRIC)}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'semibold'}>Metric</Text>

            {value === MeasurementSystem.METRIC && (
              <Icon as={MaterialIcons} name={'check'} size={5} />
            )}
          </HStack>
        </PressablePill>

        <PressablePill
          style={{roundedBottom: true}}
          onPress={() => handleSetValue(MeasurementSystem.IMPERIAL)}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'semibold'}>Imperial</Text>

            {value === MeasurementSystem.IMPERIAL && (
              <Icon as={MaterialIcons} name={'check'} size={5} />
            )}
          </HStack>
        </PressablePill>
      </VStack>
    </BottomSheetView>
  );
};

export default MeasurementSelectActionsheet;
