import React from 'react';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import theme from '../src/Theme';
import {NavigationContainer} from '@react-navigation/native';
import TogglePillRow from '../src/components/molecules/design/TogglePillRow';
import TogglePill from '../src/components/atoms/design/TogglePill';
import {MuscleGroup} from '../src/models/Training';
import {Capitalize} from '../src/utils/StringUtil';

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
});
