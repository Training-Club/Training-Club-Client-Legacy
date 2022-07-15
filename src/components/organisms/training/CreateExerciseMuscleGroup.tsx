import React from 'react';
import {ExerciseType, MuscleGroup} from '../../../models/Training';
import {ColorType} from 'native-base/lib/typescript/components/types';
import PressablePill from '../../atoms/design/PressablePill';
import {Capitalize} from '../../../utils/StringUtil';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from 'native-base';

interface ICreateExerciseMuscleGroupProps {
  selected: MuscleGroup[];
  toggleMuscleGroup: (muscleGroup: MuscleGroup) => void;
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

const CreateExerciseType = ({
  selected,
  toggleMuscleGroup,
  styling,
}: ICreateExerciseMuscleGroupProps): JSX.Element => {
  const defaultTitleColor = useColorModeValue('black', 'white');

  return (
    <VStack mt={8}>
      <Heading
        size={'sm'}
        mb={2}
        color={styling.titleColor ?? defaultTitleColor}>
        Muscle Group (Max 3)
      </Heading>

      {Object.keys(MuscleGroup).map((muscleGroup, i) => {
        return (
          <PressablePill
            key={`muscleGroup-${i}`}
            onPress={() => toggleMuscleGroup(muscleGroup as MuscleGroup)}
            style={{
              ...styling.pillStyling,
              roundedTop: i === 0,
              roundedBottom: i === Object.keys(MuscleGroup).length - 1,
            }}>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Text {...styling.textStyling}>
                {Capitalize(muscleGroup.replace('_', ' '))}
              </Text>

              {selected.find(mgs => mgs === muscleGroup) !== undefined && (
                <Icon as={MaterialIcons} name={'check'} size={5} />
              )}
            </HStack>
          </PressablePill>
        );
      })}
    </VStack>
  );
};

export default React.memo(CreateExerciseType);
