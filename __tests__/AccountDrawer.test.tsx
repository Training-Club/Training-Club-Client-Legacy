import React from 'react';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import theme from '../src/Theme';
import {NavigationContainer} from '@react-navigation/native';
import AccountDrawerButtonStack from '../src/components/molecules/main/account-drawer/AccountDrawerButtonStack';
import AccountDrawerHeader from '../src/components/molecules/main/account-drawer/AccountDrawerHeader';
import {IAccount} from '../src/models/Account';

describe('Account Drawer ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render account header', () => {
    const account: IAccount = {
      id: '0',
      username: 'test_user',
      email: 'test@test.com',
    };

    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <AccountDrawerHeader
            account={account}
            data={{followerCount: 360000, followingCount: 1234}}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const titleElem = getByText('@test_user');
    const followerCountElem = getByText('360K');
    const followerTextElem = getByText('Followers');
    const followingCountElem = getByText('1.2K');
    const followingTextElem = getByText('Following');

    expect(titleElem).toBeTruthy();
    expect(followerCountElem).toBeTruthy();
    expect(followingCountElem).toBeTruthy();
    expect(followerTextElem).toBeTruthy();
    expect(followingTextElem).toBeTruthy();
  });

  it('should render account drawer button stack', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <AccountDrawerButtonStack />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const myAccountElem = getByText('My Account');
    const inboxElem = getByText('Inbox');

    expect(myAccountElem).toBeTruthy();
    expect(inboxElem).toBeTruthy();
  });
});
