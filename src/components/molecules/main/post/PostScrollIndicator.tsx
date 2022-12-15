import React from 'react';
import {PostScrollIndicatorItem} from '../../../atoms/main/home/post/PostScrollIndicatorItem';
import {HStack, Square} from 'native-base';

interface IPostScrollIndicatorProps {
  index: number;
  size: number;
}

export const PostScrollIndicator = ({
  index,
  size,
}: IPostScrollIndicatorProps): JSX.Element => {
  return (
    <Square
      testID={'post-scroll-indicator'}
      zIndex={1}
      position={'absolute'}
      bottom={2}
      w={'100%'}
      h={'24px'}>
      <HStack>
        {[...Array(size)].map((a, currentPos) => (
          <PostScrollIndicatorItem
            key={currentPos}
            isSelected={currentPos === index}
          />
        ))}
      </HStack>
    </Square>
  );
};
