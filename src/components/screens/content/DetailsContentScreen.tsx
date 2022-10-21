import React from 'react';
import {AxiosError} from 'axios';
import {FormatTrainingSessionQuery} from '../../../utils/StringUtil';
import {useAccountContext} from '../../../context/account/AccountContext';
import {getTrainingSessions} from '../../../requests/Training';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import {useContentDraftContext} from '../../../context/content/ContentDraftContext';
import {uploadFiles} from '../../../requests/Content';

import CloseableHeader from '../../molecules/design/CloseableHeader';

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
  useColorModeValue,
  View,
} from 'native-base';

/*
Post Caption
Attach to a training session
Attach a meal
Add tags
Tag a location
 */

const DetailsContentScreen = (): JSX.Element => {
  const {account, accessToken} = useAccountContext();
  const {content} = useContentDraftContext();
  const {setPushdownConfig} = usePushdownContext();

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

  const textColor = useColorModeValue('core.text.light', 'core.text.dark');

  const mutedTextColor = useColorModeValue(
    'core.mutedText.light',
    'core.mutedText.dark',
  );

  const inputBgColor = useColorModeValue('apple.gray.50', 'apple.gray.900');

  const onSubmit = React.useCallback(() => {
    uploadFiles(content, accessToken)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        const axiosError = err as AxiosError;
        console.log(axiosError.response);
      });
  }, [accessToken, content]);

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
          body: 'We were unable to query your recent training sessions and you may not be able to attach a Training Session to your post at this time.',
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
