import React from 'react';
import {useKeyboard} from "../../../../../../hooks/useKeyboard";

import {
  Avatar,
  Box,
  HStack,
  KeyboardAvoidingView,
  Input,
  useColorModeValue,
} from 'native-base';
import {useSharedValue} from "react-native-reanimated";

interface IExpandedPostCommentSectionProps {}

export const ExpandedPostCommentSection =
  ({}: IExpandedPostCommentSectionProps): JSX.Element => {
  const isKeyboardOpen = useKeyboard();
  const bottomPadding = useSharedValue(8);


    const bgColor = useColorModeValue(
      'core.backgroundAccent.light',
      'core.backgroundAccent.dark',
    );

    return (
      <KeyboardAvoidingView zIndex={2} behavior={'position'}>
        <Box
          position={'absolute'}
          left={0}
          bottom={0}
          w={'100%'}
          pb={isKeyboardOpen ? 4 : 8}
          bgColor={bgColor}>
          <HStack pt={4} space={4} px={8} justifyContent={'space-between'}>
            <Avatar size={'sm'} borderRadius={12} />
            <Input flexGrow={1} h={12} borderRadius={12} placeholder={'test'} />
          </HStack>
        </Box>
      </KeyboardAvoidingView>
    );
  };
