import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {IconButton, useColorModeValue} from 'native-base';
import {ITrainable} from '../../../models/Training';

interface ITrainingCheckboxProps {
  exercise: ITrainable;
  parentExerciseId?: string;
  performed: boolean;
  setPerformed: (e: ITrainable, parentExerciseId?: string) => void;
}

const TrainingCheckbox = ({
  exercise,
  parentExerciseId,
  performed,
  setPerformed,
}: ITrainingCheckboxProps): JSX.Element => {
  const unsetColor = useColorModeValue('apple.gray.300', 'apple.gray.700');

  const unsetPressedColor = useColorModeValue(
    'apple.gray.400',
    'apple.gray.600',
  );

  const setColor = useColorModeValue('apple.blue.light', 'apple.blue.dark');

  return (
    <IconButton
      position={'absolute'}
      top={0}
      right={0}
      p={0}
      m={0}
      w={'100%'}
      _pressed={{
        color: unsetPressedColor,
        bgColor: 'rgba(0, 0, 0, 0.0)',
      }}
      _icon={{
        as: MaterialIcons,
        name: performed ? 'check-circle' : 'radio-button-unchecked',
        size: 7,
        color: performed ? setColor : unsetColor,
      }}
      onPress={() => setPerformed(exercise, parentExerciseId)}
    />
  );
};

export default React.memo(TrainingCheckbox);
