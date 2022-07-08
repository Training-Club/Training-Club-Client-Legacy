import {createContext, useContext} from 'react';
import {IAccount} from '../../models/Account';

export type AccountContextParam = {
  account?: IAccount;
  fetching?: boolean;
  setAccount: (account: IAccount) => void;
  setFetching: (bool: boolean) => void;
};

export const AccountContext = createContext<AccountContextParam>({
  account: undefined,
  fetching: true,
  setAccount: () => {},
  setFetching: () => {},
});

export const useAccountContext = () => useContext(AccountContext);
