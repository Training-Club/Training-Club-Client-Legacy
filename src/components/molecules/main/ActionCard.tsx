import React from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {Dimensions} from 'react-native';
import {Box, Heading, Pressable, Text, useColorModeValue} from 'native-base';

export type ActionCardTextContent = {
  heading: string;
  subheading?: string;
  primaryColor?: ColorType | string;
  mutedColor?: ColorType | string;
};

export type ActionCardBorderProps = {
  enabled?: boolean;
  color?: ColorType | string;
};

interface IActionCardProps {
  onPress?: () => void;
  bottomTextContent?: ActionCardTextContent;
  borderStyle?: ActionCardBorderProps;
  backgroundContent?: JSX.Element;
}

export const ActionCard = ({
  onPress,
  bottomTextContent,
  borderStyle = {enabled: true},
  backgroundContent,
}: IActionCardProps) => {
  const {width} = Dimensions.get('screen');
  const cardWidth = width * 0.33;
  const cardHeight = cardWidth * 1.33;

  const defaultTextColor = useColorModeValue(
    'core.text.light',
    'core.text.dark',
  );

  const defaultMutedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const defaultBorderColor = useColorModeValue(
    'apple.gray.200',
    'apple.gray.800',
  );

  return (
    <Pressable onPress={onPress}>
      <Box
        position={'relative'}
        w={cardWidth}
        h={cardHeight}
        borderRadius={12}
        borderWidth={borderStyle?.enabled ? 1 : 0}
        borderColor={borderStyle?.color ?? defaultBorderColor}>
        {bottomTextContent && (
          <Box zIndex={1} position={'absolute'} bottom={1} left={1}>
            <Heading
              size={'xs'}
              color={bottomTextContent.primaryColor ?? defaultTextColor}>
              {bottomTextContent.heading}
            </Heading>

            {bottomTextContent.subheading && (
              <Text
                fontSize={'xs'}
                color={bottomTextContent.mutedColor ?? defaultMutedTextColor}>
                {bottomTextContent.subheading}
              </Text>
            )}
          </Box>
        )}

        {backgroundContent}
      </Box>
    </Pressable>
  );
};
