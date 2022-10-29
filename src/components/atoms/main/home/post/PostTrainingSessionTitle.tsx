import React from 'react';
import {FormatElapsedTime} from '../../../../../utils/StringUtil';
import {ILocation} from '../../../../../models/Location';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {Box, Heading, HStack, Icon, Text, useColorModeValue} from 'native-base';

interface IPostTrainingSessionTitle {
  sessionName?: string;
  location?: ILocation;
  date?: Date;
}

export const PostTrainingSessionTitle = ({
  sessionName,
  location,
  date,
}: IPostTrainingSessionTitle): JSX.Element => {
  const elapsedTime = date ? new Date().getTime() - date.getTime() : 0;
  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  return (
    <Box w={'100%'}>
      <Heading>{sessionName ?? 'My Workout'}</Heading>

      <HStack space={3} mb={2} alignItems={'center'}>
        {location && (
          <HStack space={1} alignItems={'center'}>
            <Icon
              as={MaterialIcons}
              name={'location-on'}
              size={3}
              color={textColor}
            />

            <Text color={textColor} fontSize={'10px'} fontWeight={'semibold'}>
              {location.name}
            </Text>
          </HStack>
        )}

        <Icon as={MaterialIcons} name={'circle'} size={1} color={textColor} />

        {date && (
          <Text color={textColor} fontSize={'xs'}>
            {FormatElapsedTime(elapsedTime) + ' ago'}
          </Text>
        )}
      </HStack>
    </Box>
  );
};
