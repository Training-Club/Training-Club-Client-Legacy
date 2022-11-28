import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  Heading,
  HStack,
  Square,
  VStack,
  Pressable,
  Icon,
  useColorModeValue,
} from 'native-base';

interface ISessionSummaryCard {
  sessionName?: string;
  onContentUpload?: () => void;
}

export const SessionSummaryCard = ({
  sessionName,
  onContentUpload,
}: ISessionSummaryCard): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  const bgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const imageCardBgColor = useColorModeValue(
    'core.backgroundAccent.light',
    'core.backgroundAccent.dark',
  );

  return (
    <HStack
      w={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bgColor={bgColor}
      mt={2}
      p={2}
      borderRadius={12}>
      <Pressable onPress={onContentUpload}>
        <Square w={16} h={16} borderRadius={12} bgColor={imageCardBgColor}>
          <Icon as={MaterialIcons} name={'photo'} size={10} />
        </Square>
      </Pressable>

      <VStack>
        <Heading size={'md'} color={textColor}>
          {sessionName ?? 'My Workout'}
        </Heading>
      </VStack>
    </HStack>
  );
};
