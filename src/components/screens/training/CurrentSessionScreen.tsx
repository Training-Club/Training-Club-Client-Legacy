import React, {useCallback} from 'react';
import {useSessionContext} from '../../../context/session/SessionContext';
import RenameableHeader from '../../molecules/training/RenameableHeader';
import SessionButtonStack from '../../molecules/training/SessionButtonStack';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import {
  ExerciseType,
  GroupedExercise,
  IExercise,
} from '../../../models/Training';

import {
  getAsGroupedExercises,
  getNextIncompleteExercise,
} from '../../../data/Training';

import {
  ExerciseInputType,
  ParentTrainingInput,
} from '../../atoms/training/TrainingInput';

import {
  DistanceMeasurement,
  MeasurementSystem,
} from '../../../models/Measurement';

import {Box, HStack, Square, View} from 'native-base';

const CurrentSessionScreen = (): JSX.Element => {
  const {draft, setDraft} = useSessionContext();
  const {exercises} = useExerciseContext();

  const sessionName = draft?.sessionName ?? 'My Workout';
  const spacing = 4;

  const groupedExercises: GroupedExercise[] = getAsGroupedExercises(exercises);
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

      <HStack w={'100%'} p={4} space={2}>
        <Square w={'30%'} />

        <ParentTrainingInput
          exercise={{
            id: '0',
            exerciseName: 'Benchpress',
            type: ExerciseType.WEIGHTED_REPS,
            addedAt: new Date(),
            values: {
              weight: {value: 135, measurement: MeasurementSystem.IMPERIAL},
            },
            performed: false,
          }}
          exerciseType={ExerciseType.WEIGHTED_REPS}
          fieldName={'weight'}
          fieldType={ExerciseInputType.WEIGHT}
          performed={false}
        />

        <ParentTrainingInput
          exercise={{
            id: '0',
            exerciseName: 'Run',
            type: ExerciseType.TIME,
            addedAt: new Date(),
            values: {
              time: {
                value: {hours: 0, minutes: 3, seconds: 30, milliseconds: 203},
                timeRenderMillis: true,
              },
            },
            performed: false,
          }}
          exerciseType={ExerciseType.TIME}
          fieldName={'time'}
          fieldType={ExerciseInputType.TIME}
          performed={false}
        />

        <Square w={'10%'} />
      </HStack>

      <SessionButtonStack
        hasIncompleteExercises={nextIncompleteExercise !== undefined}
      />
    </View>
  );
};

export default CurrentSessionScreen;
