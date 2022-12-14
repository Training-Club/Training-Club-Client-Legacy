import React from 'react';
import create from 'zustand';
import {IAccount} from '../models/Account';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getRefreshToken, handleAccountLoad} from '../data/Account';
import {useNavigation} from '@react-navigation/native';
import {requestRefreshedToken} from '../requests/Account';

interface AccountStore {
  account?: IAccount;
  fetching: boolean;
  initialLoad: boolean;
  accessToken?: string;
  setAccount: (acc?: IAccount) => void;
  setFetching: (bool: boolean) => void;
  setInitialLoad: (bool: boolean) => void;
  setAccessToken: (token: string) => void;
}

const useAccountStore = create<AccountStore>()(set => ({
  account: undefined,
  fetching: true,
  initialLoad: true,
  accessToken: undefined,
  setAccount: acc => set(() => ({account: acc})),
  setFetching: bool => set(() => ({fetching: bool})),
  setInitialLoad: bool => set(() => ({initialLoad: bool})),
  setAccessToken: token => set(() => ({accessToken: token})),
}));

/**
 * HOC to initialize interval update function
 *
 * @param children Child elements
 */
export const AccountComponentWrapper = ({children}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const account = useAccountStore(state => state.account);
  const accessToken = useAccountStore(state => state.accessToken);
  const initialLoad = useAccountStore(state => state.initialLoad);
  const setAccount = useAccountStore(state => state.setAccount);
  const setAccessToken = useAccountStore(state => state.setAccessToken);
  const setInitialLoad = useAccountStore(state => state.setInitialLoad);

  /**
   * Retrieves the refresh token from memory, then requests a new
   * access token from the server.
   *
   * If the refresh token does not exist, or is invalid, the client will
   * be redirected to the login page.
   */
  const handleTokenRefresh = React.useCallback(async () => {
    const refreshToken = await getRefreshToken();

    if (!refreshToken || typeof refreshToken !== 'string') {
      if (account) {
        navigation.navigate('AuthLogin');
        setAccount(undefined);
      }

      return;
    }

    requestRefreshedToken(refreshToken)
      .then(newAccessToken => {
        setAccessToken(newAccessToken);
      })
      .catch(() => {
        if (!account) {
          return;
        }

        navigation.navigate('AuthLogin');
        setAccount(undefined);
      });
  }, [account, navigation, setAccessToken, setAccount]);

  React.useEffect(() => {
    if (initialLoad || !accessToken) {
      handleAccountLoad()
        .then(response => {
          if (response.accessToken && response.accessToken !== accessToken) {
            setAccessToken(response.accessToken);
          }

          if (response.account && response.account.id !== account?.id) {
            setAccount(response.account);
            navigation.navigate('MainFeed');
          }
        })
        .catch(err => {
          console.error(err);
        });

      setInitialLoad(false);
    }

    const interval = setInterval(() => handleTokenRefresh(), 300 * 1000);
    return () => clearInterval(interval);
  }, [
    accessToken,
    account?.id,
    handleTokenRefresh,
    initialLoad,
    navigation,
    setAccessToken,
    setAccount,
    setInitialLoad,
  ]);

  return children;
};

export default useAccountStore;
