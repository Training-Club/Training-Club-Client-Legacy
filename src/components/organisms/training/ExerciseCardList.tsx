import React from 'react';
import {GroupedExercise} from '../../../models/Training';
import ExerciseCard from '../../molecules/training/ExerciseCard';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SequencedTransition,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

interface IExerciseCardListProps {
  groupedExercises: GroupedExercise[];
}

const ExerciseCardList = ({
  groupedExercises,
}: IExerciseCardListProps): JSX.Element => {
  const renderItem = (result: {item: GroupedExercise; index: number}) => {
    return (
      <Animated.View
        key={result.item.name}
        entering={SlideInRight}
        exiting={SlideOutRight}
        layout={SequencedTransition}>
        <ExerciseCard key={`${result.item.name}-${result.index}`} groupedExercise={result.item} />
      </Animated.View>
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
