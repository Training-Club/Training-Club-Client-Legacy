import React from 'react';
import {GroupedExercise} from '../../../models/Training';
import ExerciseCard from '../../molecules/training/ExerciseCard';
import {ScrollView, VStack} from 'native-base';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';

interface IExerciseCardListProps {
  groupedExercises: GroupedExercise[];
}

const ExerciseCardList = ({
  groupedExercises,
}: IExerciseCardListProps): JSX.Element => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <VStack space={8}>
        {groupedExercises.map(groupedExercise => {
          return (
            <Animated.View
              key={groupedExercise.name}
              entering={FadeIn}
              exiting={FadeOut}
              layout={Layout.springify()}>
              <ExerciseCard groupedExercise={groupedExercise} />
            </Animated.View>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

export default React.memo(ExerciseCardList);
