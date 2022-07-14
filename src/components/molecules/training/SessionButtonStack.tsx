import React, {useCallback} from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import {Button, HStack, IconButton, useColorModeValue} from 'native-base';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';

interface ISessionButtonStackProps {
  hasIncompleteExercises: boolean;
}

interface ISideButtonProps {
  text: string;
  onPress: () => void;
}

const SessionButtonStack = ({
  hasIncompleteExercises,
}: ISessionButtonStackProps): JSX.Element => {
  const navigation = useNavigation();
  const {setPushdownConfig} = usePushdownContext();

  const grayButtonColor = useColorModeValue('apple.gray.100', 'apple.gray.900');
  const grayButtonTextColor = useColorModeValue('black', 'white');
  const grayButtonColorPressed = useColorModeValue(
    'apple.gray.200',
    'apple.gray.800',
  );

  const newButtonColor = useColorModeValue('apple.gray.900', 'apple.gray.100');
  const newButtonTextColor = useColorModeValue('white', 'black');
  const newButtonColorPressed = useColorModeValue(
    'apple.gray.700',
    'apple.gray.300',
  );

  const handleNewExercise = useCallback(() => {
    navigation.navigate(
      'Training' as never,
      {screen: 'ExerciseSearch'} as never,
    );
  }, [navigation]);

  const handleCompleteSession = useCallback(() => {
    if (hasIncompleteExercises) {
      setPushdownConfig({
        title: 'Session Incomplete',
        body: 'You an unfinished exercises. Remove them or mark them as complete and try again.',
        status: 'error',
        duration: 5000,
        show: true,
      });

      return;
    }

    navigation.navigate(
      'Training' as never,
      {screen: 'TrainingSummary'} as never,
    );
  }, [hasIncompleteExercises, navigation, setPushdownConfig]);

  const handleAdditionalExercise = useCallback(() => {}, []);

  const SideButton = ({text, onPress}: ISideButtonProps): JSX.Element => {
    return (
      <Button
        borderRadius={'full'}
        px={6}
        w={'120px'}
        bgColor={grayButtonColor}
        _text={{color: grayButtonTextColor}}
        _pressed={{bgColor: grayButtonColorPressed}}
        onPressIn={onPress}>
        {text}
      </Button>
    );
  };

  return (
    <HStack
      position={'absolute'}
      bottom={8}
      left={4}
      alignItems={'center'}
      justifyContent={'space-between'}
      w={'100%'}
      h={'auto'}>
      <SideButton text={'Done'} onPress={() => handleCompleteSession()} />

      <IconButton
        testID={'session-button-stack-new-btn'}
        size={16}
        bgColor={newButtonColor}
        borderRadius={'full'}
        variant={'basic'}
        _icon={{
          as: MaterialIcons,
          name: 'add',
          color: newButtonTextColor,
          size: 8,
        }}
        _pressed={{
          bgColor: newButtonColorPressed,
        }}
        onPressIn={() => handleNewExercise()}
      />

      <SideButton
        text={'Superset'}
        onPress={() => handleAdditionalExercise()}
      />
    </HStack>
  );
};

export default React.memo(SessionButtonStack);
