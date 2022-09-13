import React from 'react';
import {IContentDraft} from '../../../models/Content';
import ImagePicker, {CropRect} from 'react-native-image-crop-picker';
import {Box, HStack, Pressable, Text} from 'native-base';

interface IEditContentOptionsProps {
  draftItem: IContentDraft;
  onCrop: (
    draftItem: IContentDraft,
    cropUri: string,
    cropRect: CropRect | null | undefined,
  ) => void;
}

enum EditMode {
  FILTER,
  EDIT,
}

const EditContentOptions = ({
  draftItem,
  onCrop,
}: IEditContentOptionsProps): JSX.Element => {
  const [editMode, setEditMode] = React.useState<EditMode>(EditMode.FILTER);

  /**
   * Opens the image cropper for the currently selected content
   *
   * TODO: Add support for videos here
   */
  const handleOpenContentCropper = React.useCallback(async () => {
    try {
      const data = await ImagePicker.openCropper({
        mediaType: 'photo',
        path: draftItem.original.uri,
        cropping: true,
        width: draftItem.draft.cropRect?.width,
        height: draftItem.draft.cropRect?.height,
      });

      onCrop(draftItem, data.path, data.cropRect);
    } catch (err) {}
  }, [draftItem, onCrop]);

  return (
    <Box position={'absolute'} left={0} bottom={0} w={'100%'} mb={12}>
      <HStack justifyContent={'space-evenly'}>
        <Pressable onPress={() => setEditMode(EditMode.FILTER)} py={1} px={4}>
          <Text
            fontSize={'md'}
            fontWeight={editMode === EditMode.FILTER ? 'bold' : 'normal'}>
            Filter
          </Text>
        </Pressable>

        <Pressable onPress={() => setEditMode(EditMode.EDIT)} py={1} px={4}>
          <Text
            fontSize={'md'}
            fontWeight={editMode === EditMode.EDIT ? 'bold' : 'normal'}>
            Edit
          </Text>
        </Pressable>

        <Pressable onPress={() => handleOpenContentCropper()} py={1} px={4}>
          <Text
            fontSize={'md'}
            fontWeight={editMode === EditMode.EDIT ? 'bold' : 'normal'}>
            Crop
          </Text>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default EditContentOptions;
