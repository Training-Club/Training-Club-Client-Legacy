import React from 'react';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {ExerciseType, GroupedExercise} from '../../../models/Training';
import PressablePill from '../../atoms/design/PressablePill';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {getAdditionalExerciseNames} from '../../../data/Training';
import {Capitalize} from '../../../utils/StringUtil';
import TrainingExerciseOptionsMenuItem from '../../atoms/training/TrainingExerciseOptionsMenuItem';
import {ScrollView} from 'react-native-gesture-handler';

import {
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';

import {
  DistanceMeasurement,
  getDistanceMeasurement,
  MeasurementSystem,
} from '../../../models/Measurement';

interface IExerciseOptionsActionsheetProps {
  groupedExercise: GroupedExercise;
  onDuplicateSet: () => void;
  onRemoveExercise: () => void;
  onUpdateDistance?: (measurement: DistanceMeasurement) => void;
  onUpdateMeasurement?: (measurement: MeasurementSystem) => void;
  onMillisecondToggle?: () => void;
}

enum ExerciseOptionsActionsheetPage {
  EDIT,
  STATS,
  INFO,
}

const ExerciseOptionsActionsheet = ({
  groupedExercise,
  onDuplicateSet,
  onRemoveExercise,
  onUpdateDistance,
  onUpdateMeasurement,
  onMillisecondToggle,
}: IExerciseOptionsActionsheetProps): JSX.Element => {
  const [page, setPage] = React.useState<ExerciseOptionsActionsheetPage>(
    ExerciseOptionsActionsheetPage.EDIT,
  );

  const exercise = React.useMemo(() => {
    return groupedExercise.exercises[0];
  }, [groupedExercise]);

  const additionalExerciseName = React.useMemo(() => {
    const additionalNames = getAdditionalExerciseNames(exercise);

    if (additionalNames && additionalNames.length > 0) {
      return additionalNames.join(', ');
    }

    return undefined;
  }, [exercise]);

  const textColor = useColorModeValue('black', 'white');
  const dangerTextColor = useColorModeValue(
    'apple.red.light',
    'apple.red.dark',
  );

  const iconSpacing = 3;

  return (
    <BottomSheetView>
      <Box px={4}>
        <ScrollView
          style={{marginBottom: 32}}
          showsVerticalScrollIndicator={false}>
          <Box mb={3} maxW={'100%'} flexWrap={'wrap'}>
            <Heading color={textColor} size={'xl'}>
              {`Edit ${groupedExercise.name}`}
            </Heading>

            {additionalExerciseName &&
              additionalExerciseName.length > 0 &&
              exercise.additionalExercises && (
                <Heading
                  size={'sm'}
                  fontWeight={'semibold'}
                  color={
                    textColor
                  }>{`with ${additionalExerciseName} ${Capitalize(
                  exercise.additionalExercises[0].variant,
                )}`}</Heading>
              )}
          </Box>

          <HStack mb={4}>
            <TrainingExerciseOptionsMenuItem
              isSelected={page === ExerciseOptionsActionsheetPage.EDIT}
              onSelect={() => setPage(ExerciseOptionsActionsheetPage.EDIT)}
              text={'Edit'}
            />

            <TrainingExerciseOptionsMenuItem
              isSelected={page === ExerciseOptionsActionsheetPage.STATS}
              onSelect={() => setPage(ExerciseOptionsActionsheetPage.STATS)}
              text={'Stats'}
            />

            <TrainingExerciseOptionsMenuItem
              isSelected={page === ExerciseOptionsActionsheetPage.INFO}
              onSelect={() => setPage(ExerciseOptionsActionsheetPage.INFO)}
              text={'Info'}
            />
          </HStack>

          <VStack>
            <Heading color={textColor} size={'sm'} mb={3}>
              General Settings
            </Heading>

            <PressablePill onPress={onDuplicateSet} style={{roundedTop: true}}>
              <HStack space={iconSpacing}>
                <Icon
                  as={MaterialIcons}
                  name={'add'}
                  size={5}
                  color={textColor}
                />

                <Text fontWeight={'semibold'}>Duplicate Set</Text>
              </HStack>
            </PressablePill>

            <PressablePill
              onPress={onRemoveExercise}
              style={{roundedBottom: true}}>
              <HStack space={iconSpacing}>
                <Icon
                  as={MaterialIcons}
                  name={'delete'}
                  size={5}
                  color={dangerTextColor}
                />

                <Text fontWeight={'semibold'} color={dangerTextColor}>
                  Remove Exercise
                </Text>
              </HStack>
            </PressablePill>
          </VStack>

          {onUpdateDistance &&
            (exercise.type === ExerciseType.DISTANCE ||
              exercise.type === ExerciseType.DISTANCE_TIME) && (
              <VStack mt={8}>
                <Heading color={textColor} size={'sm'} mb={3}>
                  Distance Settings
                </Heading>

                {Object.keys(DistanceMeasurement).map((measurement, i) => {
                  return (
                    <PressablePill
                      key={measurement}
                      onPress={() =>
                        onUpdateDistance(
                          getDistanceMeasurement(measurement) ??
                            DistanceMeasurement.METER,
                        )
                      }
                      style={{
                        roundedTop: i === 0,
                        roundedBottom:
                          i === Object.keys(DistanceMeasurement).length - 1,
                      }}>
                      <HStack justifyContent={'space-between'}>
                        <Text color={textColor} fontWeight={'semibold'}>
                          {Capitalize(measurement)}
                        </Text>

                        {exercise.values.distance?.measurement ===
                          getDistanceMeasurement(measurement) && (
                          <Icon as={MaterialIcons} name={'check'} size={5} />
                        )}
                      </HStack>
                    </PressablePill>
                  );
                })}
              </VStack>
            )}

          {onMillisecondToggle &&
            (exercise.type === ExerciseType.WEIGHTED_TIME ||
              exercise.type === ExerciseType.DISTANCE_TIME ||
              exercise.type === ExerciseType.TIME) && (
              <VStack mt={8}>
                <Heading color={textColor} size={'sm'} mb={3}>
                  Time Settings
                </Heading>

                <PressablePill
                  onPress={onMillisecondToggle}
                  style={{roundedTop: true, roundedBottom: true}}>
                  <HStack space={iconSpacing}>
                    <Icon
                      as={MaterialIcons}
                      name={'timer'}
                      size={5}
                      color={textColor}
                    />

                    <Text fontWeight={'semibold'}>{`Toggle ${
                      exercise.values.time?.timeRenderMillis
                        ? 'Hours'
                        : 'Milliseconds'
                    }`}</Text>
                  </HStack>
                </PressablePill>
              </VStack>
            )}

          {onUpdateMeasurement &&
            (exercise.type === ExerciseType.WEIGHTED_TIME ||
              exercise.type === ExerciseType.WEIGHTED_REPS) && (
              <VStack mt={8}>
                <Heading color={textColor} size={'sm'} mb={3}>
                  Weight Measurement Settings
                </Heading>

                <PressablePill
                  onPress={() =>
                    onUpdateMeasurement(MeasurementSystem.IMPERIAL)
                  }
                  style={{roundedTop: true}}>
                  <HStack space={iconSpacing}>
                    <Text color={textColor} fontWeight={'semibold'}>
                      Imperial (lbs)
                    </Text>

                    {exercise.values.weight?.measurement ===
                      MeasurementSystem.IMPERIAL && (
                      <Icon as={MaterialIcons} name={'check'} size={5} />
                    )}
                  </HStack>
                </PressablePill>

                <PressablePill
                  onPress={() => onUpdateMeasurement(MeasurementSystem.METRIC)}
                  style={{roundedBottom: true}}>
                  <HStack space={iconSpacing}>
                    <Text color={textColor} fontWeight={'semibold'}>
                      Metric (kgs)
                    </Text>

                    {exercise.values.weight?.measurement ===
                      MeasurementSystem.METRIC && (
                      <Icon as={MaterialIcons} name={'check'} size={5} />
                    )}
                  </HStack>
                </PressablePill>
              </VStack>
            )}
        </ScrollView>
      </Box>
    </BottomSheetView>
  );
};

export default ExerciseOptionsActionsheet;
