import React, {useState} from 'react';
import {IAccount} from '../../models/Account';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountContext} from './AccountContext';
import {getRefreshToken, handleAccountLoad} from '../../data/Account';
import {requestRefreshedToken} from '../../requests/Account';
import {useNavigation} from '@react-navigation/native';

interface IAccountContextProviderProps {
  children: any;
}

export function AccountContextProvider({
  children,
}: IAccountContextProviderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [account, setAccount] = useState<IAccount | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [fetching, setFetching] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleTokenRefresh = React.useCallback(async () => {
    const refreshToken = await getRefreshToken();

    if (!refreshToken || typeof refreshToken !== 'string') {
      if (account) {
        navigation.navigate('Auth', {screen: 'Login'});
        setAccount(undefined);
      }

      return;
    }

    requestRefreshedToken(refreshToken)
      .then(newAccessToken => {
        setAccessToken(newAccessToken);
      })
      .catch(() => {
        if (account) {
          navigation.navigate('Auth', {screen: 'Login'});
          setAccount(undefined);
        }
      });
  }, [account, navigation]);

  React.useEffect(() => {
    if (initialLoad || !accessToken) {
      handleAccountLoad()
        .then(response => {
          if (response.accessToken && response.accessToken !== accessToken) {
            setAccessToken(response.accessToken);
          }

          if (response.account && response.account.id !== account?.id) {
            setAccount(response.account);
            navigation.navigate('Main', {screen: 'Feed'});
          }
        })
        .catch(err => {
          console.error(err);
        });

      setInitialLoad(false);
    }

    const interval = setInterval(() => {
      handleTokenRefresh();
    }, 300 * 1000);

    return () => clearInterval(interval);
  }, [accessToken, account?.id, handleTokenRefresh, initialLoad, navigation]);

  return (
    <AccountContext.Provider
      value={{
        account,
        fetching,
        accessToken,
        initialLoad,
        setAccount: (acc: IAccount) => setAccount(acc),
        setFetching,
        setAccessToken,
        setInitialLoad,
      }}>
      {children}
    </AccountContext.Provider>
  );
}
