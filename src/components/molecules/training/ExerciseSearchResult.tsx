import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Pressable,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';

interface IExerciseSearchResultProps {
  title: string;
  subtitle?: string;
  leftContent: JSX.Element;
  onPress?: () => void;
}

const ExerciseSearchResult = ({
  title,
  subtitle,
  leftContent,
  onPress,
}: IExerciseSearchResultProps): JSX.Element => {
  const textColor = useColorModeValue('black', 'white');
  const textColorMuted = useColorModeValue('apple.gray.600', 'apple.gray.400');

  return (
    <Pressable onPress={onPress}>
      <HStack w={'100%'} alignItems={'center'} space={4} py={1}>
        <Box w={'64px'} h={'64px'}>
          {leftContent}
        </Box>

        <VStack>
          <Heading size={'md'} color={textColor}>
            {title}
          </Heading>

          {subtitle && <Text color={textColorMuted}>{subtitle}</Text>}
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default React.memo(ExerciseSearchResult);
