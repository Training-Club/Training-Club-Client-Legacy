import React from 'react';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import theme from '../src/Theme';
import {NavigationContainer} from '@react-navigation/native';
import {ActionsheetPressable} from '../src/components/atoms/design/ActionsheetPressable';
import {ActionsheetHeading} from "../src/components/atoms/design/ActionsheetHeading";

describe('Start New Actionsheet ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render actionsheet pressable', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <ActionsheetPressable
            onPress={jest.fn}
            text={{primary: 'Primary', secondary: 'Secondary'}}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const primaryElem = getByText('Primary');
    const secondaryElem = getByText('Secondary');

    expect(primaryElem).toBeTruthy();
    expect(secondaryElem).toBeTruthy();
  });

  it('should render pressable icon', () => {
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <ActionsheetPressable
            onPress={jest.fn}
            text={{primary: 'Primary', secondary: 'Secondary'}}
            icon={{name: 'more-horiz', size: 6}}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const elem = getByTestId('actionsheet-pressable-icon');

    expect(elem).toBeTruthy();
  });

  it('should render actionsheet header', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <ActionsheetHeading>Sample Heading</ActionsheetHeading>
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const elem = getByText('Sample Heading');

    expect(elem).toBeTruthy();
  });
});
