import React from 'react';
import {IPlateCountResponse} from '../../../utils/PlateCounter';
import {Button, HStack, Icon, useColorModeValue} from 'native-base';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import TrainingPlateCounter from './TrainingPlateCounter';

interface IExerciseCardFooterProps {
  plateCounterData?: IPlateCountResponse;
  onAddSetPress: () => void;
}

const ExerciseCardFooter = ({
  plateCounterData,
  onAddSetPress,
}: IExerciseCardFooterProps): JSX.Element => {
  const addSetTextColor = useColorModeValue('white', 'black');
  const addSetBgColor = useColorModeValue('black', 'white');
  const addSetPressedBgColor = useColorModeValue(
    'apple.gray.900',
    'apple.gray.100',
  );

  return (
    <HStack
      w={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
      space={4}
      mt={4}>
      <Button
        variant={'basic'}
        h={'36px'}
        w={'30%'}
        rounded={'full'}
        size={'sm'}
        bgColor={addSetBgColor}
        onPress={onAddSetPress}
        _pressed={{
          bgColor: addSetPressedBgColor,
        }}
        _text={{
          color: addSetTextColor,
        }}
        leftIcon={
          <Icon
            as={MaterialIcons}
            name={'add'}
            size={4}
            color={addSetTextColor}
          />
        }>
        Add Set
      </Button>

      {plateCounterData && <TrainingPlateCounter data={plateCounterData} />}
    </HStack>
  );
};

export default ExerciseCardFooter;
