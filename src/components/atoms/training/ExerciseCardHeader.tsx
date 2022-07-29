import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {Box, Heading, HStack, IconButton, useColorModeValue} from 'native-base';

interface IExerciseCardHeaderProps {
  title: string;
  subtitle?: string;
  onSettingsPress: () => void;
}

const ExerciseCardHeader = ({
  title,
  subtitle,
  onSettingsPress,
}: IExerciseCardHeaderProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');
  const settingsBgColor = useColorModeValue('apple.gray.100', 'apple.gray.800');
  const settingsPressedBgColor = useColorModeValue(
    'apple.gray.200',
    'apple.gray.700',
  );

  return (
    <Box w={'100%'} mb={4}>
      <HStack w={'100%'} justifyContent={'space-between'}>
        <Heading size={'md'} isTruncated={true} maxW={'100%'} pr={4}>
          {title}
        </Heading>

        <IconButton
          testID={'exercise-card-close-btn'}
          variant={'solid'}
          position={'absolute'}
          top={0}
          right={0}
          size={'sm'}
          rounded={'full'}
          bgColor={settingsBgColor}
          onPress={onSettingsPress}
          _pressed={{bgColor: settingsPressedBgColor}}
          _icon={{
            as: MaterialIcons,
            name: 'more-horiz',
            color: textColor,
          }}
        />
      </HStack>

      {subtitle && (
        <Box w={'100%'}>
          <Heading size={'xs'} fontWeight={'semibold'}>
            {subtitle}
          </Heading>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ExerciseCardHeader);
