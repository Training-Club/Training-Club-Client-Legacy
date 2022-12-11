import React from 'react';
import theme from '../src/Theme';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import RenameableHeader from '../src/components/molecules/training/RenameableHeader';
import {ExerciseType} from '../src/models/Training';

import {
  ExerciseInputType,
  ParentTrainingInput,
} from '../src/components/atoms/training/TrainingInput';

import {
  DistanceMeasurement,
  MeasurementSystem,
} from '../src/models/Measurement';

describe('Current Session Screen ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render Renameable Header', () => {
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <View w={'100%'}>
            <RenameableHeader
              text={'My Workout'}
              setText={jest.fn()}
              options={{maxLength: 36}}
              closeButton={{
                screenName: 'MainFeed',
              }}
            />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const elem = getByTestId('renameable-header');
    // const heading = getByText('My Workout'); TODO: Debug bad render issue in test only
    const btn = getByTestId('renameable-header-close-btn');

    expect(elem).toBeTruthy();
    //expect(heading).toBeTruthy();
    expect(btn).toBeTruthy();
  });

  it('should render weight input with expected props', () => {
    const {getByText, getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <View w={'100%'}>
            <ParentTrainingInput
              exercise={{
                id: '0',
                exerciseName: 'Benchpress',
                type: ExerciseType.WEIGHTED_REPS,
                addedAt: new Date(),
                values: {
                  weight: {
                    value: 135,
                    measurement: MeasurementSystem.IMPERIAL,
                  },
                },
                performed: false,
              }}
              exerciseType={ExerciseType.WEIGHTED_REPS}
              fieldName={'weight'}
              fieldType={ExerciseInputType.WEIGHT}
              performed={false}
            />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const valueElem = getByTestId('weight-input-field');
    const suffixElem = getByText('lbs');

    expect(valueElem).toBeTruthy();
    expect(suffixElem).toBeTruthy();
  });

  it('should render rep input with expected props', () => {
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <View w={'100%'}>
            <ParentTrainingInput
              exercise={{
                id: '0',
                exerciseName: 'Benchpress',
                type: ExerciseType.WEIGHTED_REPS,
                addedAt: new Date(),
                values: {
                  weight: {
                    value: 135,
                    measurement: MeasurementSystem.IMPERIAL,
                  },
                },
                performed: false,
              }}
              exerciseType={ExerciseType.WEIGHTED_REPS}
              fieldName={'reps'}
              fieldType={ExerciseInputType.REPS}
              performed={false}
            />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const valueElem = getByTestId('rep-input-field');
    expect(valueElem).toBeTruthy();
  });

  it('should render distance input with expected props', () => {
    const {getByTestId, getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <View w={'100%'}>
            <ParentTrainingInput
              exercise={{
                id: '0',
                exerciseName: 'Run',
                type: ExerciseType.DISTANCE_TIME,
                addedAt: new Date(),
                values: {
                  distance: {
                    value: 1,
                    measurement: DistanceMeasurement.KILOMETER,
                  },
                },
                performed: false,
              }}
              exerciseType={ExerciseType.DISTANCE_TIME}
              fieldName={'distance'}
              fieldType={ExerciseInputType.DISTANCE}
              performed={false}
            />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const valueElem = getByTestId('distance-input-field');
    const suffixElem = getByText('km');
    expect(valueElem).toBeTruthy();
    expect(suffixElem).toBeTruthy();
  });

  it('should render time input with expected props', () => {
    const {getByTestId, queryByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <View w={'100%'}>
            <ParentTrainingInput
              exercise={{
                id: '0',
                exerciseName: 'Run',
                type: ExerciseType.DISTANCE_TIME,
                addedAt: new Date(),
                values: {
                  time: {
                    value: {
                      hours: 1,
                      minutes: 20,
                      seconds: 30,
                      milliseconds: 504,
                    },
                    timeRenderMillis: true,
                  },
                },
                performed: false,
              }}
              exerciseType={ExerciseType.DISTANCE_TIME}
              fieldName={'time'}
              fieldType={ExerciseInputType.TIME}
              performed={false}
            />
          </View>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const hourElem = queryByTestId('time-hour-input-field');
    const minElem = getByTestId('time-minute-input-field');
    const secElem = getByTestId('time-second-input-field');
    const msElem = getByTestId('time-millisecond-input-field');

    expect(hourElem).toBeNull();
    expect(minElem).toBeTruthy();
    expect(secElem).toBeTruthy();
    expect(msElem).toBeTruthy();
  });
});
