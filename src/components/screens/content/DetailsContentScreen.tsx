import React from 'react';
import {FormatTrainingSessionQuery} from '../../../utils/StringUtil';
import {getTrainingSessions} from '../../../requests/Training';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {useContentDraftContext} from '../../../context/content/ContentDraftContext';
import {createPostWithFiles} from '../../../requests/Content';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivacyLevel} from '../../../models/Privacy';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import useAccountStore from '../../../store/AccountStore';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import Animated, {
  SequencedTransition,
  FadeOut,
  SlideInRight,
} from 'react-native-reanimated';

import {ILocation, LocationType} from '../../../models/Location';

import {
  ITrainingSession,
  TrainingSessionStatus,
} from '../../../models/Training';

import {
  Box,
  Button,
  FormControl,
  ScrollView,
  Select,
  TextArea,
  Text,
  View,
  Square,
  Pressable,
  HStack,
  Icon,
  useColorModeValue,
  Input,
} from 'native-base';

const DetailsContentScreen = (): JSX.Element => {
  const account = useAccountStore(state => state.account);
  const accessToken = useAccountStore(state => state.accessToken);
  const {content} = useContentDraftContext();
  const {setPushdownConfig} = usePushdownContext();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [caption, setCaption] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);

  const [trainingSessions, setTrainingSessions] = React.useState<
    ITrainingSession[]
  >([
    {
      id: '',
      sessionName: 'Example Session',
      author: '',
      status: TrainingSessionStatus.COMPLETED,
      exercises: [],
    },
  ]);

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

  const mutedTextColor = useColorModeValue(
    'core.mutedText.light',
    'core.mutedText.dark',
  );

  const inputBgColor = useColorModeValue('apple.gray.50', 'apple.gray.900');

  const onTagAdd = React.useCallback(
    (tag: string) => {
      if (tags.find(t => t === tag)) {
        return;
      }

      setTags(prevState => [...prevState, tag]);
    },
    [tags],
  );

  const onTagRemove = React.useCallback((tag: string) => {
    setTags(prevState => prevState.filter(t => t !== tag));
  }, []);

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
        navigation.navigate('Main', {screen: 'Feed'});
      })
      .catch(err => {
        console.error(err);
      });
  }, [accessToken, caption, content, navigation, tags]);

  React.useEffect(() => {
    if (!account) {
      return;
    }

    const queryString = FormatTrainingSessionQuery(
      undefined,
      undefined,
      account.id,
      0,
    );

    if (!queryString) {
      // TODO: Set error here
      return;
    }

    getTrainingSessions(queryString, accessToken)
      .then(sessions => {
        setTrainingSessions(sessions);
      })
      .catch(err => {
        if (err.response.status === 404) {
          if (trainingSessions && trainingSessions.length > 0) {
            setTrainingSessions([]);
            return;
          }

          return;
        }

        setPushdownConfig({
          status: 'error',
          title: 'Failed to query Training Sessions',
          body:
            err.response.message ??
            'We were unable to query your training sessions and you may be unable to select them.',
          duration: 5000,
          show: true,
        });
      });
  }, [accessToken, account, setPushdownConfig, trainingSessions]);

  return (
    <View>
      <Box px={4}>
        <CloseableHeader
          pageTitle={'Edit Details'}
          closeButton={{stackName: 'Content', screenName: 'ContentEdit'}}
        />

        <ScrollView h={'100%'}>
          <FormControl>
            <FormControl.Label color={mutedTextColor}>
              Caption
            </FormControl.Label>

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

          <FormControl mt={8}>
            <FormControl.Label color={mutedTextColor}>
              Attach a Training Session
            </FormControl.Label>

            <Select>
              {trainingSessions &&
                trainingSessions.map(session => (
                  <Select.Item
                    key={session.id}
                    label={session.sessionName ?? ''}
                    value={session.id}
                  />
                ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormControl.Label color={mutedTextColor}>
              Location
            </FormControl.Label>

            <Select>
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

            <Input onSubmitEditing={e => onTagAdd(e.nativeEvent.text)} />

            {tags && (
              <HStack space={2} mt={2} flexWrap={'wrap'}>
                {tags.map(tag => (
                  <Animated.View
                    entering={SlideInRight}
                    layout={SequencedTransition.delay(300)}
                    exiting={FadeOut.duration(250)}>
                    <Pressable onPress={() => onTagRemove(tag)}>
                      <Square
                        bgColor={'black'}
                        mt={2}
                        p={1}
                        minW={16}
                        borderRadius={'full'}>
                        <HStack
                          space={1}
                          justifyContent={'center'}
                          alignItems={'center'}>
                          <Text fontSize={'xs'} color={'white'}>
                            {tag}
                          </Text>

                          <Icon
                            as={MaterialIcons}
                            name={'close'}
                            size={4}
                            color={'white'}
                          />
                        </HStack>
                      </Square>
                    </Pressable>
                  </Animated.View>
                ))}
              </HStack>
            )}
          </FormControl>
        </ScrollView>
      </Box>

      <Box w={'100%'} position={'absolute'} bottom={0} left={0} mb={8} px={4}>
        <Button
          variant={'info'}
          _text={{color: 'white'}}
          onPress={() => onSubmit()}>
          Create
        </Button>
      </Box>
    </View>
  );
};

export default DetailsContentScreen;
