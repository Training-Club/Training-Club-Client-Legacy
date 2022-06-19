import React from 'react';

interface IAccountDrawerContext {
  isOpen: boolean;
  setOpen: (b: boolean) => void;
}

export const AccountDrawerContext = React.createContext<IAccountDrawerContext>({
  isOpen: false,
  setOpen: () => {},
});

export const useAccountDrawerContext = () =>
  React.useContext(AccountDrawerContext);
