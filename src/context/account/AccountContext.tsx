import {createContext, useContext} from 'react';
import {IAccount} from '../../models/Account';

export type AccountContextParam = {
  account?: IAccount;
  fetching?: boolean;
  initialLoad?: boolean;
  accessToken?: string;
  setAccount: (account: IAccount) => void;
  setFetching: (bool: boolean) => void;
  setInitialLoad: (bool: boolean) => void;
  setAccessToken: (token: string) => void;
};

export const AccountContext = createContext<AccountContextParam>({
  account: undefined,
  fetching: true,
  initialLoad: true,
  accessToken: undefined,
  setAccount: () => {},
  setFetching: () => {},
  setAccessToken: () => {},
  setInitialLoad: () => {},
});

export const useAccountContext = () => useContext(AccountContext);
