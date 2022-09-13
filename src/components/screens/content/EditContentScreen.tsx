import React from 'react';
import {IContentDraft} from '../../../models/Content';
import {CropRect} from 'react-native-image-crop-picker';
import {useContentDraftContext} from '../../../context/content/ContentDraftContext';
import ContentEditorCard from '../../atoms/content/ContentEditorCard';
import EditContentOptions from '../../organisms/content/EditContentOptions';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import {Box, HStack, ScrollView, View} from 'native-base';

const EditContentScreen = (): JSX.Element => {
  const {content, selectedContent, setSelectedContent, updateContent} =
    useContentDraftContext();

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
    <View>
      <Box px={4}>
        <CloseableHeader
          pageTitle={'Edit Post'}
          closeButton={{stackName: 'Content', screenName: 'ContentSelect'}}
        />
      </Box>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        mt={4}>
        <HStack w={'100%'} px={4} space={2}>
          {getContentSorted().map(draft => {
            return (
              <ContentEditorCard
                draftItem={draft}
                key={draft.original.uri}
                onPress={() => handleSelectingContent(draft)}
              />
            );
          })}
        </HStack>
      </ScrollView>

      <EditContentOptions
        draftItem={selectedContent ?? content[0]}
        onCrop={handleCroppingContent}
      />
    </View>
  );
};

export default EditContentScreen;
