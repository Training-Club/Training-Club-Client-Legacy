import React from 'react';
import {ExerciseInfo} from '../../../models/Training';
import ExerciseSearchResult from '../../molecules/training/ExerciseSearchResult';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import {Capitalize} from '../../../utils/StringUtil';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import {nanoid} from 'nanoid/non-secure';

import {
  DistanceMeasurement,
  MeasurementSystem,
} from '../../../models/Measurement';

import {
  Avatar,
  Box,
  Flex,
  Icon,
  ScrollView,
  useColorModeValue,
} from 'native-base';

interface IExerciseSearchResultListProps {
  data: ExerciseInfo[];
}

const ExerciseSearchResultList = ({
  data,
}: IExerciseSearchResultListProps): JSX.Element => {
  const navigation = useNavigation();
  const {addExercise} = useExerciseContext();
  const avatarColor = useColorModeValue('apple.blue.light', 'apple.red.dark');
  const textColor = useColorModeValue('black', 'white');

  const LeftContent = (exercise: ExerciseInfo): JSX.Element => {
    return (
      <Avatar size={'lg'} bgColor={avatarColor}>
        {exercise.name.charAt(0).toUpperCase()}
      </Avatar>
    );
  };

  const CreateNewContent = (): JSX.Element => {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        w={'100%'}
        h={'100%'}
        bgColor={avatarColor}
        rounded={'full'}>
        <Icon as={MaterialIcons} name={'add'} size={8} color={textColor} />
      </Flex>
    );
  };

  const handleCreateNewContent = React.useCallback(() => {
    navigation.navigate(
      'Training' as never,
      {screen: 'CreateExercise'} as never,
    );
  }, [navigation]);

  // TODO: Experimental exercise content, remove this
  const handlePress = React.useCallback(
    (exerciseInfo: ExerciseInfo) => {
      addExercise({
        addedAt: new Date(),
        exerciseName: exerciseInfo.name,
        id: nanoid(5),
        performed: false,
        type: exerciseInfo.type,
        values: {
          reps: 8,
          weight: {value: 135, measurement: MeasurementSystem.IMPERIAL},
          time: {
            value: {hours: 0, minutes: 0, seconds: 0, milliseconds: 0},
            timeRenderMillis: false,
          },
          distance: {
            value: 0,
            measurement: DistanceMeasurement.METER,
          },
        },
      });

      navigation.navigate(
        'Training' as never,
        {screen: 'CurrentSession'} as never,
      );
    },
    [addExercise, navigation],
  );

  return (
    <Box w={'100%'} py={2}>
      <ScrollView w={'100%'}>
        <ExerciseSearchResult
          title={'Create New Exercise'}
          onPress={() => handleCreateNewContent()}
          leftContent={CreateNewContent()}
        />

        {data.map((exercise, i) => {
          return (
            <ExerciseSearchResult
              key={`esr-${i}`}
              title={exercise.name}
              subtitle={
                exercise.exerciseEquipment
                  ? Capitalize(exercise.exerciseEquipment)
                  : undefined
              }
              onPress={() => handlePress(exercise)}
              leftContent={LeftContent(exercise)}
            />
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default React.memo(ExerciseSearchResultList);
