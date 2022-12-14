import React from 'react';
import {ILocation} from '../../../../../../models/Location';
import {FormatElapsedTime} from '../../../../../../utils/StringUtil';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from 'native-base';

interface IExpandedPostHeaderProps {
  title?: string;
  date?: Date;
  location?: ILocation;
}

export const ExpandedPostHeader = ({
  title,
  date,
  location,
}: IExpandedPostHeaderProps): JSX.Element => {
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');
  const linkColor = useColorModeValue('apple.blue.light', 'apple.blue.dark');
  const mutedTextColor = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  const getFormattedDate = React.useCallback(() => {
    if (!date) {
      return undefined;
    }

    return FormatElapsedTime(new Date().getTime() - new Date(date).getTime());
  }, [date]);

  return (
    <VStack>
      {title && <Heading color={textColor}>{title}</Heading>}
      {(date || location) && (
        <HStack space={2}>
          {date && <Text color={mutedTextColor}>{getFormattedDate()} ago</Text>}
          {date && location && (
            <Icon
              as={MaterialIcons}
              name={'circle'}
              size={1}
              color={mutedTextColor}
              mt={2.5}
            />
          )}

          {location && (
            <HStack space={1}>
              <Icon
                as={MaterialIcons}
                name={'location-on'}
                size={3}
                color={mutedTextColor}
                mt={1}
              />

              <Text color={linkColor} fontWeight={'semibold'}>
                {location.name}
              </Text>
            </HStack>
          )}
        </HStack>
      )}
    </VStack>
  );
};
