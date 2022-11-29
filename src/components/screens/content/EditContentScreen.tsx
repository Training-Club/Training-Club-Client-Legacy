import React from 'react';
import {IContentDraft} from '../../../models/Content';
import {CropRect} from 'react-native-image-crop-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ContentEditorCard from '../../atoms/content/ContentEditorCard';
import {NavigationHeader} from '../../molecules/design/NavigationHeader';
import useContentDraftStore from '../../../store/ContentDraftStore';
import {HStack, ScrollView} from 'native-base';

const EditContentScreen = (): JSX.Element => {
  const content = useContentDraftStore(state => state.content);
  const selectedContent = useContentDraftStore(state => state.selectedContent);
  const updateContent = useContentDraftStore(state => state.updateContent);
  const setSelectedContent = useContentDraftStore(
    state => state.setSelectedContent,
  );

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  /**
   * Handles toggling the selected content value
   *
   * If the provided content draft is already selected
   * this function will break out
   */
  const handleSelectingContent = React.useCallback(
    (e: IContentDraft) => {
      if (selectedContent && selectedContent.original.uri === e.original.uri) {
        return;
      }

      setSelectedContent(e);
    },
    [selectedContent, setSelectedContent],
  );

  /**
   * Handles setting cropped data for draft content
   */
  const handleCroppingContent = React.useCallback(
    (
      draft: IContentDraft,
      croppedUri: string,
      cropRect: CropRect | null | undefined,
    ) => {
      draft.draft.uri = croppedUri;
      draft.draft.cropRect = cropRect;

      updateContent(draft);
    },
    [updateContent],
  );

  /**
   * Returns the content array sorted in its original added order
   */
  const getContentSorted = React.useCallback(() => {
    return content.sort((a, b) => a.sortOrder - b.sortOrder);
  }, [content]);

  return (
    <NavigationHeader
      title={'Edit'}
      actionButton={{
        text: 'Details',
        navigationProps: {stackName: 'Content', screenName: 'ContentDetails'},
      }}
      backButton={{
        text: 'Select',
        navigationProps: {stackName: 'Content', screenName: 'ContentSelect'},
      }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <HStack w={'100%'} px={4} space={2}>
          {getContentSorted().map(draft => {
            return (
              <ContentEditorCard
                draftItem={draft}
                key={draft.original.uri}
                onCrop={handleCroppingContent}
                onSelect={() => handleSelectingContent(draft)}
              />
            );
          })}
        </HStack>
      </ScrollView>
    </NavigationHeader>
  );
};

export default EditContentScreen;
