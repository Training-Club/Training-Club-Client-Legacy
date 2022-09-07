import React from 'react';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Box, Icon, Image, Pressable, useColorModeValue} from 'native-base';

interface IContentPressableProps {
  isSelected: boolean;
  onSelect: () => void;

  image: {
    uri: string;
    filename: string;
  };

  style: {
    width: number;
    height: number;
  };
}

const ContentPressable = ({
  isSelected,
  onSelect,
  image,
  style,
}: IContentPressableProps): JSX.Element => {
  const selectedIconColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  return (
    <Box w={style.width} h={style.height}>
      {isSelected && (
        <Animated.View
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(100)}
          style={{position: 'absolute', top: 4, right: 4, zIndex: 1}}>
          <Box bgColor={'white'} borderRadius={'full'} pointerEvents={'none'}>
            <Icon
              as={MaterialCommunityIcons}
              name={'check-circle'}
              size={6}
              color={selectedIconColor}
            />
          </Box>
        </Animated.View>
      )}

      <Pressable onPress={() => onSelect()}>
        <Image src={image.uri} alt={image.filename} w={'100%'} h={'100%'} />
      </Pressable>
    </Box>
  );
};

export default React.memo(ContentPressable);
