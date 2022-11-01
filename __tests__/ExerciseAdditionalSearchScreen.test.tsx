import theme from '../src/Theme';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {render} from '@testing-library/react-native';
import AdditionalExerciseSelection from '../src/components/molecules/training/AdditionalExerciseSelection';
import {
  ExerciseEquipment,
  ExerciseInfo,
  ExerciseType,
  MuscleGroup,
} from '../src/models/Training';

describe('Exercise Additional Search Screen ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render selection content', () => {
    const exerciseData: ExerciseInfo[] = [
      {
        id: '0',
        name: 'Benchpress',
        type: ExerciseType.WEIGHTED_REPS,
        verified: true,
        muscleGroups: [MuscleGroup.CHEST, MuscleGroup.UPPER_ARMS],
        equipment: ExerciseEquipment.BARBELL,
      },

      {
        id: '1',
        name: 'Back Squat',
        type: ExerciseType.WEIGHTED_REPS,
        verified: true,
        muscleGroups: [MuscleGroup.THIGHS, MuscleGroup.BACK],
        equipment: ExerciseEquipment.BARBELL,
      },
    ];

    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <View w={'100%'}>
            <AdditionalExerciseSelection
              data={exerciseData}
              onToggle={jest.fn}
              onComplete={jest.fn}
            />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const benchPill = getByText('Benchpress');
    const squatPill = getByText('Back Squat');
    const addBtnPill = getByText('Add');

    expect(benchPill).toBeTruthy();
    expect(squatPill).toBeTruthy();
    expect(addBtnPill).toBeTruthy();
  });
});
