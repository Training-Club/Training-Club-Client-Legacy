import React, {useCallback} from 'react';
import {Capitalize, FormatExerciseInfoQuery} from '../../../utils/StringUtil';
import {getExerciseSearchResults} from '../../../requests/Training';
import {useDebounce} from 'use-debounce';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {useNavigation} from '@react-navigation/core';
import {getMockExerciseData} from '../../../data/Training';
import {AxiosError} from 'axios';
import {ExerciseInfo, MuscleGroup} from '../../../models/Training';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import TogglePillRow from '../../molecules/design/TogglePillRow';
import TogglePill from '../../atoms/design/TogglePill';
import InputField from '../../atoms/design/InputField';
import ExerciseSearchResultList from '../../organisms/training/ExerciseSearchResultList';
import useExerciseStore from '../../../store/ExerciseStore';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {Box, Icon, View, VStack} from 'native-base';
import useAccountStore from '../../../store/AccountStore';

const ExerciseSearchScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const accessToken = useAccountStore(state => state.accessToken);
  const addSet = useExerciseStore(state => state.addSet);
  const {setPushdownConfig} = usePushdownContext();
  const [filters, setFilters] = React.useState<MuscleGroup[]>([]);
  const [nameQuery, setNameQuery] = React.useState<string>('');
  const [nameQueryDebounced] = useDebounce(nameQuery, 500);
  const [searchResults, setSearchResults] = React.useState<ExerciseInfo[]>([]);

  const spacing = 4;

  /**
   * Returns true if the provided muscle group is currently selected
   */
  const isSelected = useCallback(
    (muscleGroup: MuscleGroup) => {
      return (
        filters.find(e => e.toString() === muscleGroup.toString()) !== undefined
      );
    },
    [filters],
  );

  /**
   * Toggles selected value for the provided muscle group
   */
  const toggleFilter = useCallback(
    (muscleGroup: MuscleGroup) => {
      if (isSelected(muscleGroup)) {
        requestAnimationFrame(() => {
          setFilters(filters.filter(e => e.toString() !== muscleGroup));
        });

        return;
      }

      requestAnimationFrame(() => {
        setFilters([...filters, muscleGroup]);
      });
    },
    [filters, isSelected],
  );

  /**
   * Handles the exercise selection and navigation back to the current session screen
   */
  const handleExerciseSelect = useCallback(
    (exerciseInfo: ExerciseInfo) => {
      addSet(getMockExerciseData([exerciseInfo]));

      navigation.navigate(
        'Training' as never,
        {screen: 'CurrentSession'} as never,
      );
    },
    [addSet, navigation],
  );

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
          pageTitle={'Add Exercise'}
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
                selected={isSelected(muscleGroup as MuscleGroup)}
                onToggle={() => toggleFilter(muscleGroup as MuscleGroup)}>
                {Capitalize(muscleGroup.replace('_', ' '))}
              </TogglePill>
            );
          })}
        </TogglePillRow>
      </Box>

      <Box mt={1} px={spacing}>
        <ExerciseSearchResultList
          data={searchResults}
          onPress={e => handleExerciseSelect(e)}
          options={{showCreateExercise: true}}
        />
      </Box>
    </View>
  );
};

export default ExerciseSearchScreen;
