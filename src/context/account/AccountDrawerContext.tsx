import React from 'react';

interface IAccountDrawerContext {
  isAccountDrawerOpen: boolean;
  setAccountDrawerOpen: (b: boolean) => void;
}

export const AccountDrawerContext = React.createContext<IAccountDrawerContext>({
  isAccountDrawerOpen: false,
  setAccountDrawerOpen: () => {},
});

export const useAccountDrawerContext = () =>
  React.useContext(AccountDrawerContext);
