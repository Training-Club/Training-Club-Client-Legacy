import React from 'react';
import {ContentDraftContext} from './ContentDraftContext';
import {IContentDraft} from '../../models/Content';

interface IContentDraftContextProviderProps {
  children: any;
}

export function ContentDraftContextProvider({
  children,
}: IContentDraftContextProviderProps) {
  const [selectedContent, setSelectedContent] = React.useState<
    IContentDraft | undefined
  >(undefined);

  const [content, setContent] = React.useState<IContentDraft[]>([]);

  /**
   * Removes a single item from the content draft array
   */
  const removeContent = React.useCallback((item: IContentDraft) => {
    requestAnimationFrame(() => {
      setContent(prevState => {
        return prevState.filter(e => e.original.uri !== item.original.uri);
      });
    });
  }, []);

  /**
   * Updates the content array with the provided content draft item
   */
  const updateContent = React.useCallback((item: IContentDraft) => {
    requestAnimationFrame(() => {
      setContent(prevState => {
        const copy = prevState.filter(
          e => e.original.uri !== item.original.uri,
        );

        copy.push(item);

        return copy;
      });
    });
  }, []);

  return (
    <ContentDraftContext.Provider
      value={{
        content,
        selectedContent: selectedContent,
        setContent: (e: IContentDraft[]) => setContent(e),
        setSelectedContent: (e: IContentDraft | undefined) =>
          setSelectedContent(e),
        updateContent: (e: IContentDraft) => updateContent(e),
        removeContent: (e: IContentDraft) => removeContent(e),
      }}>
      {children}
    </ContentDraftContext.Provider>
  );
}
