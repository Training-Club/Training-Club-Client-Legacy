import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  Heading,
  HStack,
  Square,
  VStack,
  Pressable,
  Icon,
  Text,
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

  const mutedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

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
      p={2}
      borderRadius={12}>
      <VStack maxW={'80%'} ml={2} flexWrap={'wrap'}>
        <Heading size={'md'} color={textColor}>
          {sessionName ?? 'My Workout'}
        </Heading>
      </VStack>

      <Pressable onPress={onContentUpload}>
        <Square w={16} h={16} borderRadius={12} bgColor={imageCardBgColor}>
          <Icon as={MaterialIcons} name={'photo'} size={10} />
          <Text fontSize={10} color={mutedTextColor}>
            Upload
          </Text>
        </Square>
      </Pressable>
    </HStack>
  );
};
