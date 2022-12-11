import React, {useCallback} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import useExerciseStore from '../../../store/ExerciseStore';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import {ActionsheetHeading} from '../../atoms/design/ActionsheetHeading';
import {ActionsheetPressable} from '../../atoms/design/ActionsheetPressable';
import {Box, useColorModeValue, VStack} from 'native-base';

const StartNewActionsheet = (): JSX.Element => {
  const exercises = useExerciseStore(state => state.exercises);
  const clearExercises = useExerciseStore(state => state.clearExercises);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {actionSheetRef} = useActionsheetContext();

  const bgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundAccent.dark',
  );

  const specialTextColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  const boxStyling = {
    bgColor: bgColor,
    px: 4,
    borderRadius: 12,
  };

  /**
   * Transitions to the current session screen and closes the actionsheet
   */
  const handleResumeSessionTransition = useCallback(() => {
    navigation.navigate('TrainingCurrentSession');

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, navigation]);

  /**
   * Wipes the current session data and transitions to the current session screen
   */
  const handleNewSessionTransition = useCallback(() => {
    clearExercises();

    navigation.navigate('TrainingCurrentSession');

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, clearExercises, navigation]);

  /**
   * Transitions to the content select screen and closes the actionsheet
   */
  const handleNewPostTransition = useCallback(() => {
    navigation.navigate('ContentSelect');

    if (actionSheetRef && actionSheetRef.current) {
      actionSheetRef.current.close();
    }
  }, [actionSheetRef, navigation]);

  return (
    <BottomSheetView>
      <Box px={4}>
        <ActionsheetHeading>Training</ActionsheetHeading>

        <VStack {...boxStyling}>
          {exercises && exercises.length > 0 && (
            <ActionsheetPressable
              onPress={() => handleResumeSessionTransition()}
              icon={{name: 'replay', size: 6}}
              text={{primary: 'Resume', secondary: 'Training Session'}}
              styling={{primary: {color: specialTextColor}, borderBottom: true}}
            />
          )}

          <ActionsheetPressable
            onPress={() => handleNewSessionTransition()}
            icon={{name: 'fitness-center', size: 6}}
            text={{primary: 'Blank', secondary: 'Training Session'}}
            styling={{borderBottom: true}}
          />

          <ActionsheetPressable
            onPress={() => console.log('Training Session From Template')}
            icon={{name: 'article', size: 6}}
            text={{primary: 'Template', secondary: 'Training Session'}}
          />
        </VStack>
      </Box>

      <Box px={4} mt={4}>
        <ActionsheetHeading>Diet</ActionsheetHeading>

        <VStack {...boxStyling}>
          <ActionsheetPressable
            onPress={() => console.log('Add Food')}
            icon={{name: 'restaurant', size: 6}}
            text={{primary: 'Add Food'}}
            styling={{borderBottom: true}}
          />

          <ActionsheetPressable
            onPress={() => console.log('Add Biometric')}
            text={{primary: 'Add Biometric'}}
            icon={{
              family: MaterialCommunityIcons,
              name: 'scale-bathroom',
              size: 6,
            }}
          />
        </VStack>
      </Box>

      <Box px={4} mt={4}>
        <ActionsheetHeading>Content</ActionsheetHeading>

        <VStack {...boxStyling}>
          <ActionsheetPressable
            onPress={() => handleNewPostTransition()}
            icon={{name: 'photo-camera', size: 6}}
            text={{primary: 'New Post'}}
          />
        </VStack>
      </Box>
    </BottomSheetView>
  );
};

export default StartNewActionsheet;
