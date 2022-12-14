import React from 'react';
import {Box, Heading, useColorModeValue} from 'native-base';

interface IActionsheetHeadingProps {
  children: string;
}

export const ActionsheetHeading = ({
  children,
}: IActionsheetHeadingProps): JSX.Element => {
  const color = useColorModeValue(
    'core.textMuted.light',
    'core.textMuted.dark',
  );

  return (
    <Box w={'100%'} mb={2}>
      <Heading size={'xs'} color={color}>
        {children}
      </Heading>
    </Box>
  );
};
