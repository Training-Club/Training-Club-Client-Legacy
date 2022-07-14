import React from 'react';
import {Box, Heading, HStack} from 'native-base';
import {ExerciseInfo} from '../../../models/Training';

interface IExerciseSearchResultProps {
  data: ExerciseInfo;
}

const ExerciseSearchResult = ({
  data,
}: IExerciseSearchResultProps): JSX.Element => {
  return (
    <HStack w={'100%'}>
      <Box w={'50px'} h={'50px'} bgColor={'blue.500'} />
      <Heading>{data.name}</Heading>
    </HStack>
  );
};

export default React.memo(ExerciseSearchResult);
