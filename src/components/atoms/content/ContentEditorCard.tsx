import React from 'react';
import {IContentDraft} from '../../../models/Content';
import Video from 'react-native-video';
import {Box, Image, Pressable} from 'native-base';

interface IContentEditorCardProps {
  draftItem: IContentDraft;
  onPress: () => void;
  style?: {
    width?: number;
    height?: number;
  };
}

const ContentEditorCard = ({
  draftItem,
  onPress,
  style,
}: IContentEditorCardProps): JSX.Element => {
  const width = style?.width ?? 300;
  const height = style?.height ?? 300;

  return (
    <Pressable onPress={onPress}>
      <Box w={width} h={height} shadow={4}>
        {draftItem.contentType === 'image' && (
          <Image
            w={'100%'}
            h={'100%'}
            src={draftItem.draft.uri}
            alt={'draft image'}
            resizeMode={'cover'}
          />
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
