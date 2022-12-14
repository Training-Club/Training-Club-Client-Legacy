import React, {useCallback} from 'react';
import PressablePill from '../../atoms/design/PressablePill';
import {useNavigation} from '@react-navigation/core';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {Heading, Text, VStack} from 'native-base';

const StartNewActionsheet = (): JSX.Element => {
  const navigation = useNavigation();
  const {actionSheetRef} = useActionsheetContext();

  const handleNewSessionTransition = useCallback(() => {
    navigation.navigate(
      'Training' as never,
      {screen: 'CurrentSession'} as never,
    );

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, navigation]);

  const handleNewPostTransition = useCallback(() => {
    navigation.navigate('Content' as never, {screen: 'ContentSelect'} as never);

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, navigation]);

  return (
    <BottomSheetView>
      <VStack px={4}>
        <Heading size={'sm'} mb={2} textAlign={'center'}>
          Training
        </Heading>

        <PressablePill
          onPress={() => handleNewSessionTransition()}
          style={{roundedTop: true}}
          icon={{name: 'fitness-center', size: 6}}>
          <Text fontWeight={'semibold'}>Blank Training Session</Text>
        </PressablePill>

        <PressablePill
          onPress={() => console.log('Training Session From Template')}
          style={{roundedBottom: true}}
          icon={{name: 'article', size: 6}}>
          <Text fontWeight={'semibold'}>Training Session From Template</Text>
        </PressablePill>
      </VStack>

      <VStack px={4} mt={4}>
        <Heading size={'sm'} mb={2} textAlign={'center'}>
          Diet
        </Heading>

        <PressablePill
          onPress={() => console.log('Add Food')}
          style={{roundedTop: true, roundedBottom: true}}
          icon={{name: 'restaurant', size: 6}}>
          <Text fontWeight={'semibold'}>Add Food</Text>
        </PressablePill>
      </VStack>

      <VStack px={4} mt={4}>
        <Heading size={'sm'} mb={2} textAlign={'center'}>
          Pictures/Videos
        </Heading>

        <PressablePill
          onPress={() => handleNewPostTransition()}
          style={{roundedTop: true, roundedBottom: true}}
          icon={{name: 'photo-camera', size: 6}}>
          <Text fontWeight={'semibold'}>Create Post</Text>
        </PressablePill>
      </VStack>
    </BottomSheetView>
  );
};

export default React.memo(StartNewActionsheet);
