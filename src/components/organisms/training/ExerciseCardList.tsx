import React from 'react';
import {GroupedExercise} from '../../../models/Training';
import ExerciseCard from '../../molecules/training/ExerciseCard';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import {ScrollView} from 'native-base';

interface IExerciseCardListProps {
  groupedExercises: GroupedExercise[];
}

const ExerciseCardList = ({
  groupedExercises,
}: IExerciseCardListProps): JSX.Element => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {groupedExercises.map((groupedExercise, i) => {
        return (
          <Animated.View
            entering={FadeIn.delay(100 * i)}
            exiting={FadeOut}
            layout={Layout.springify().delay(100)}>
            <ExerciseCard
              key={groupedExercise.name}
              groupedExercise={groupedExercise}
              style={{
                topSpacing: i > 0,
                bottomSpacing: i === groupedExercises.length - 1,
              }}
            />
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

// TODO: Original flatlist implementation, remove this if we do not have performance hitches
/* const ExerciseCardList = ({
  groupedExercises,
}: IExerciseCardListProps): JSX.Element => {
  const renderItem = (result: {item: GroupedExercise; index: number}) => {
    return (
      <ExerciseCard
        groupedExercise={result.item}
        style={{
          topSpacing: result.index > 0,
          bottomSpacing: result.index === groupedExercises.length - 1,
        }}
      />
    );
  };

  return (
    <Animated.FlatList
      data={groupedExercises}
      renderItem={renderItem}
      initialNumToRender={2}
      showsVerticalScrollIndicator={false}
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout.springify()}
    />
  );
}; */

export default React.memo(ExerciseCardList);
