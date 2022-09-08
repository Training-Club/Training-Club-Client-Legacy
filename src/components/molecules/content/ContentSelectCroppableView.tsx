import React from 'react';
import Animated, {withSpring} from 'react-native-reanimated';
import {Image, View} from 'native-base';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export interface CroppedContentData {
  croppedUri: string;
  originalUri: string;
}

type CropContext = {
  startX: number;
  startY: number;
  startScale: number;
};

interface IContentSelectCroppableViewProps {
  size: number;

  image: {
    uri: string;
    width: number;
    height: number;
  };

  onCrop: (data: CroppedContentData) => void;
}

const ContentSelectCroppableViewProps = ({
  size,
  image,
  onCrop,
}: IContentSelectCroppableViewProps): JSX.Element => {
  // const bgColor = useColorModeValue('apple.gray.100', 'apple.gray.900');

  const viewRatio = 1;
  const imageRatio = image.height / image.width;
  const imageWidth = imageRatio > viewRatio ? size : size / imageRatio;
  const imageHeight = imageRatio > viewRatio ? size * imageRatio : size;

  const translateX = useSharedValue(
    imageRatio > viewRatio ? 0 : (size - imageWidth) / 2,
  );

  const translateY = useSharedValue(
    imageRatio > viewRatio ? (size - imageHeight) / 2 : 0,
  );

  const scale = useSharedValue(1);

  const handleOnEnd = React.useCallback(() => {
    if (!size) {
      return;
    }

    const clampedScale =
      scale.value > 2.5 ? 2.5 : scale.value < 1 ? 1 : scale.value;

    const scaleWidth = (size * clampedScale - size) / (2 * clampedScale);
    const scaleHeight = (size * clampedScale - size) / (2 * clampedScale);
    let offsetX = translateX.value;
    let offsetY = translateY.value;

    if (translateX.value < -(imageWidth - size + scaleWidth)) {
      translateX.value = withSpring(-(imageWidth - size + scaleWidth));
      offsetX = -(imageWidth - size + scaleWidth);
    }

    if (translateX.value > scaleWidth) {
      translateX.value = withSpring(scaleWidth);
      offsetX = scaleWidth;
    }

    if (translateY.value < -(imageHeight - size + scaleHeight)) {
      translateY.value = withSpring(-(imageHeight - size + scaleHeight));
      offsetY = -(imageHeight - size + scaleHeight);
    }

    if (translateY.value > scaleHeight) {
      translateY.value = withSpring(scaleHeight);
      offsetY = scaleHeight;
    }

    if (scale.value > 2.5) {
      scale.value = withSpring(2.5);
    }

    if (scale.value < 1) {
      scale.value = withSpring(1);
    }

    let x2 = 0;
    let y2 = 0;

    if (image.width / size < image.height / size) {
      x2 = image.width / clampedScale;
      y2 = x2 * viewRatio;
    } else {
      y2 = image.height / clampedScale;
      x2 = y2 / viewRatio;
    }

    offsetX -= scaleWidth;
    offsetY -= scaleHeight;

    offsetX = (-offsetX / size) * x2 * clampedScale;
    offsetY = (-offsetY / size) * y2 * clampedScale;

    console.log(offsetX + ' ' + offsetY);
  }, [
    image.height,
    image.width,
    imageHeight,
    imageWidth,
    scale,
    size,
    translateX,
    translateY,
  ]);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    CropContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },

    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },

    onEnd: () => {
      runOnJS(handleOnEnd)();
    },
  });

  const pinchGestureHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    CropContext
  >({
    onStart: (_, ctx) => {
      ctx.startScale = scale.value;
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },

    onActive: (event, ctx) => {
      scale.value = ctx.startScale & event.scale;
    },

    onEnd: () => {
      runOnJS(handleOnEnd)();
    },
  });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const pinchStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <View overflow={'hidden'} width={size} height={size}>
      <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
        <Animated.View style={[{width: size, height: size}, pinchStyle]}>
          <Animated.View style={[{width: size, height: size}]}>
            <PanGestureHandler
              maxPointers={1}
              onGestureEvent={panGestureHandler}>
              <Animated.View style={[{width: size, height: size}]}>
                <Animated.View
                  style={[{width: imageWidth, height: imageHeight}, panStyle]}>
                  <Image
                    source={{uri: image.uri}}
                    style={{width: imageWidth, height: imageHeight}}
                  />
                </Animated.View>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

export default ContentSelectCroppableViewProps;
