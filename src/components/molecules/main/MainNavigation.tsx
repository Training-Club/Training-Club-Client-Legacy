import React from 'react';
import {Box, Center, HStack, useColorModeValue} from 'native-base';
import MainNavigationItem from '../../atoms/main/MainNavigationItem';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import StartNewActionsheet from './StartNewActionsheet';
import DarkActionsheetTheme from '../../organisms/design/themes/DarkActionsheetTheme';

enum MainNavigationScreen {
  FEED = 'Feed',
  DISCOVERY = 'Discovery',
  ANALYTICS = 'Analytics',
  PROFILE = 'Profile',
}

const MainNavigation = (): JSX.Element => {
  const {actionSheetRef, actionSheetConfig, setActionSheetConfig} =
    useActionsheetContext();

  const navigation = useNavigation();
  const {width} = Dimensions.get('screen');

  const smallDevice = width <= 375;

  const [selectedScreen, setSelectedScreen] =
    React.useState<MainNavigationScreen>(MainNavigationScreen.FEED);

  const backgroundColor = useColorModeValue('white', 'black');
  const borderTopColor = useColorModeValue('apple.gray.50', 'apple.gray.900');

  /**
   * Toggles the screen selection state to the provided parameter
   *
   * @param {MainNavigationScreen} newScreen Screen to update view to
   */
  function handleNavigationToggle(newScreen: MainNavigationScreen) {
    if (newScreen === selectedScreen) {
      return;
    }

    setSelectedScreen(newScreen);
    navigation.navigate('Main' as never, {screen: newScreen} as never);
  }

  /**
   * Sets the action sheet content and toggles open an action sheet view
   * displayed the 'Start New' dialog
   */
  function handleStartNewActionsheet() {
    if (!actionSheetRef || !actionSheetRef.current) {
      return;
    }

    setActionSheetConfig({
      children: <StartNewActionsheet />,
      index: -1,
      backgroundComponent: DarkActionsheetTheme,
      snapPoints: actionSheetConfig.snapPoints,
    });

    actionSheetRef.current.snapToIndex(0);
  }

  return (
    <Box
      position={'absolute'}
      zIndex={1}
      bottom={0}
      left={0}
      pb={smallDevice ? 2 : 10}
      pt={2}
      borderTopColor={borderTopColor}
      borderTopWidth={2}
      bgColor={backgroundColor}
      w={'100%'}>
      <Center>
        <HStack space={8}>
          <MainNavigationItem
            text={'Home'}
            icon={{name: 'home', size: 8}}
            selected={selectedScreen === MainNavigationScreen.FEED}
            onPress={() => handleNavigationToggle(MainNavigationScreen.FEED)}
          />

          <MainNavigationItem
            text={'Discovery'}
            icon={{name: 'search', size: 8}}
            selected={selectedScreen === MainNavigationScreen.DISCOVERY}
            onPress={() =>
              handleNavigationToggle(MainNavigationScreen.DISCOVERY)
            }
          />

          <MainNavigationItem
            text={'New'}
            icon={{name: 'add', size: 8}}
            onPress={() => handleStartNewActionsheet()}
          />

          <MainNavigationItem
            text={'Analytics'}
            icon={{name: 'insights', size: 8}}
            selected={selectedScreen === MainNavigationScreen.ANALYTICS}
            onPress={() =>
              handleNavigationToggle(MainNavigationScreen.ANALYTICS)
            }
          />

          <MainNavigationItem
            text={'Profile'}
            selected={selectedScreen === MainNavigationScreen.PROFILE}
            avatar={{
              uri: 'https://source.unsplash.com/random/?strong,man',
              initial: 'JR',
            }}
            onPress={() => handleNavigationToggle(MainNavigationScreen.PROFILE)}
          />
        </HStack>
      </Center>
    </Box>
  );
};

export default MainNavigation;
