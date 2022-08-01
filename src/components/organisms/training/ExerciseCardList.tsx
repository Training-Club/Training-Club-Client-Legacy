import React from 'react';
import {GroupedExercise} from '../../../models/Training';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import ExerciseCard from '../../molecules/training/ExerciseCard';

interface IExerciseCardListProps {
  groupedExercises: GroupedExercise[];
}

const ExerciseCardList = ({
  groupedExercises,
}: IExerciseCardListProps): JSX.Element => {
  const renderItem = (result: {item: GroupedExercise; index: number}) => {
    return (
      <ExerciseCard key={result.item.name} groupedExercise={result.item} />
    );
  };

  return (
    <Animated.FlatList
      keyExtractor={item => item.name}
      data={groupedExercises}
      renderItem={renderItem}
      initialNumToRender={2}
      showsVerticalScrollIndicator={false}
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout.springify()}
      style={{marginBottom: 64}}
    />
  );
};

export default React.memo(ExerciseCardList);
