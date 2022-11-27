import React from 'react';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import useExerciseStore from '../../../store/ExerciseStore';
import {SessionSummaryCard} from '../../molecules/training/SessionSummaryCard';
import {useSessionContext} from '../../../context/session/SessionContext';
import {Capitalize} from '../../../utils/StringUtil';
import {Chip} from '../../atoms/design/Chip';
import {useNavigation} from '@react-navigation/native';
import {ILocation} from '../../../models/Location';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivacyLevel} from '../../../models/Privacy';

import {
  Center,
  FormControl,
  Select,
  TextArea,
  View,
  Box,
  Button,
  HStack,
  ScrollView,
  Input,
  useColorModeValue,
} from 'native-base';

const CurrentSessionSummaryScreen = (): JSX.Element => {
  const {draft} = useSessionContext();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const exercises = useExerciseStore(state => state.exercises);
  const [caption, setCaption] = React.useState<string>('');
  const [locations, setLocations] = React.useState<ILocation[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [privacyLevel, setPrivacyLevel] = React.useState(PrivacyLevel.PUBLIC);

  const textColor = useColorModeValue('core.text.light', 'core.text.dark');
  const inputBgColor = useColorModeValue('white', 'black');
  const segmentedTextColor = useColorModeValue('black', 'white');
  const segmentedSelectedTextColor = useColorModeValue('black', 'black');

  const mutedTextColor = useColorModeValue(
    'core.mutedText.light',
    'core.mutedText.dark',
  );

  const segmentedBgColor = useColorModeValue(
    'core.backgroundAccent.light',
    'core.backgroundAccent.dark',
  );

  /**
   * Handles adding single or multiple tags to the current tags
   */
  const onTagAdd = React.useCallback(
    (value: string) => {
      const splitTags = value.split(/[, ]+/);
      let tagsToAdd: string[] = [];

      splitTags.forEach(t => {
        if (!tags.find(existingTag => t === existingTag)) {
          tagsToAdd.push(t);
        }
      });

      setTags(prevState => [...prevState, ...splitTags]);
    },
    [tags],
  );

  /**
   * Handles removing a specific tag from the tag array
   */
  const onTagRemove = React.useCallback((tag: string) => {
    setTags(prevState => prevState.filter(t => t !== tag));
  }, []);

  /**
   * Handles navigating the client to the content select screen
   */
  const onContentUploadPress = React.useCallback(() => {
    navigation.navigate('Training', {screen: 'TrainingContentSelect'});
  }, [navigation]);

  /**
   * Returns an array of the privacy levels in user-readable format
   */
  const getPrivacyLevels = React.useCallback(() => {
    let values: string[] = [];

    Object.keys(PrivacyLevel).forEach(pl => {
      values.push(Capitalize(pl.replace('_', ' ')));
    });

    return values;
  }, []);

  /**
   * Collects all unique exercise names and returns them in the form
   * of an array so it can be imported automatically as post tags.
   */
  const getInitialTags = React.useCallback(() => {
    let exerciseNames: string[] = [];

    exercises.forEach(e => {
      if (
        !exerciseNames.find(
          existingExerciseName => e.exerciseName === existingExerciseName,
        )
      ) {
        exerciseNames.push(e.exerciseName);
      }
    });

    return exerciseNames;
  }, [exercises]);

  /**
   * Callback function that updates state when the privacy
   * level is updated.
   */
  const handlePrivacyLevelChange = React.useCallback(
    (value: string) => {
      if (value === 'Public' && privacyLevel !== PrivacyLevel.PUBLIC) {
        setPrivacyLevel(PrivacyLevel.PUBLIC);
        return;
      }

      if (
        value === 'Followers Only' &&
        privacyLevel !== PrivacyLevel.FOLLOWERS_ONLY
      ) {
        setPrivacyLevel(PrivacyLevel.FOLLOWERS_ONLY);
        return;
      }

      if (value === 'Private' && privacyLevel !== PrivacyLevel.PRIVATE) {
        setPrivacyLevel(PrivacyLevel.PRIVATE);
      }
    },
    [privacyLevel],
  );

  /**
   * Handles initial data load
   */
  React.useEffect(() => {
    const initialTags = getInitialTags();
    setTags(initialTags);
  }, [getInitialTags]);

  return (
    <View px={4}>
      <CloseableHeader
        pageTitle={'Session Summary'}
        closeButton={{stackName: 'Training', screenName: 'CurrentSession'}}
      />

      <ScrollView showsVerticalScrollIndicator={false} pb={12}>
        <SessionSummaryCard
          sessionName={draft?.sessionName}
          onContentUpload={() => onContentUploadPress()}
        />

        <FormControl w={'100%'} mt={2}>
          <FormControl.Label>Post Privacy</FormControl.Label>

          <SegmentedControl
            values={getPrivacyLevels()}
            selectedIndex={0}
            onValueChange={value => handlePrivacyLevelChange(value)}
            backgroundColor={segmentedBgColor}
            fontStyle={{color: segmentedTextColor}}
            activeFontStyle={{color: segmentedSelectedTextColor}}
          />

          <Center>
            {privacyLevel === PrivacyLevel.PUBLIC && (
              <FormControl.HelperText>
                Your post will be visible to any member of Training Club.
              </FormControl.HelperText>
            )}

            {privacyLevel === PrivacyLevel.FOLLOWERS_ONLY && (
              <FormControl.HelperText>
                Your post will only be visible to those who follow you.
              </FormControl.HelperText>
            )}

            {privacyLevel === PrivacyLevel.PRIVATE && (
              <FormControl.HelperText>
                Your post will only be visble to you.
              </FormControl.HelperText>
            )}
          </Center>
        </FormControl>

        <FormControl mt={2}>
          <FormControl.Label color={mutedTextColor}>Caption</FormControl.Label>

          <TextArea
            autoCompleteType={'none'}
            placeholder={'Add a post description'}
            minH={24}
            w={'100%'}
            borderRadius={'12px'}
            color={textColor}
            bg={inputBgColor}
            onChange={e => setCaption(e.nativeEvent.text)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormControl.Label color={mutedTextColor}>Location</FormControl.Label>

          <Select borderRadius={12} bg={inputBgColor}>
            {locations &&
              locations.map(location => (
                <Select.Item
                  key={location.id}
                  label={location.name ?? ''}
                  value={location.id}
                />
              ))}
          </Select>
        </FormControl>

        <FormControl mt={2}>
          <FormControl.Label color={mutedTextColor}>Tags</FormControl.Label>

          <Input
            borderRadius={12}
            bgColor={inputBgColor}
            onSubmitEditing={e => onTagAdd(e.nativeEvent.text)}
          />

          {tags && (
            <HStack space={2} mt={2} flexWrap={'wrap'}>
              {tags.map(tag => (
                <Chip text={tag} onPress={() => onTagRemove(tag)} />
              ))}
            </HStack>
          )}
        </FormControl>
      </ScrollView>

      <Box position={'absolute'} left={4} bottom={8} w={'100%'}>
        <Button
          variant={'info'}
          size={'lg'}
          w={'100%'}
          _text={{color: 'white'}}>
          Submit
        </Button>
      </Box>
    </View>
  );
};

export default CurrentSessionSummaryScreen;
