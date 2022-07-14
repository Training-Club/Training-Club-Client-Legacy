import React from 'react';
import {ExerciseInfo} from '../../../models/Training';
import ExerciseSearchResult from '../../molecules/training/ExerciseSearchResult';
import {Box, ScrollView} from 'native-base';

interface IExerciseSearchResultListProps {
  data: ExerciseInfo[];
}

const ExerciseSearchResultList = ({
  data,
}: IExerciseSearchResultListProps): JSX.Element => {
  return (
    <Box w={'100%'} bgColor={'red.500'}>
      <ScrollView w={'100%'}>
        {data.map((exercise, i) => {
          return <ExerciseSearchResult key={`esr-${i}`} data={exercise} />;
        })}
      </ScrollView>
    </Box>
  );
};

export default React.memo(ExerciseSearchResultList);
