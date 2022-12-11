import React from 'react';
import {IFeedData} from '../../../../models/Content';
import {getFeedContent} from '../../../../requests/Discovery';
import PostFeedItem from '../../../molecules/main/v2/PostFeedItem';
import useAccountStore from '../../../../store/AccountStore';
import {Dimensions} from 'react-native';
import {Heading, ScrollView, VStack, useColorModeValue, Box} from 'native-base';

interface IPostFeedProps {
  children: any;
}

export const PostFeed = ({children}: IPostFeedProps): JSX.Element => {
  const accessToken = useAccountStore(state => state.accessToken);
  const [content, setContent] = React.useState<IFeedData[]>([]);
  const [contentIndex, setContentIndex] = React.useState(0);

  const contentOffset = React.useRef<number>(0);
  const CARD_WIDTH = Dimensions.get('screen').width;
  const CARD_HEIGHT = CARD_WIDTH * 1.33;

  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  /**
   * Queries new feed content and sets the content state
   */
  const fetchFeedContent = React.useCallback(() => {
    getFeedContent(0, accessToken)
      .then(response => {
        // TODO: append, not overwrite
        setContent(response);
      })
      .catch(err => {
        console.error(err);
      });
  }, [accessToken]);

  const updateActiveContentPosition = React.useCallback(
    (scrollPos: number) => {
      const div = scrollPos / CARD_HEIGHT;
      const currentPosAdjusted = scrollPos - contentOffset.current;
      const cutOffHeight = CARD_HEIGHT + div * 8;
      const index = Math.ceil(currentPosAdjusted / cutOffHeight) - 1;

      if (contentIndex !== index) {
        if (index <= 0) {
          setContentIndex(0);
          return;
        }

        setContentIndex(index);
      }
    },
    [CARD_HEIGHT, contentIndex],
  );

  React.useEffect(() => {
    fetchFeedContent();
  }, [fetchFeedContent]);

  return (
    <ScrollView
      scrollEventThrottle={250}
      onScroll={e =>
        updateActiveContentPosition(e.nativeEvent.contentOffset.y)
      }>
      <Box
        onLayout={e => (contentOffset.current = e.nativeEvent.layout.height)}
        w={'100%'}>
        {children}
      </Box>

      <Heading color={textColor} mt={4}>
        {"What's new"}
      </Heading>

      {content && (
        <VStack space={8} mt={2}>
          {content.map((entry, index) => (
            <PostFeedItem
              key={entry.id}
              suspended={index !== contentIndex}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              data={entry}
            />
          ))}
        </VStack>
      )}
    </ScrollView>
  );
};
