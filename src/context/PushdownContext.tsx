import React from 'react';

export interface IPushdownConfig {
  title?: string;
  body?: string;
  status?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
  show?: boolean;
}

interface IPushdownContext {
  pushdownConfig: IPushdownConfig;
  setPushdownConfig: (cfg: IPushdownConfig) => void;
}

export const PushdownContext = React.createContext<IPushdownContext>({
  pushdownConfig: {},
  setPushdownConfig: () => {},
});

export const usePushdownContext = () => React.useContext(PushdownContext);
