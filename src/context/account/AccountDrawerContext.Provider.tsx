import React from 'react';
import {AccountDrawerContext} from './AccountDrawerContext';

interface IAccountDrawerContextProviderProps {
  children: any;
}

export function AccountDrawerContextProvider({
  children,
}: IAccountDrawerContextProviderProps) {
  const [isAccountDrawerOpen, setAccountDrawerOpen] =
    React.useState<boolean>(false);

  return (
    <AccountDrawerContext.Provider
      value={{isAccountDrawerOpen, setAccountDrawerOpen}}>
      {children}
    </AccountDrawerContext.Provider>
  );
}
