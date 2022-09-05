import React from 'react';
import data from '../../../../buildtools/version-info.json';
import {Text, HStack, useColorModeValue} from 'native-base';

export const AccountDrawerVersionInfo = (): JSX.Element => {
  const textColor = useColorModeValue('apple.gray.300', 'apple.gray.600');

  return (
    <HStack justifyContent={'center'} mt={1} space={4}>
      <Text color={textColor} fontSize={'2xs'}>
        Client Version: {data.appVersion}
      </Text>

      <Text color={textColor} fontSize={'2xs'}>
        Client Hash: {data.hash}
      </Text>
    </HStack>
  );
};
