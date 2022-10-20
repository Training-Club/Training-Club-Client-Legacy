import React from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {Button, useColorModeValue} from 'native-base';

interface ITogglePillProps {
  children: any;
  selected: boolean;
  onToggle?: () => void;
  style?: {
    bgColor?: {
      primary?: ColorType | string;
      pressed?: ColorType | string;
      selected?: ColorType | string;
    };

    textColor?: {
      primary?: ColorType | string;
      selected?: ColorType | string;
    };
  };
}

const TogglePill = ({
  children,
  selected,
  style,
  onToggle,
}: ITogglePillProps): JSX.Element => {
  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

  const defaultTextColorSelected = 'white';

  const defaultBgColorPrimary = useColorModeValue(
    'core.backgroundAccent.light',
    'core.backgroundAccent.dark',
  );

  const defaultBgColorPressed = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  const defaultBgColorSelected = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  const getTextColor = () => {
    if (selected) {
      return style?.textColor?.selected ?? defaultTextColorSelected;
    }

    return style?.textColor?.primary ?? defaultTextColor;
  };

  const getBackgroundColor = () => {
    if (selected) {
      return style?.bgColor?.selected ?? defaultBgColorSelected;
    }

    return style?.bgColor?.primary ?? defaultBgColorPrimary;
  };

  return (
    <Button
      bgColor={getBackgroundColor()}
      rounded={'full'}
      size={'sm'}
      minW={'96px'}
      px={4}
      py={2}
      _text={{color: getTextColor()}}
      _pressed={style?.bgColor?.pressed ?? defaultBgColorPressed}
      onPress={onToggle}>
      {children}
    </Button>
  );
};

export default React.memo(TogglePill);
