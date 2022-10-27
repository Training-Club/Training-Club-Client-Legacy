import React from 'react';
import {IContentItem} from '../../../../models/Content';
import {PostContentWrapper} from '../../../atoms/main/home/post/PostContentWrapper';
import {Box, HStack, ScrollView} from 'native-base';

interface IPostCarouselProps {
  content: IContentItem[];
  contentWidth: number;
  onIndexChange: (index: number) => void;
}

export const PostCarousel = ({
  content,
  contentWidth,
  onIndexChange,
}: IPostCarouselProps): JSX.Element => {
  const spacing = 2;
  const adjustedWidth = contentWidth - spacing * 4;
  const adjustedSpacing = contentWidth - adjustedWidth;
  const halfAdjustedSpacing = adjustedSpacing / 2;

  /**
   * Returns the current index position in the scrollview
   */
  const getCurrentPage = React.useCallback(
    (x: number) => {
      for (let i = 0; i < content.length; i++) {
        const calculatedSize = adjustedWidth * i;

        if (x <= calculatedSize) {
          return i;
        }
      }

      return content.length;
    },
    [adjustedWidth, content.length],
  );

  return (
    <Box w={'100%'} h={'100%'} testID={'post-carousel'}>
      <ScrollView
        w={'100%'}
        horizontal={true}
        pagingEnabled={true}
        snapToInterval={adjustedWidth}
        snapToAlignment={'center'}
        decelerationRate={0}
        flex={1}
        directionalLockEnabled={true}
        disableIntervalMomentum={true}
        scrollToOverflowEnabled={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={100}
        overScrollMode={'never'}
        contentInset={{left: halfAdjustedSpacing, right: halfAdjustedSpacing}}
        contentOffset={{x: adjustedWidth + spacing * 2, y: 0}}
        onScroll={e =>
          onIndexChange(getCurrentPage(e.nativeEvent.contentOffset.x))
        }>
        <HStack space={spacing} h={'100%'} ml={spacing}>
          {content.map((contentItem, index) => (
            <PostContentWrapper
              key={contentItem.destination + index}
              content={contentItem}
              contentWidth={adjustedWidth - content.length * spacing + 0.1}
            />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};
