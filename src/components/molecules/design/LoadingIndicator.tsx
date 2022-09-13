import React from 'react';
import {ColorValue, Dimensions} from 'react-native';
import {Spinner, Square, Text, View, useColorModeValue} from 'native-base';

interface ILoadingIndicatorProps {
  loadingText?: string;
  contentColor?: ColorValue;
  backgroundColor?: ColorValue;
  dimBackground?: boolean;
}

const LoadingIndicator = ({
  loadingText = 'Loading',
  contentColor,
  backgroundColor,
  dimBackground = true,
}: ILoadingIndicatorProps): JSX.Element => {
  const {width} = Dimensions.get('screen');
  const defaultContentColor = useColorModeValue('white', 'black');

  const defaultBackgroundColor = useColorModeValue(
    'apple.gray.900',
    'apple.gray.50',
  );

  const dimBackgroundColor = useColorModeValue(
    'rgba(255, 255, 255, 0.75)',
    'rgba(0, 0, 0, 0.75)',
  );

  return (
    <View
      w={'100%'}
      h={'100%'}
      position={'absolute'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      zIndex={10}
      bgColor={dimBackground ? dimBackgroundColor : 'rgba(0,0,0,0.0)'}>
      <Square
        w={width * 0.5}
        h={width * 0.5}
        p={2}
        bgColor={backgroundColor ?? defaultBackgroundColor}
        opacity={0.85}
        borderRadius={'12px'}>
        <Spinner size={'lg'} color={contentColor ?? defaultContentColor} />

        <Text
          fontSize={'sm'}
          fontWeight={'bold'}
          textAlign={'center'}
          color={contentColor ?? defaultContentColor}
          mt={4}>
          {loadingText}
        </Text>
      </Square>
    </View>
  );
};

export default LoadingIndicator;
