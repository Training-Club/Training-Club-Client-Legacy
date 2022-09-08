import React from 'react';
import ContentSelectList from '../../organisms/content/ContentSelectList';
import ContentSelectToolbar from '../../molecules/content/ContentSelectToolbar';
import ContentSelectCroppableView from '../../molecules/content/ContentSelectCroppableView';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {getPhotos} from '../../../utils/ContentUtil';
import {Dimensions} from 'react-native';
import {Box, View} from 'native-base';
import CloseableHeader from '../../molecules/design/CloseableHeader';

export type SelectableContent = {
  fileSize: number | null;
  fileName: string | null;
  uri: string;
  timestamp: number;

  location?: {
    longitude?: number;
    latitude?: number;
  };

  dimensions: {
    height: number;
    width: number;
  };
};

export type ContentPaginationData = {
  hasNextPage: boolean;
  startCursor?: string;
  endCursor?: string;
};

const ContentSelectScreen = (): JSX.Element => {
  const [selectableContent, setSelectableContent] = React.useState<
    SelectableContent[]
  >([]);

  const [selectedContent, setSelectedContent] = React.useState<
    SelectableContent[]
  >([]);

  const [currentPageInfo, setCurrentPageInfo] = React.useState<
    ContentPaginationData | undefined
  >(undefined);

  const [multiSelectEnabled, setMultiSelectEnabled] = React.useState(false);

  const {setPushdownConfig} = usePushdownContext();
  const {width} = Dimensions.get('screen');
  const rowCount = 3;

  /**
   * Returns true if the provided selectable is currently selected
   */
  const isSelected = React.useCallback(
    (selectable: SelectableContent) => {
      return selectedContent.find(s => s.uri === selectable.uri) !== undefined;
    },
    [selectedContent],
  );

  /**
   * Toggles the selected state for the provided selectable
   *
   * If the selectable is not selected and the selected amount exceeds 10
   * this function will trigger an error dropdown on the client
   */
  const toggleSelected = React.useCallback(
    (selectable: SelectableContent) => {
      const selected =
        selectedContent.find(s => s.uri === selectable.uri) !== undefined;

      if (selected) {
        setSelectedContent(prevState =>
          prevState.filter(s => s.uri !== selectable.uri),
        );

        return;
      }

      if (selectedContent.length >= 10) {
        setPushdownConfig({
          title: 'Max images selected.',
          body: 'You can upload up to 10 images per post. Deselect some of your existing images before selecting more.',
          status: 'error',
          duration: 5000,
          show: true,
        });

        return;
      }

      setSelectedContent(prevState => {
        const newState: SelectableContent[] = multiSelectEnabled
          ? []
          : [...prevState];

        newState.push(selectable);

        return newState;
      });
    },
    [multiSelectEnabled, selectedContent, setPushdownConfig],
  );

  /**
   * Toggles multi-select content capability
   */
  const toggleMultiSelect = React.useCallback(() => {
    setMultiSelectEnabled(!multiSelectEnabled);

    if (selectedContent.length > 1) {
      setSelectedContent(prevState => {
        const newState: SelectableContent[] = [prevState[0]];
        return newState;
      });
    }
  }, [multiSelectEnabled, selectedContent.length]);

  /**
   * Loads all photo data from the device in to memory
   */
  React.useEffect(() => {
    getPhotos()
      .then(photoData => {
        const result: SelectableContent[] = [];

        photoData.edges.map(value => {
          const node = value.node;

          const selectable: SelectableContent = {
            fileSize: node.image.fileSize,
            fileName: node.image.filename,
            uri: node.image.uri,
            timestamp: node.timestamp,
            location: {
              longitude: node.location?.longitude,
              latitude: node.location?.latitude,
            },
            dimensions: {
              height: node.image.height,
              width: node.image.width,
            },
          };

          result.push(selectable);
        });

        setSelectableContent(result);

        setCurrentPageInfo({
          hasNextPage: photoData.page_info.has_next_page,
          startCursor: photoData.page_info.start_cursor,
          endCursor: photoData.page_info.end_cursor,
        });
      })
      .catch(err => {
        setPushdownConfig({
          title: 'Failed to load image editor',
          body: 'Encountered the following error: ' + err,
          status: 'error',
          duration: 5000,
          show: true,
        });
      });
  }, [setPushdownConfig]);

  return (
    <View>
      <Box px={4}>
        <CloseableHeader
          pageTitle={'Create Post'}
          closeButton={{stackName: 'Main', screenName: 'Feed'}}
        />
      </Box>

      {selectedContent && selectedContent.length && (
        <ContentSelectCroppableView
          onCrop={data => console.log(data)}
          size={width}
          image={{
            uri: selectedContent[0].uri,
            width: selectedContent[0].dimensions.width,
            height: selectedContent[0].dimensions.height,
          }}
        />
      )}

      <ContentSelectToolbar
        isMultiselectEnabled={multiSelectEnabled}
        toggleMultiSelect={toggleMultiSelect}
      />

      <ContentSelectList
        selectableContent={selectableContent}
        isSelected={isSelected}
        toggleSelected={toggleSelected}
        width={width}
        rowCount={rowCount}
      />
    </View>
  );
};

export default ContentSelectScreen;
