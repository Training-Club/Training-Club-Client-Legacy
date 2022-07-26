import React from 'react';
import {ExerciseInfo} from '../../../models/Training';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import Animated, {
  FadeOutDown,
  LightSpeedInRight,
} from 'react-native-reanimated';

import {
  Box,
  Button,
  HStack,
  IconButton,
  Pressable,
  ScrollView,
  Square,
  Text,
  useColorModeValue,
} from 'native-base';

interface IAdditionalExerciseSelectionProps {
  data: ExerciseInfo[];
  onToggle: (exerciseInfo: ExerciseInfo) => void;
  onComplete: () => void;
}

const AdditionalExerciseSelection = ({
  data,
  onToggle,
  onComplete,
}: IAdditionalExerciseSelectionProps): JSX.Element => {
  const bgColor = useColorModeValue('apple.gray.50', 'apple.gray.900');
  const pillBgColor = useColorModeValue('apple.gray.100', 'apple.gray.800');
  const removeButtonColor = useColorModeValue(
    'apple.red.light',
    'apple.red.dark',
  );

  return (
    <Box
      position={'absolute'}
      bottom={0}
      left={0}
      pb={24}
      px={4}
      bgColor={bgColor}
      w={'100%'}>
      <HStack
        position={'absolute'}
        top={4}
        left={4}
        w={'100%'}
        justifyContent={'center'}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pt={3}
          mr={2}>
          <HStack space={2} mr={3}>
            {data.map(exerciseInfo => {
              return (
                <Animated.View
                  entering={LightSpeedInRight}
                  exiting={FadeOutDown}>
                  <Pressable key={exerciseInfo.id}>
                    <Box>
                      <IconButton
                        position={'absolute'}
                        size={6}
                        top={-10}
                        right={-10}
                        zIndex={3}
                        bgColor={removeButtonColor}
                        rounded={'full'}
                        _icon={{
                          as: MaterialIcons,
                          name: 'close',
                          size: 4,
                          color: 'white',
                        }}
                        onPress={() => onToggle(exerciseInfo)}
                      />

                      <Square
                        bgColor={pillBgColor}
                        py={3}
                        px={2}
                        rounded={'12px'}
                        minW={20}>
                        <Text fontSize={'10px'} fontWeight={'semibold'}>
                          {exerciseInfo.name}
                        </Text>
                      </Square>
                    </Box>
                  </Pressable>
                </Animated.View>
              );
            })}
          </HStack>
        </ScrollView>

        <Button
          variant={'info'}
          h={10}
          mt={3}
          _text={{color: 'white'}}
          minW={16}
          onPress={onComplete}>
          Add
        </Button>
      </HStack>
    </Box>
  );
};

export default React.memo(AdditionalExerciseSelection);
