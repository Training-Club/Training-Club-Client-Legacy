import React from 'react';

import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import theme from '../src/Theme';
import {NavigationContainer} from '@react-navigation/native';

import CreateExerciseType from '../src/components/organisms/training/CreateExerciseType';
import CreateExerciseMuscleGroup from '../src/components/organisms/training/CreateExerciseMuscleGroup';
import CreateExerciseEquipment from '../src/components/organisms/training/CreateExerciseEquipment';

import {
  ExerciseEquipment,
  ExerciseType,
  MuscleGroup,
} from '../src/models/Training';

describe('Exercise Create Screen ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render exercise type selection', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <CreateExerciseType
            selected={ExerciseType.WEIGHTED_REPS}
            setSelectedExerciseType={jest.fn()}
            styling={{
              titleColor: undefined,
              textStyling: undefined,
              pillStyling: {
                backgroundColor: undefined,
                borderColor: undefined,
                textColor: undefined,
              },
            }}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const pillElem = getByText('Weighted Reps');

    expect(pillElem).toBeTruthy();
  });

  it('should render exercise muscle group selection', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <CreateExerciseMuscleGroup
            selected={[MuscleGroup.ABS, MuscleGroup.CHEST]}
            toggleMuscleGroup={jest.fn()}
            styling={{
              titleColor: undefined,
              textStyling: undefined,
              pillStyling: {
                backgroundColor: undefined,
                borderColor: undefined,
                textColor: undefined,
              },
            }}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const pillElem = getByText('Abs');

    expect(pillElem).toBeTruthy();
  });

  it('should render exercise equipment selection', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <CreateExerciseEquipment
            selected={ExerciseEquipment.BARBELL}
            setSelectedEquipment={jest.fn()}
            styling={{
              titleColor: undefined,
              textStyling: undefined,
              pillStyling: {
                backgroundColor: undefined,
                borderColor: undefined,
                textColor: undefined,
              },
            }}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const pillElem = getByText('Barbell');

    expect(pillElem).toBeTruthy();
  });
});
