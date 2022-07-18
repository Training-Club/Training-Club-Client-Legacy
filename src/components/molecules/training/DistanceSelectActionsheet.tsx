import React, {startTransition} from 'react';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import PressablePill from '../../atoms/design/PressablePill';
import {Capitalize} from '../../../utils/StringUtil';

import {
  DistanceMeasurement,
  getDistanceMeasurement,
} from '../../../models/Measurement';

import {Heading, HStack, Icon, Text, VStack} from 'native-base';

interface IDistanceSelectActionsheet {
  value?: DistanceMeasurement;
  setValue: (e: DistanceMeasurement) => void;
}

const DistanceSelectActionsheet = ({
  value,
  setValue,
}: IDistanceSelectActionsheet): JSX.Element => {
  const {actionSheetRef} = useActionsheetContext();

  const handleSetValue = React.useCallback(
    (e: string) => {
      startTransition(() => {
        const measurement = getDistanceMeasurement(e);

        if (!measurement) {
          return;
        }

        setValue(measurement);

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
        Change Distance Measurement
      </Heading>

      <VStack px={4}>
        {Object.keys(DistanceMeasurement).map((measurement, i) => {
          return (
            <PressablePill
              style={{
                roundedTop: i === 0,
                roundedBottom: i >= Object.keys(DistanceMeasurement).length - 1,
              }}
              onPress={() => handleSetValue(measurement)}>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <Text fontWeight={'semibold'}>{Capitalize(measurement)}</Text>

                {value === getDistanceMeasurement(measurement) && (
                  <Icon as={MaterialIcons} name={'check'} size={5} />
                )}
              </HStack>
            </PressablePill>
          );
        })}
      </VStack>
    </BottomSheetView>
  );
};

export default DistanceSelectActionsheet;
