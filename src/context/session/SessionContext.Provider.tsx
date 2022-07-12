import React from 'react';
import {SessionContext} from './SessionContext';
import {ITrainingSessionDraft} from '../../models/Training';

interface ISessionContextProviderProps {
  children: any;
}

export function SessionContextProvider({
  children,
}: ISessionContextProviderProps) {
  const [draft, setDraft] = React.useState<ITrainingSessionDraft | undefined>(
    undefined,
  );

  return (
    <SessionContext.Provider
      value={{
        draft,
        setDraft: (d: ITrainingSessionDraft | undefined) => setDraft(d),
      }}>
      {children}
    </SessionContext.Provider>
  );
}
