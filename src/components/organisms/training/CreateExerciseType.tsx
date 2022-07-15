import React from 'react';
import {ExerciseType} from '../../../models/Training';
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

interface ICreateExerciseTypeProps {
  selected?: ExerciseType;
  setSelectedExerciseType: (type: ExerciseType) => void;
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
  setSelectedExerciseType,
  styling,
}: ICreateExerciseTypeProps): JSX.Element => {
  const defaultTitleColor = useColorModeValue('black', 'white');

  return (
    <VStack>
      <Heading
        size={'sm'}
        mb={2}
        color={styling.titleColor ?? defaultTitleColor}>
        Exercise Type
      </Heading>

      {Object.keys(ExerciseType).map((exercise, i) => {
        return (
          <PressablePill
            key={`exerciseType-${i}`}
            onPress={() => setSelectedExerciseType(exercise as ExerciseType)}
            style={{
              ...styling.pillStyling,
              roundedTop: i === 0,
              roundedBottom: i === Object.keys(ExerciseType).length - 1,
            }}>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Text {...styling.textStyling}>
                {Capitalize(exercise.replace('_', ' '))}
              </Text>

              {selected === exercise && (
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
