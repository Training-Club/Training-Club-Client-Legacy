import React from 'react';
import {Heading, Text, VStack} from 'native-base';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import PressablePill from '../../atoms/design/PressablePill';

const StartNewActionsheet = (): JSX.Element => {
  return (
    <BottomSheetView>
      <VStack px={4}>
        <Heading size={'sm'} mb={2} textAlign={'center'}>
          Training
        </Heading>

        <PressablePill
          onPress={() => console.log('Blank Training Session')}
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
          onPress={() => console.log('Create Picture/Video Post')}
          style={{roundedTop: true, roundedBottom: true}}
          icon={{name: 'photo-camera', size: 6}}>
          <Text fontWeight={'semibold'}>Create Post</Text>
        </PressablePill>
      </VStack>
    </BottomSheetView>
  );
};

export default StartNewActionsheet;
