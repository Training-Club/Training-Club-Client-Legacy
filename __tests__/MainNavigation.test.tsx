import React from 'react';
import theme from '../src/Theme';
import {NativeBaseProvider} from 'native-base';
import MainNavigation from '../src/components/molecules/main/MainNavigation';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

describe('Main Navigation ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render navigation elements', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const homeElem = getByText('Home');
    const discoverElem = getByText('Discover');
    const newElem = getByText('New');
    const analyticsElem = getByText('Analytics');
    const profileElem = getByText('Profile');

    expect(homeElem).toBeTruthy();
    expect(homeElem.props.style.color).toEqual('rgb(0, 122, 255)');
    expect(discoverElem).toBeTruthy();
    expect(newElem).toBeTruthy();
    expect(analyticsElem).toBeTruthy();
    expect(profileElem).toBeTruthy();
  });
});
