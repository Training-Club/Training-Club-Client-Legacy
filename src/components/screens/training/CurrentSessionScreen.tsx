import React, {useCallback} from 'react';
import {useSessionContext} from '../../../context/session/SessionContext';
import useExerciseStore from '../../../store/ExerciseStore';
import RenameableHeader from '../../molecules/training/RenameableHeader';
import SessionButtonStack from '../../molecules/training/SessionButtonStack';
import ExerciseCardList from '../../organisms/training/ExerciseCardList';
import {GroupedExercise, IExercise} from '../../../models/Training';

import {
  getAsGroupedExercises,
  getNextIncompleteExercise,
} from '../../../data/Training';

import {Box, View} from 'native-base';

const CurrentSessionScreen = (): JSX.Element => {
  const {draft, setDraft} = useSessionContext();
  const exercises = useExerciseStore(state => state.exercises);

  const sessionName = draft?.sessionName ?? 'My Workout';
  const spacing = 4;

  const groupedExercises: GroupedExercise[] = getAsGroupedExercises(
    exercises ?? [],
  );

  const nextIncompleteExercise: IExercise | undefined =
    getNextIncompleteExercise(exercises);

  React.useEffect(() => {
    // Initializes a new training session if no existing draft is running
    if (!draft) {
      setDraft({sessionName: 'My Workout', timestamp: new Date()});
    }
  }, [draft, setDraft]);

  const handleSessionNameChange = useCallback(
    (name: string) => {
      setDraft({...draft, sessionName: name});
    },
    [draft, setDraft],
  );

  return (
    <View px={spacing} w={'100%'}>
      <Box mt={spacing}>
        <RenameableHeader
          text={sessionName}
          setText={handleSessionNameChange}
          options={{maxLength: 24}}
          closeButton={{
            stackName: 'Main',
            screenName: 'Home',
          }}
        />
      </Box>

      <ExerciseCardList groupedExercises={groupedExercises} />

      <SessionButtonStack
        hasIncompleteExercises={nextIncompleteExercise !== undefined}
      />
    </View>
  );
};

export default CurrentSessionScreen;
