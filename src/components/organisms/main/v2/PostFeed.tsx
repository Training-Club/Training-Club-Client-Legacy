import React from 'react';
import {IFeedData} from '../../../../models/Content';
import {getFeedContent} from '../../../../requests/Discovery';
import {PostFeedItem} from '../../../molecules/main/v2/PostFeedItem';
import {Dimensions} from 'react-native';
import useAccountStore from '../../../../store/AccountStore';
import {Heading, ScrollView, VStack, useColorModeValue} from 'native-base';

interface IPostFeedProps {
  children: any;
}

export const PostFeed = ({children}: IPostFeedProps): JSX.Element => {
  const accessToken = useAccountStore(state => state.accessToken);
  const [content, setContent] = React.useState<IFeedData[]>([]);

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

  React.useEffect(() => {
    fetchFeedContent();
  }, [fetchFeedContent]);

  return (
    <ScrollView>
      {children}

      <Heading color={textColor} mt={4}>
        {"What's new"}
      </Heading>

      {content && (
        <VStack space={8} mt={2}>
          {content.map(entry => (
            <PostFeedItem
              key={entry.id}
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
