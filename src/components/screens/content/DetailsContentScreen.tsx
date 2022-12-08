import React from 'react';
import {createPostWithFiles} from '../../../requests/Content';
import {useNavigation} from '@react-navigation/native';
import {NavigationHeader} from '../../molecules/design/NavigationHeader';
import {Chip} from '../../atoms/design/Chip';
import {Capitalize} from '../../../utils/StringUtil';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivacyLevel} from '../../../models/Privacy';
import {ILocation, LocationType} from '../../../models/Location';
import useAccountStore from '../../../store/AccountStore';
import useContentDraftStore from '../../../store/ContentDraftStore';

import {
  FormControl,
  ScrollView,
  Select,
  TextArea,
  HStack,
  Center,
  useColorModeValue,
  Input,
} from 'native-base';

const DetailsContentScreen = (): JSX.Element => {
  const accessToken = useAccountStore(state => state.accessToken);
  const content = useContentDraftStore(state => state.content);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [caption, setCaption] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [privacyLevel, setPrivacyLevel] = React.useState(PrivacyLevel.PUBLIC);
  const [locations, setLocations] = React.useState<ILocation[]>([
    {
      id: '',
      author: '',
      name: 'PROTOGYM',
      description: 'Gym in Henderson, NV',
      type: LocationType.GYM,
    },
  ]);

  const textColor = useColorModeValue('core.text.light', 'core.text.dark');
  const inputBgColor = useColorModeValue('apple.gray.50', 'apple.gray.900');
  const segmentedTextColor = useColorModeValue('black', 'white');
  const segmentedSelectedTextColor = useColorModeValue('black', 'black');

  const segmentedBgColor = useColorModeValue(
    'core.backgroundAccent.light',
    'core.backgroundAccent.dark',
  );

  const mutedTextColor = useColorModeValue(
    'core.mutedText.light',
    'core.mutedText.dark',
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
   * Handles submitting the POST request to the server to create the post
   */
  const onSubmit = React.useCallback(() => {
    createPostWithFiles(
      caption,
      undefined,
      undefined,
      tags,
      content,
      PrivacyLevel.PUBLIC,
      accessToken,
    )
      .then(response => {
        console.log(response);
        navigation.navigate('MainFeed');
      })
      .catch(err => {
        console.error(err);
      });
  }, [accessToken, caption, content, navigation, tags]);

  return (
    <NavigationHeader
      title={'Details'}
      viewStyle={{px: 4}}
      actionButton={{
        text: 'Submit',
        onPress: onSubmit,
      }}
      backButton={{
        text: 'Edit',
        navigationProps: {screenName: 'ContentEdit'},
      }}>
      <ScrollView h={'100%'}>
        <FormControl>
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

        <FormControl w={'100%'} mt={8}>
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

        <FormControl mt={4}>
          <FormControl.Label color={mutedTextColor}>Location</FormControl.Label>

          <Select bgColor={inputBgColor} borderRadius={12}>
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

        <FormControl mt={4}>
          <FormControl.Label color={mutedTextColor}>Tags</FormControl.Label>

          <Input
            bgColor={inputBgColor}
            borderRadius={12}
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

export default DetailsContentScreen;
