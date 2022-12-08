import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  HStack,
  VStack,
  Icon,
  Pressable,
  Text,
  useColorModeValue,
} from 'native-base';

interface IExpandedPostTrainingSummaryActionStackProps {}

export const ExpandedPostTrainingCardSummaryActionStack =
  ({}: IExpandedPostTrainingSummaryActionStackProps): JSX.Element => {
    const mutedTextColor = useColorModeValue(
      'core.textMuted.light',
      'core.textMuted.dark',
    );

    // TODO: Implement history navigation
    const handleHistoryNavigation = React.useCallback(() => {
      console.log('goto history');
    }, []);

    const handleCompareNavigation = React.useCallback(() => {
      console.log('goto compare');
    }, []);

    return (
      <HStack zIndex={2} position={'absolute'} top={2} right={2} space={4}>
        <Pressable onPress={() => handleHistoryNavigation()}>
          <VStack alignItems={'center'}>
            <Icon
              as={MaterialIcons}
              name={'timeline'}
              size={5}
              color={mutedTextColor}
            />

            <Text color={mutedTextColor} fontSize={8}>
              History
            </Text>
          </VStack>
        </Pressable>

        <Pressable onPress={() => handleCompareNavigation()}>
          <VStack alignItems={'center'}>
            <Icon
              as={MaterialIcons}
              name={'compare-arrows'}
              size={5}
              color={mutedTextColor}
            />

            <Text color={mutedTextColor} fontSize={8}>
              Compare
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );
  };
