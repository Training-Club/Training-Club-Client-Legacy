import React from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SelectableContent} from '../../screens/content/ContentSelectScreen';
import ContentPressable from '../../atoms/content/ContentPressable';
import {HStack} from 'native-base';

interface IContentSelectListProps {
  selectableContent: SelectableContent[];
  isSelected: (s: SelectableContent) => boolean;
  toggleSelected: (s: SelectableContent) => void;
  width: number;
  rowCount: number;
}

const ContentSelectList = ({
  selectableContent,
  isSelected,
  toggleSelected,
  width,
  rowCount,
}: IContentSelectListProps): JSX.Element => {
  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // TODO: Implement pagination
      // console.log(event.nativeEvent.contentOffset.y);
    },
    [],
  );

  const renderItem = (result: {item: SelectableContent}) => {
    return (
      <ContentPressable
        isSelected={isSelected(result.item)}
        onSelect={() => toggleSelected(result.item)}
        image={{
          uri: result.item.uri,
          filename: result.item.fileName ?? '',
        }}
        style={{
          width: width / rowCount,
          height: width / rowCount,
        }}
      />
    );
  };

  return (
    <HStack w={'100%'}>
      <FlatList
        data={selectableContent}
        renderItem={renderItem}
        numColumns={rowCount}
        onMomentumScrollEnd={e => handleScroll(e)}
      />
    </HStack>
  );
};

export default ContentSelectList;
