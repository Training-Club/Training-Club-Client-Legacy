import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Handle from '../../organisms/design/themes/Handle';
import {useNavigation} from '@react-navigation/native';
import {useActionsheetContext} from '../../../context/actionsheet/ActionsheetContext';
import DarkActionsheetTheme from '../../organisms/design/themes/DarkActionsheetTheme';
import {isSmallScreen} from '../../../utils/DeviceUtil';
import StartNewActionsheet from './StartNewActionsheet';
import MainNavigationItem from '../../atoms/main/MainNavigationItem';
import {Box, Center, HStack, useColorModeValue} from 'native-base';

export enum MainNavigationScreen {
  FEED = 'MainFeed',
  DISCOVERY = 'MainDiscovery',
  ANALYTICS = 'MainAnalytics',
  PROFILE = 'MainProfile',
}

interface IMainNavigationProps {
  current: MainNavigationScreen;
}

const MainNavigation = ({current}: IMainNavigationProps): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {actionSheetRef, setActionSheetConfig} = useActionsheetContext();
  const smallDevice = isSmallScreen();

  const snapPoints = React.useMemo(
    () => [smallDevice ? '65%' : '55%'],
    [smallDevice],
  );

  const backgroundColor = useColorModeValue(
    'core.backgroundHighlight.light',
    'core.backgroundHighlight.dark',
  );

  /**
   * Toggles the screen selection state to the provided parameter
   *
   * @param {MainNavigationScreen} newScreen Screen to update view to
   */
  function handleNavigationToggle(newScreen: MainNavigationScreen) {
    navigation.navigate(newScreen);
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
      handleComponent: Handle,
      snapPoints: snapPoints,
    });
  }

  return (
    <Box
      position={'absolute'}
      zIndex={1}
      bottom={0}
      left={0}
      pb={smallDevice ? 2 : 10}
      pt={2}
      borderTopRadius={16}
      bgColor={backgroundColor}
      w={'100%'}>
      <Center>
        <HStack space={8}>
          <MainNavigationItem
            text={'Home'}
            icon={{name: 'home', size: 8}}
            selected={current === MainNavigationScreen.FEED}
            onPress={() => handleNavigationToggle(MainNavigationScreen.FEED)}
          />

          <MainNavigationItem
            text={'Discover'}
            icon={{name: 'search', size: 8}}
            selected={current === MainNavigationScreen.DISCOVERY}
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
            selected={current === MainNavigationScreen.ANALYTICS}
            onPress={() =>
              handleNavigationToggle(MainNavigationScreen.ANALYTICS)
            }
          />

          <MainNavigationItem
            text={'Profile'}
            selected={current === MainNavigationScreen.PROFILE}
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
