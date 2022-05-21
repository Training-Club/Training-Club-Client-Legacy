import React from 'react';
import {View} from 'native-base';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import UsernameInput from '../../organisms/auth/UsernameInput';
import {useDebounce} from 'use-debounce';

export enum RegisterScreenState {
  USERNAME,
  EMAIL,
  PASSWORD,
}

const RegisterScreen = () => {
  const [state, setState] = React.useState<RegisterScreenState>(
    RegisterScreenState.USERNAME,
  );

  const [username, setUsername] = React.useState<string>('');
  const [usernameDebounced] = useDebounce(username, 1000);

  const spacing = 4;

  const handleUsernameLookup = React.useCallback(async () => {
    console.log('Not implemented');
  }, []);

  return (
    <View px={spacing}>
      <CloseableHeader
        pageTitle={'Join Training Club'}
        closeButton={{
          stackName: 'Auth',
          screenName: 'Welcome',
        }}
      />

      {state === RegisterScreenState.USERNAME && (
        <UsernameInput
          value={username}
          setValue={setUsername}
          onSubmit={() => console.log(`submitted: ${username}`)}
          errors={{
            minLength: username.length > 2,
            maxLength: username.length < 16,
            specialChars: true,
            available: false,
          }}
        />
      )}
    </View>
  );
};

export default React.memo(RegisterScreen);
