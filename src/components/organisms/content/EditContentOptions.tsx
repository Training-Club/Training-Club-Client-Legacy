import React from 'react';
import {IContentDraft} from '../../../models/Content';
import ImagePicker, {CropRect} from 'react-native-image-crop-picker';
import {Box, HStack, Pressable, Text} from 'native-base';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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

  const textTransition = useSharedValue(
    draftItem?.contentType === 'image' ? 1 : 0,
  );

  const startTransition = React.useCallback(() => {
    if (draftItem.contentType === 'image') {
      textTransition.value = withTiming(0, {duration: 250});
      return;
    }

    textTransition.value = withTiming(1, {duration: 250});
  }, [draftItem.contentType, textTransition]);

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(textTransition.value, [0, 1], [1.0, 0.5]);

    return {
      opacity,
    };
  });

  /**
   * Opens the image cropper for the currently selected content
   *
   * TODO: Add support for videos here
   */
  const handleOpenContentCropper = React.useCallback(async () => {
    if (draftItem.contentType === 'video') {
      return;
    }

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

  React.useEffect(() => {
    startTransition();
  }, [startTransition]);

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
          <Animated.View style={[textStyle]}>
            <Text fontSize={'md'}>Crop</Text>
          </Animated.View>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default EditContentOptions;
