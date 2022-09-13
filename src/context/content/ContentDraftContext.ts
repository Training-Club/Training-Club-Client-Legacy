import React from 'react';
import {IContentDraft} from '../../models/Content';

export interface IContentDraftContext {
  content: IContentDraft[];
  selectedContent: IContentDraft | undefined;
  setContent: (content: IContentDraft[]) => void;
  setSelectedContent: (content: IContentDraft | undefined) => void;
  updateContent: (content: IContentDraft) => void;
  removeContent: (content: IContentDraft) => void;
}

export const ContentDraftContext = React.createContext<IContentDraftContext>({
  content: [],
  selectedContent: undefined,
  setContent: () => {},
  setSelectedContent: () => {},
  updateContent: () => {},
  removeContent: () => {},
});

export const useContentDraftContext = () =>
  React.useContext(ContentDraftContext);
