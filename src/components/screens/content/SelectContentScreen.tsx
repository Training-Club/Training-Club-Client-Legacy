import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {createDraftContent} from '../../../data/Content';
import {usePushdownContext} from '../../../context/pushdown/PushdownContext';
import LoadingIndicator from '../../molecules/design/LoadingIndicator';
import {IContentDraft} from '../../../models/Content';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import useContentDraftStore from '../../../store/ContentDraftStore';
import {Button, Heading, Square, View, Text} from 'native-base';

const SelectContentScreen = (): JSX.Element => {
  const setContent = useContentDraftStore(state => state.setContent);
  const navigation = useNavigation();
  const [isRedirecting, setRedirecting] = React.useState(false);
  const {setPushdownConfig} = usePushdownContext();

  /**
   * Opens the native image selector prompt for both platforms and awaits
   * selections from the user before continuing on to create a draft item
   * for each image selected by the user.
   *
   * If successful, the user will be redirected to the edit content screen on the
   * draft content context will be set accordingly.
   *
   * Moving forward, this page would be skipped as long as the Content Draft Context
   * has existing values stored in it.
   */
  const handleOpenImagePicker = React.useCallback(async () => {
    let data: ImageOrVideo[];
    let draftData: IContentDraft[];

    // We set this early here because
    // the callback from the catch statement
    // does not trigger until the view is complete
    // unmounted, which isn't fast enough.
    setRedirecting(true);

    try {
      data = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'any',
        cropperCancelText: undefined,
      });
    } catch (err) {
      navigation.navigate('Main' as never, {screen: 'Feed'} as never);
      return;
    }

    try {
      draftData = await createDraftContent(data);
    } catch (err) {
      navigation.navigate('Main' as never, {screen: 'Feed'} as never);

      setPushdownConfig({
        title: 'Failed to upload content',
        body: 'We were unable to process your images in to the image editor',
        status: 'error',
        duration: 5000,
        show: true,
      });

      return;
    }

    setRedirecting(false);
    setContent(draftData);

    navigation.navigate('Content' as never, {screen: 'ContentEdit'} as never);
  }, [navigation, setContent, setPushdownConfig]);

  if (isRedirecting) {
    return (
      <LoadingIndicator loadingText={'Reading content from your device'} />
    );
  }

  return (
    <View px={4}>
      <CloseableHeader
        pageTitle={'Create Post'}
        closeButton={{stackName: 'Main', screenName: 'Feed'}}
      />

      <Square
        w={'100%'}
        h={'100%'}
        position={'absolute'}
        top={0}
        left={0}
        ml={4}>
        <Heading>Select Content</Heading>
        <Text>We should really put something neat here</Text>

        <Button
          variant={'info'}
          mt={4}
          _text={{color: 'white'}}
          onPress={() => handleOpenImagePicker()}>
          Select Images/Videos
        </Button>
      </Square>
    </View>
  );
};

export default SelectContentScreen;
