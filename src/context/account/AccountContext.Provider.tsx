import React, {useEffect, useState} from 'react';
import {IAccount} from '../../models/Account';
import {handleAccountLoad} from '../../data/Account';
import {AccountContext} from './AccountContext';

interface IAccountContextProviderProps {
  children: any;
}

export function AccountContextProvider({
  children,
}: IAccountContextProviderProps) {
  const [account, setAccount] = useState<IAccount | undefined>(undefined);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);

    handleAccountLoad()
      .then(result => setAccount(result))
      .catch(() => setAccount(undefined))
      .finally(() => setFetching(false));
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        fetching,
        setAccount: (acc: IAccount) => setAccount(acc),
        setFetching,
      }}>
      {children}
    </AccountContext.Provider>
  );
}
