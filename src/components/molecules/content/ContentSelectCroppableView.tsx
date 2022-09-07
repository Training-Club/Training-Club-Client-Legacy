import React from 'react';
import {Box, useColorModeValue} from 'native-base';

interface IContentSelectCroppableViewProps {
  width: number;
}

const ContentSelectCroppableViewProps = ({
  width,
}: IContentSelectCroppableViewProps): JSX.Element => {
  const bgColor = useColorModeValue('apple.gray.100', 'apple.gray.900');

  return <Box w={width} height={width} mt={2} bgColor={bgColor} />;
};

export default ContentSelectCroppableViewProps;
