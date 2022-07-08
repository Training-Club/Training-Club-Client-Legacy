import React from 'react';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {SlideInUp, SlideOutUp} from 'react-native-reanimated';

import {
  Box,
  Heading,
  IconButton,
  Square,
  Text,
  useColorModeValue,
} from 'native-base';

interface IPushdownProps {
  title?: string;
  body?: string;
  status?: 'success' | 'warning' | 'info' | 'error';
  animationDuration?: number;
  onClose: () => void;
}

const Pushdown = ({
  title,
  body,
  status = 'info',
  animationDuration = 1000,
  onClose,
}: IPushdownProps): JSX.Element => {
  const successBgColor = useColorModeValue('emerald.200', 'emerald.400');
  const infoBgColor = useColorModeValue('apple.gray.50', 'apple.gray.700');
  const warningBgColor = useColorModeValue('warning.200', 'warning.400');
  const errorBgColor = useColorModeValue('error.200', 'error.400');

  const successTextColor = useColorModeValue('emerald.700', 'emerald.800');
  const infoTextColor = useColorModeValue('black', 'white');
  const warningTextColor = useColorModeValue('warning.500', 'warning.900');
  const errorTextColor = useColorModeValue('error.500', 'error.900');

  const backgroundColor = (): string => {
    switch (status) {
      case 'success':
        return successBgColor;
      case 'info':
        return infoBgColor;
      case 'warning':
        return warningBgColor;
      case 'error':
        return errorBgColor;
    }

    return infoBgColor;
  };

  const textColor = (): string => {
    switch (status) {
      case 'success':
        return successTextColor;
      case 'info':
        return infoTextColor;
      case 'warning':
        return warningTextColor;
      case 'error':
        return errorTextColor;
    }

    return infoBgColor;
  };

  return (
    <Animated.View
      entering={SlideInUp.duration(animationDuration)}
      exiting={SlideOutUp.duration(animationDuration)}
      style={{
        width: '100%',
        position: 'absolute',
        top: 48,
        zIndex: 1,
      }}>
      <Square w={'100%'}>
        <Box
          w={'100%'}
          bgColor={backgroundColor()}
          borderRadius={'12px'}
          p={3}
          shadow={'1'}>
          <Heading size={'sm'} color={textColor()}>
            {title}
          </Heading>

          <Text color={textColor()}>{body}</Text>

          <IconButton
            testID={'pushdown-close-btn'}
            position={'absolute'}
            right={1}
            top={1}
            onPress={() => onClose()}
            size={'sm'}
            variant={'solid'}
            bgColor={'rgba(0,0,0,0.0)'}
            _icon={{
              as: MaterialCommunityIcons,
              name: 'window-close',
              color: textColor(),
            }}
          />
        </Box>
      </Square>
    </Animated.View>
  );
};

export default React.memo(Pushdown);
