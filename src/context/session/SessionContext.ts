import React from 'react';
import {ITrainingSessionDraft} from '../../models/Training';

export interface ISessionContext {
  draft?: ITrainingSessionDraft;
  setDraft: (d: ITrainingSessionDraft | undefined) => void;
}

export const SessionContext = React.createContext<ISessionContext>({
  draft: undefined,
  setDraft: () => {},
});

export const useSessionContext = () => React.useContext(SessionContext);
