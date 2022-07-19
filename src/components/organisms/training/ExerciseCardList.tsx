import React from 'react';
import {GroupedExercise} from '../../../models/Training';
import ExerciseCard from '../../molecules/training/ExerciseCard';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';

interface IExerciseCardListProps {
  groupedExercises: GroupedExercise[];
}

const ExerciseCardList = ({
  groupedExercises,
}: IExerciseCardListProps): JSX.Element => {
  const renderItem = (result: {item: GroupedExercise; index: number}) => {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={Layout.springify()}>
        <ExerciseCard
          groupedExercise={result.item}
          style={{
            topSpacing: result.index > 0,
            bottomSpacing: result.index === groupedExercises.length - 1,
          }}
        />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      data={groupedExercises}
      renderItem={renderItem}
      initialNumToRender={2}
      showsVerticalScrollIndicator={false}
      layout={Layout.springify()}
    />
  );
};

export default React.memo(ExerciseCardList);
