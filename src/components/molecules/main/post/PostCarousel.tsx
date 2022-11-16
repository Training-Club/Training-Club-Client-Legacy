import React from 'react';
import {IContentItem} from '../../../../models/Content';
import {ITrainingSession} from '../../../../models/Training';
import {ILocation} from '../../../../models/Location';
import {PostContentWrapper} from '../../../atoms/main/home/post/PostContentWrapper';
import {PostTrainingSessionCard} from './PostTrainingSessionCard';
import {Box, HStack, ScrollView} from 'native-base';

interface IPostCarouselProps {
  scrollEnabled?: boolean;
  content: IContentItem[];

  currentPosition: {
    post: number;
    index: number;
  };

  position: {
    post: number;
    index: number;
  };

  trainingSession?: ITrainingSession;
  location?: ILocation;
  contentWidth: number;
  onIndexChange: (index: number) => void;
}

export const PostCarousel = ({
  scrollEnabled,
  content,
  currentPosition,
  position,
  trainingSession,
  location,
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
      const contentLength = trainingSession
        ? content.length + 1
        : content.length;

      for (let i = 0; i < contentLength; i++) {
        const calculatedSize = adjustedWidth * i;

        if (x <= calculatedSize) {
          return i;
        }
      }

      return contentLength;
    },
    [adjustedWidth, content.length, trainingSession],
  );

  return (
    <Box w={'100%'} h={'100%'} testID={'post-carousel'}>
      <ScrollView
        scrollEnabled={currentPosition.post === position.post && scrollEnabled}
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
          {content.map((contentItem, i) => (
            <PostContentWrapper
              paused={!scrollEnabled}
              currentPosition={currentPosition}
              position={position}
              key={contentItem.destination + i}
              content={contentItem}
              contentWidth={adjustedWidth - content.length * spacing + 0.1}
            />
          ))}

          {trainingSession && (
            <PostTrainingSessionCard
              trainingSession={trainingSession}
              location={location}
              contentWidth={adjustedWidth - content.length * spacing + 0.1}
            />
          )}
        </HStack>
      </ScrollView>
    </Box>
  );
};
