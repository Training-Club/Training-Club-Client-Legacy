import React from 'react';
import {ExerciseEquipment} from '../../../models/Training';
import PressablePill from '../../atoms/design/PressablePill';
import {Capitalize} from '../../../utils/StringUtil';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {ColorType} from 'native-base/lib/typescript/components/types';

import {
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';

interface ICreateExerciseEquipmentProps {
  selected?: ExerciseEquipment;
  setSelectedEquipment: (equipment: ExerciseEquipment) => void;
  styling: {
    titleColor?: ColorType | string;
    textStyling: any;
    pillStyling: {
      backgroundColor?: ColorType | string;
      borderColor?: ColorType | string;
      textColor?: ColorType | string;
    };
  };
}

const CreateExerciseEquipment = ({
  selected,
  setSelectedEquipment,
  styling,
}: ICreateExerciseEquipmentProps): JSX.Element => {
  const defaultTitleColor = useColorModeValue('black', 'white');

  return (
    <VStack mt={8}>
      <Heading
        size={'sm'}
        mb={2}
        color={styling?.titleColor ?? defaultTitleColor}>
        Equipment Used (Optional)
      </Heading>

      {Object.keys(ExerciseEquipment).map((equipment, i) => {
        return (
          <PressablePill
            key={`equipment-${i}`}
            onPress={() => setSelectedEquipment(equipment as ExerciseEquipment)}
            style={{
              ...styling.pillStyling,
              roundedTop: i === 0,
              roundedBottom: i === Object.keys(ExerciseEquipment).length - 1,
            }}>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Text {...styling.textStyling}>
                {Capitalize(equipment.replace('_', ' '))}
              </Text>

              {selected === equipment && (
                <Icon as={MaterialIcons} name={'check'} size={5} />
              )}
            </HStack>
          </PressablePill>
        );
      })}
    </VStack>
  );
};

export default React.memo(CreateExerciseEquipment);
