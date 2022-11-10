import React from 'react';
import {IAccount} from '../src/models/Account';
import {ContentType, IContentItem} from '../src/models/Content';
import theme from '../src/Theme';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import {PostAuthorDetails} from '../src/components/atoms/main/home/post/PostAuthorDetails';
import {PostScrollIndicator} from '../src/components/molecules/main/post/PostScrollIndicator';
import {PostCarousel} from '../src/components/molecules/main/post/PostCarousel';
import {PostActionStack} from '../src/components/molecules/main/post/PostActionStack';
import {PostContentAudioControl} from '../src/components/atoms/main/home/post/PostContentAudioControl';

describe('Post Item ->', () => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };

  it('should render author name and avatar', () => {
    const account: IAccount = {
      id: '0',
      username: 'test_user',
      email: 'test@test.com',
    };

    const {getByText, getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <PostAuthorDetails username={account.username} onPress={jest.fn()} />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const avatarElem = getByTestId('post-author-avatar');
    const usernameElem = getByText('test_user');

    expect(avatarElem).toBeTruthy();
    expect(usernameElem).toBeTruthy();
  });

  it('should render scroll indicator', async () => {
    const {getByTestId, findAllByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <PostScrollIndicator index={1} size={5} />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const containerElem = getByTestId('post-scroll-indicator');

    const indicatorElemArray = await findAllByTestId(
      'post-scroll-indicator-item',
    );

    expect(containerElem).toBeTruthy();
    expect(indicatorElemArray.length).toEqual(5);
  });

  it('should render carousel', () => {
    const content: IContentItem[] = [
      {
        destination: '',
        type: ContentType.IMAGE,
      },
      {
        destination: '',
        type: ContentType.IMAGE,
      },
      {
        destination: '',
        type: ContentType.IMAGE,
      },
    ];

    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <PostCarousel
            position={{post: 0, index: 0}}
            currentPosition={{post: 0, index: 0}}
            scrollEnabled={true}
            content={content}
            contentWidth={300}
            onIndexChange={jest.fn()}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const carouselElem = getByTestId('post-carousel');

    expect(carouselElem).toBeTruthy();
  });

  it('should render post action stack with text', () => {
    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <PostActionStack
            onLike={jest.fn}
            onComment={jest.fn}
            onMore={jest.fn}
            attributes={{
              likeCount: 1003,
              commentCount: 908,
            }}
          />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const likeCountElem = getByText('1003');
    const commentCountElem = getByText('908');

    expect(likeCountElem).toBeTruthy();
    expect(commentCountElem).toBeTruthy();
  });

  it('should render post audio control', () => {
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset} theme={theme()}>
        <NavigationContainer>
          <PostContentAudioControl muted={true} onAudioToggle={jest.fn} />
        </NavigationContainer>
      </NativeBaseProvider>,
    );

    const audioControllerElem = getByTestId('post-audio-control');

    expect(audioControllerElem).toBeTruthy();
  });
});
