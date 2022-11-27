import {IContentDraft} from '../models/Content';
import create from 'zustand';

interface ContentDraftStore {
  content: IContentDraft[];
  selectedContent?: IContentDraft;
  setContent: (content?: IContentDraft[]) => void;
  setSelectedContent: (content?: IContentDraft) => void;
  updateContent: (content: IContentDraft) => void;
  removeContent: (content: IContentDraft) => void;
}

const useContentDraftStore = create<ContentDraftStore>()(set => ({
  content: [],
  selectedContent: undefined,
  setContent: c => set(() => ({content: c})),
  setSelectedContent: c => set(() => ({selectedContent: c})),
  updateContent: c =>
    set(state => ({content: handleUpdateContent(c, state.content)})),
  removeContent: c =>
    set(state => ({content: handleRemoveContent(c, state.content)})),
}));

/**
 * Handles updating a content draft item within the existing state
 *
 * @param updated ContentDraftItem to update
 * @param prevState Previous State
 */
const handleUpdateContent = (
  updated: IContentDraft,
  prevState: IContentDraft[],
) => {
  const copy = prevState.filter(e => e.original.uri !== updated.original.uri);
  copy.push(updated);
  return copy;
};

/**
 * Handles removing a content draft item from the existing state
 *
 * @param removed Removed ContentDraftItem
 * @param prevState Previous State
 */
const handleRemoveContent = (
  removed: IContentDraft,
  prevState: IContentDraft[],
) => {
  return prevState.filter(e => e.original.uri !== removed.original.uri);
};

export default useContentDraftStore;
