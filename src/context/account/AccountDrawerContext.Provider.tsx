import React from 'react';
import {AccountDrawerContext} from './AccountDrawerContext';

interface IAccountDrawerContextProviderProps {
  children: any;
}

export function AccountDrawerContextProvider({
  children,
}: IAccountDrawerContextProviderProps) {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  return (
    <AccountDrawerContext.Provider value={{isOpen, setOpen}}>
      {children}
    </AccountDrawerContext.Provider>
  );
}
