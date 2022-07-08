import React from 'react';
import {HStack, Icon, Text, useColorModeValue} from 'native-base';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

interface IInputRequirementItemProps {
  valid: boolean;
  children: any;
}

const InputRequirementItem = ({
  valid,
  children,
}: IInputRequirementItemProps): JSX.Element => {
  const validColor = useColorModeValue('apple.green.light', 'apple.green.dark');
  const invalidColor = useColorModeValue('apple.red.light', 'apple.red.dark');

  return (
    <HStack space={1}>
      <Icon
        size={6}
        color={valid ? validColor : invalidColor}
        as={MaterialIcons}
        name={valid ? 'check' : 'close'}
      />

      <Text mt={0.5}>{children}</Text>
    </HStack>
  );
};

export default React.memo(InputRequirementItem);
