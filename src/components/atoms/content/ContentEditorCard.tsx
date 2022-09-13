import React from 'react';
import {IContentDraft} from '../../../models/Content';
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
        <Image
          w={'100%'}
          h={'100%'}
          src={draftItem.draft.uri}
          alt={'draft image'}
          resizeMode={'cover'}
        />
      </Box>
    </Pressable>
  );
};

export default ContentEditorCard;
