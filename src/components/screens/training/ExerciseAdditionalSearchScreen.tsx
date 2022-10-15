import React, {useCallback} from 'react';
import {useExerciseContext} from '../../../context/exercise/ExerciseContext';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {useDebounce} from 'use-debounce';
import {getExerciseSearchResults} from '../../../requests/Training';
import {Capitalize, FormatExerciseInfoQuery} from '../../../utils/StringUtil';
import {getMockExerciseData} from '../../../data/Training';
import {useNavigation} from '@react-navigation/core';
import {useAccountContext} from '../../../context/account/AccountContext';
import {AxiosError} from 'axios';
import {ExerciseInfo, MuscleGroup} from '../../../models/Training';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import InputField from '../../atoms/design/InputField';
import TogglePillRow from '../../molecules/design/TogglePillRow';
import TogglePill from '../../atoms/design/TogglePill';
import ExerciseSearchResultList from '../../organisms/training/ExerciseSearchResultList';
import AdditionalExerciseSelection from '../../molecules/training/AdditionalExerciseSelection';
import {Box, Icon, View, VStack} from 'native-base';

import Animated, {
  Layout,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

interface IExerciseAdditionalSearchScreenProps {
  route: any;
}

const ExerciseAdditionalSearchScreen = ({
  route,
}: IExerciseAdditionalSearchScreenProps): JSX.Element => {
  const {accessToken} = useAccountContext();
  const {addExercise} = useExerciseContext();
  const {setPushdownConfig} = usePushdownContext();

  const navigation = useNavigation();
  const [filters, setFilters] = React.useState<MuscleGroup[]>([]);
  const [nameQuery, setNameQuery] = React.useState<string>('');
  const [nameQueryDebounced] = useDebounce(nameQuery, 500);
  const [searchResults, setSearchResults] = React.useState<ExerciseInfo[]>([]);
  const [selectedExercises, setSelectedExercises] = React.useState<
    ExerciseInfo[]
  >([]);

  const spacing = 4;

  /**
   * Returns true if the provided muscle group is currently selected
   */
  const isSelectedFilter = useCallback(
    (muscleGroup: MuscleGroup) => {
      return (
        filters.find(e => e.toString() === muscleGroup.toString()) !== undefined
      );
    },
    [filters],
  );

  /**
   * Returns true if the provided exercise info is currently selected
   */
  const isSelectedExercise = useCallback(
    (exerciseInfo: ExerciseInfo) => {
      return (
        selectedExercises.find(e => e.id === exerciseInfo.id) !== undefined
      );
    },
    [selectedExercises],
  );

  /**
   * Toggles selected value for the provided muscle group
   */
  const handleToggleFilter = useCallback(
    (muscleGroup: MuscleGroup) => {
      if (isSelectedFilter(muscleGroup)) {
        requestAnimationFrame(() => {
          setFilters(filters.filter(e => e.toString() !== muscleGroup));
        });

        return;
      }

      requestAnimationFrame(() => {
        setFilters([...filters, muscleGroup]);
      });
    },
    [filters, isSelectedFilter],
  );

  const handleExerciseToggle = useCallback(
    (exerciseInfo: ExerciseInfo) => {
      if (isSelectedExercise(exerciseInfo)) {
        setSelectedExercises(
          selectedExercises.filter(e => e.id !== exerciseInfo.id),
        );

        return;
      }

      requestAnimationFrame(() => {
        setSelectedExercises([...selectedExercises, exerciseInfo]);
      });
    },
    [isSelectedExercise, selectedExercises],
  );

  /**
   * Adds all exercises to the current session
   *
   * TODO: Remove getMockExerciseData call
   */
  const handleAddExercises = useCallback(() => {
    addExercise(getMockExerciseData(selectedExercises));

    navigation.navigate(
      'Training' as never,
      {screen: 'CurrentSession'} as never,
    );
  }, [addExercise, navigation, selectedExercises]);

  /**
   * Performs an Exercise Info lookup on
   * each debounce update and sets state accordingly
   */
  React.useEffect(() => {
    if (!nameQueryDebounced || nameQueryDebounced.length <= 0) {
      return;
    }

    const queryString = FormatExerciseInfoQuery(nameQueryDebounced, filters);

    if (!queryString) {
      return;
    }

    getExerciseSearchResults(queryString, accessToken)
      .then(result => {
        setSearchResults(result);
      })
      .catch(err => {
        const axiosError = err as AxiosError;

        if (axiosError.code === '404') {
          return;
        }

        if (axiosError.response && axiosError.response?.status === 404) {
          return;
        }

        setPushdownConfig({
          title: 'Something went wrong.',
          body: 'We encountered an error while trying to perform your search request.',
          status: 'error',
          duration: 5000,
          show: true,
        });
      });
  }, [accessToken, filters, nameQueryDebounced, setPushdownConfig]);

  return (
    <View>
      <VStack px={spacing} space={spacing}>
        <CloseableHeader
          pageTitle={`Create ${Capitalize(route.params.variant)}`}
          closeButton={{
            stackName: 'Training',
            screenName: 'CurrentSession',
          }}
        />

        <InputField
          value={nameQuery}
          setValue={setNameQuery}
          options={{
            placeholder: 'Search',
            autoCapitalize: 'words',
            inputLeftElement: (
              <Icon
                as={MaterialIcons}
                name={'search'}
                size={6}
                ml={2}
                mt={0.5}
              />
            ),
          }}
        />
      </VStack>

      <Box mt={2}>
        <TogglePillRow>
          {Object.keys(MuscleGroup).map((muscleGroup, i) => {
            return (
              <TogglePill
                key={`tp-${i}`}
                selected={isSelectedFilter(muscleGroup as MuscleGroup)}
                onToggle={() => handleToggleFilter(muscleGroup as MuscleGroup)}>
                {Capitalize(muscleGroup.replace('_', ' '))}
              </TogglePill>
            );
          })}
        </TogglePillRow>
      </Box>

      <Box mt={1} px={spacing}>
        <ExerciseSearchResultList
          data={searchResults}
          onPress={handleExerciseToggle}
        />
      </Box>

      {selectedExercises && selectedExercises.length > 0 && (
        <Animated.View
          entering={SlideInDown.springify().mass(0.1)}
          exiting={SlideOutDown.duration(500)}
          layout={Layout.springify()}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }}>
          <AdditionalExerciseSelection
            data={selectedExercises}
            onToggle={handleExerciseToggle}
            onComplete={handleAddExercises}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default ExerciseAdditionalSearchScreen;
