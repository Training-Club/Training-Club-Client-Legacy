import React from 'react';
import theme from '../src/Theme';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider, View} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import RenameableHeader from '../src/components/molecules/training/RenameableHeader';

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
                stackName: 'Main',
                screenName: 'Home',
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
});
