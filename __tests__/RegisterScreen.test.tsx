import React from 'react';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import CloseableHeader from '../src/components/molecules/design/CloseableHeader';
import {NavigationContainer} from '@react-navigation/native';
import theme from '../src/Theme';
import UsernameInput from '../src/components/organisms/auth/UsernameInput';

describe('RegisterScreen ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render Closeable Header', () => {
    const {getByTestId, getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <CloseableHeader
            pageTitle={'Join Training Club'}
            closeButton={{
              stackName: 'Auth',
              screenName: 'Welcome',
            }}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const elem = getByTestId('closeable-header');
    const heading = getByText('Join Training Club');
    const btn = getByTestId('closeable-header-btn');

    expect(elem).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(btn).toBeTruthy();
  });

  it('should render username input content', () => {
    const {getByText, getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <UsernameInput
          value={''}
          setValue={jest.fn}
          onSubmit={() => {}}
          errors={{
            minLength: true,
            maxLength: false,
            specialChars: true,
            available: false,
          }}
        />
      </NativeBaseProvider>,
    );

    const heading = getByText('Username');
    const subtitle = getByText('This is how other club members will see you.');
    const requirement = getByText('Min. length of 2 characters');
    const inputField = getByTestId('input-field');
    const nextBtn = getByText('Next');

    expect(heading).toBeTruthy();
    expect(subtitle).toBeTruthy();
    expect(requirement).toBeTruthy();
    expect(inputField).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });
});
