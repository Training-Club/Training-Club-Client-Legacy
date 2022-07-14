import React, {useCallback} from 'react';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import TogglePillRow from '../../molecules/design/TogglePillRow';
import TogglePill from '../../atoms/design/TogglePill';
import {MuscleGroup} from '../../../models/Training';
import {Capitalize} from '../../../utils/StringUtil';
import InputField from '../../atoms/design/InputField';
import {useDebounce} from 'use-debounce';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {Box, Icon, View, VStack} from 'native-base';

const ExerciseSearchScreen = (): JSX.Element => {
  const [filters, setFilters] = React.useState<MuscleGroup[]>([]);
  const [nameQuery, setNameQuery] = React.useState<string>('');
  const [nameQueryDebounced] = useDebounce(nameQuery, 500);

  const spacing = 4;

  console.log(filters);

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

  React.useEffect(() => {
    console.log(nameQueryDebounced);
  }, [nameQueryDebounced]);

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
    </View>
  );
};

export default ExerciseSearchScreen;
