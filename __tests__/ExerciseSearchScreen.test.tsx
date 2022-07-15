import React from 'react';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {MuscleGroup} from '../src/models/Training';
import {Capitalize} from '../src/utils/StringUtil';
import TogglePillRow from '../src/components/molecules/design/TogglePillRow';
import TogglePill from '../src/components/atoms/design/TogglePill';
import {Text} from 'native-base';
import theme from '../src/Theme';
import ExerciseSearchResult from '../src/components/molecules/training/ExerciseSearchResult';
import ExerciseSearchResultList from '../src/components/organisms/training/ExerciseSearchResultList';

describe('Exercise Search Screen ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render toggle pill row with toggle pill elements', () => {
    const {getByTestId, getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <TogglePillRow>
            {Object.keys(MuscleGroup).map((muscleGroup, i) => {
              return (
                <TogglePill
                  key={`tp-${i}`}
                  selected={false}
                  onToggle={jest.fn()}>
                  {Capitalize(muscleGroup.replace('_', ' '))}
                </TogglePill>
              );
            })}
          </TogglePillRow>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const rowElem = getByTestId('toggle-pill-row');
    const pillElem = getByText('Abs');

    expect(rowElem).toBeTruthy();
    expect(pillElem).toBeTruthy();
  });

  it('should render create new exercise in search result list', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <ExerciseSearchResultList data={[]} />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const createElem = getByText('Create New Exercise');

    expect(createElem).toBeTruthy();
  });

  it('should render search result', () => {
    const LeftContent = (): JSX.Element => {
      return <Text>Subtitle</Text>;
    };

    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <ExerciseSearchResult
            title={'Benchpress'}
            leftContent={LeftContent()}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const textElem = getByText('Benchpress');
    const subtitleElem = getByText('Subtitle');

    expect(textElem).toBeTruthy();
    expect(subtitleElem).toBeTruthy();
  });
});
