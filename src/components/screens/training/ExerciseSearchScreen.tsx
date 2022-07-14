import React, {useCallback} from 'react';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import TogglePillRow from '../../molecules/design/TogglePillRow';
import TogglePill from '../../atoms/design/TogglePill';
import {ExerciseInfo, MuscleGroup} from '../../../models/Training';
import {Capitalize} from '../../../utils/StringUtil';
import {getExerciseSearchResults} from '../../../requests/Training';
import InputField from '../../atoms/design/InputField';
import {useDebounce} from 'use-debounce';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import ExerciseSearchResultList from '../../organisms/training/ExerciseSearchResultList';
import {Box, Icon, View, VStack} from 'native-base';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {AxiosError} from 'axios';

const ExerciseSearchScreen = (): JSX.Element => {
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
   * Performs an Exercise Info lookup on
   * each debounce update and sets state accordingly
   */
  React.useEffect(() => {
    if (!nameQueryDebounced || nameQueryDebounced.length <= 0) {
      return;
    }

    getExerciseSearchResults(nameQueryDebounced)
      .then(result => {
        setSearchResults(result);
      })
      .catch(err => {
        const axiosError = err as AxiosError;

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
  }, [nameQueryDebounced, setPushdownConfig]);

  return (
    <View>
      <VStack px={spacing} space={spacing}>
        <CloseableHeader
          pageTitle={'Add an Exercise'}
          closeButton={{
            stackName: 'Training',
            screenName: 'CurrentSession',
          }}
        />

        <InputField
          value={nameQuery}
          setValue={setNameQuery}
          options={{
            placeholder: 'Examples: Benchpress, Back Squat, Overhead Press...',
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

      <Box mt={1}>
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

      <Box mt={1}>
        <ExerciseSearchResultList data={searchResults} />
      </Box>
    </View>
  );
};

export default ExerciseSearchScreen;
