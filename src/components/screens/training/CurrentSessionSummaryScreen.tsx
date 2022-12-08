import React from 'react';
import useAccountStore from '../../../store/AccountStore';
import useExerciseStore from '../../../store/ExerciseStore';
import {SessionSummaryCard} from '../../molecules/training/SessionSummaryCard';
import {useSessionContext} from '../../../context/session/SessionContext';
import {Capitalize} from '../../../utils/StringUtil';
import {Chip} from '../../atoms/design/Chip';
import {NavigationHeader} from '../../molecules/design/NavigationHeader';
import {useNavigation} from '@react-navigation/native';
import {createTrainingSession} from '../../../requests/Training';
import {createPost} from '../../../requests/Content';
import {ILocation} from '../../../models/Location';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivacyLevel} from '../../../models/Privacy';

import {
  Center,
  FormControl,
  HStack,
  ScrollView,
  Select,
  TextArea,
  Input,
  useColorModeValue,
} from 'native-base';

const CurrentSessionSummaryScreen = (): JSX.Element => {
  const exercises = useExerciseStore(state => state.exercises);
  const account = useAccountStore(state => state.account);
  const accessToken = useAccountStore(state => state.accessToken);

  const {draft} = useSessionContext();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
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
    console.log('onContentUploadPress called');
  }, []);

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

  const onSubmit = React.useCallback(async () => {
    if (!account) {
      console.error('account is undefined');
      return;
    }

    let trainingSessionId: string;
    let postId: string;

    try {
      const response = await createTrainingSession(
        draft?.sessionName ?? 'My Workout',
        account.id,
        exercises,
        accessToken,
      );
      trainingSessionId = response.message;
    } catch (err) {
      console.error(err);
      return;
    }

    try {
      const response = await createPost({
        session: trainingSessionId,
        token: accessToken,
      });
      postId = response.message;
    } catch (err) {
      console.error(err);
      return;
    }

    console.log(postId);
    navigation.navigate('MainFeed');
  }, [accessToken, account, draft?.sessionName, exercises, navigation]);

  /**
   * Handles initial data load
   */
  React.useEffect(() => {
    const initialTags = getInitialTags();
    setTags(initialTags);
  }, [getInitialTags]);

  return (
    <NavigationHeader
      title={'Details'}
      viewStyle={{px: 4}}
      backButton={{
        text: 'Session',
        navigationProps: {
          screenName: 'TrainingCurrentSession',
        },
      }}
      actionButton={{
        text: 'Submit',
        onPress: onSubmit,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
    </NavigationHeader>
  );
};

export default CurrentSessionSummaryScreen;
