import React from 'react';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import InputField from '../../atoms/design/InputField';
import CreateExerciseEquipment from '../../organisms/training/CreateExerciseEquipment';
import CreateExerciseType from '../../organisms/training/CreateExerciseType';
import CreateExerciseMuscleGroup from '../../organisms/training/CreateExerciseMuscleGroup';
import useExerciseStore from '../../../store/ExerciseStore';
import useAccountStore from '../../../store/AccountStore';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {createExerciseInfo} from '../../../requests/ExerciseInfo';
import {useNavigation} from '@react-navigation/core';
import {nanoid} from 'nanoid/non-secure';
import {MeasurementSystem} from '../../../models/Measurement';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  ExerciseEquipment,
  ExerciseType,
  MuscleGroup,
} from '../../../models/Training';

import {Box, Button, ScrollView, View, useColorModeValue} from 'native-base';

const CreateExerciseScreen = (): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const accessToken = useAccountStore(state => state.accessToken);
  const addSet = useExerciseStore(state => state.addSet);
  const {setPushdownConfig} = usePushdownContext();

  const [exerciseName, setExerciseName] = React.useState<string>('');

  const [exerciseType, setExerciseType] = React.useState<ExerciseType>(
    ExerciseType.WEIGHTED_REPS,
  );

  const [muscleGroups, setMuscleGroups] = React.useState<MuscleGroup[]>([]);

  const [exerciseEquipment, setExerciseEquipment] = React.useState<
    ExerciseEquipment | undefined
  >(undefined);

  const textColor = useColorModeValue('black', 'white');
  const contentBgColor = useColorModeValue('apple.gray.50', 'apple.gray.900');
  const contentBorderColor = useColorModeValue('apple.gray.100', 'black');

  const spacing = 4;

  const pillTextStyling = {
    fontWeight: 'semibold',
    color: textColor,
  };

  const handleToggleExerciseType = React.useCallback((type: ExerciseType) => {
    requestAnimationFrame(() => {
      setExerciseType(type);
    });
  }, []);

  const handleToggleExerciseEquipment = React.useCallback(
    (equipment: ExerciseEquipment) => {
      requestAnimationFrame(() => {
        setExerciseEquipment(equipment);
      });
    },
    [],
  );

  const handleToggleMuscleGroup = React.useCallback(
    (group: MuscleGroup) => {
      const isSelected = muscleGroups.find(mgs => mgs === group) !== undefined;

      requestAnimationFrame(() => {
        if (isSelected) {
          setMuscleGroups(muscleGroups.filter(mgs => mgs !== group));
          return;
        }

        if (muscleGroups.length >= 3) {
          setPushdownConfig({
            title: 'Max muscle groups',
            body: 'You have too many muscle groups selected. Remove some of your current selections to make changes.',
            status: 'error',
            duration: 5000,
            show: true,
          });

          return;
        }

        setMuscleGroups([group, ...muscleGroups]);
      });
    },
    [muscleGroups, setPushdownConfig],
  );

  const handleCreateExercise = React.useCallback(() => {
    createExerciseInfo({
      exerciseName: exerciseName,
      exerciseType: exerciseType,
      exerciseMuscleGroups: muscleGroups,
      exerciseEquipment: exerciseEquipment,
      token: accessToken,
    })
      .then(() => {
        addSet({
          id: nanoid(5),
          exerciseName: exerciseName,
          addedAt: new Date(),
          performed: false,
          type: exerciseType,
          values: {
            reps: 5,
            weight: {
              value: 135,
              plateCounterEnabled: true,
              measurement: MeasurementSystem.IMPERIAL,
            },
          },
        });

        navigation.navigate('TrainingCurrentSession');

        setPushdownConfig({
          title: 'Exercise Created',
          body: `${exerciseName} has been added to your current training session`,
          status: 'success',
          duration: 3000,
          show: true,
        });
      })
      .catch(() => {
        setPushdownConfig({
          title: 'Something went wrong.',
          body: 'We encountered an error while trying to create your exercise. Please wait a moment and try again.',
          status: 'error',
          duration: 5000,
          show: true,
        });
      });
  }, [
    accessToken,
    addSet,
    exerciseEquipment,
    exerciseName,
    exerciseType,
    muscleGroups,
    navigation,
    setPushdownConfig,
  ]);

  return (
    <View px={spacing}>
      <CloseableHeader
        pageTitle={'Create Exercise'}
        closeButton={{screenName: 'TrainingExerciseSearch'}}
      />

      <Box w={'100%'} mt={2} pb={4}>
        <InputField
          value={exerciseName}
          setValue={setExerciseName}
          options={{placeholder: 'Name'}}
        />
      </Box>

      <ScrollView mb={24} showsVerticalScrollIndicator={false}>
        <CreateExerciseType
          selected={exerciseType}
          setSelectedExerciseType={handleToggleExerciseType}
          styling={{
            textStyling: pillTextStyling,
            pillStyling: {
              backgroundColor: contentBgColor,
              borderColor: contentBorderColor,
              textColor: textColor,
            },
          }}
        />

        <CreateExerciseMuscleGroup
          selected={muscleGroups}
          toggleMuscleGroup={handleToggleMuscleGroup}
          styling={{
            textStyling: pillTextStyling,
            pillStyling: {
              backgroundColor: contentBgColor,
              borderColor: contentBorderColor,
              textColor: textColor,
            },
          }}
        />

        <CreateExerciseEquipment
          selected={exerciseEquipment}
          setSelectedEquipment={handleToggleExerciseEquipment}
          styling={{
            textStyling: pillTextStyling,
            pillStyling: {
              backgroundColor: contentBgColor,
              borderColor: contentBorderColor,
              textColor: textColor,
            },
          }}
        />
      </ScrollView>

      <Box position={'absolute'} bottom={8} left={4} w={'100%'}>
        <Button
          size={'lg'}
          variant={'info'}
          _text={{
            color: 'white',
          }}
          onPressIn={() => handleCreateExercise()}>
          Create
        </Button>
      </Box>
    </View>
  );
};

export default CreateExerciseScreen;
