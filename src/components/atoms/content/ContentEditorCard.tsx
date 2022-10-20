import React from 'react';
import {IContentDraft} from '../../../models/Content';
import Video from 'react-native-video';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import ImagePicker, {CropRect} from 'react-native-image-crop-picker';
import {
  Box,
  IconButton,
  Image,
  Pressable,
  useColorModeValue,
} from 'native-base';

interface IContentEditorCardProps {
  draftItem: IContentDraft;
  onSelect: () => void;

  onCrop: (
    draftItem: IContentDraft,
    cropUri: string,
    cropRect: CropRect | null | undefined,
  ) => void;

  style?: {
    width?: number;
    height?: number;
  };
}

const ContentEditorCard = ({
  draftItem,
  onSelect,
  onCrop,
  style,
}: IContentEditorCardProps): JSX.Element => {
  const width = style?.width ?? 300;
  const height = style?.height ?? 300;

  const iconBgColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const pressedIconBgColor = useColorModeValue(
    'core.backgroundAccent.light',
    'core.backgroundAccent.dark',
  );

  const iconColor = useColorModeValue('core.text.light', 'core.text.dark');

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
        compressImageQuality: 1,
      });

      onCrop(draftItem, data.path, data.cropRect);
    } catch (err) {}
  }, [draftItem, onCrop]);

  return (
    <Pressable onPress={onSelect}>
      <Box w={width} h={height} shadow={4}>
        {draftItem.contentType === 'image' && (
          <Box w={'100%'} h={'100%'}>
            <IconButton
              onPress={() => handleOpenContentCropper()}
              zIndex={12}
              position={'absolute'}
              right={2}
              bottom={2}
              size={'sm'}
              rounded={'full'}
              bg={iconBgColor}
              _pressed={{
                bg: pressedIconBgColor,
              }}
              _icon={{
                as: MaterialIcons,
                name: 'crop',
                color: iconColor,
              }}
            />

            <Image
              w={'100%'}
              h={'100%'}
              src={draftItem.draft.uri}
              alt={'draft image'}
              resizeMode={'cover'}
            />
          </Box>
        )}

        {draftItem.contentType === 'video' && (
          <Video
            source={{uri: draftItem.draft.uri}}
            muted={true}
            resizeMode={'cover'}
            repeat={true}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </Box>
    </Pressable>
  );
};

export default ContentEditorCard;
