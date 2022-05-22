import React from 'react';
import {View} from 'native-base';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import {useDebounce} from 'use-debounce';

import UsernameInput, {
  IUsernameInputErrors,
} from '../../organisms/auth/UsernameInput';

import {
  isValidUsername,
  UsernameValidatorResponse,
} from '../../../utils/ValidatorUtil';

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
  const [usernameDebounced] = useDebounce(username, 500);
  const [usernameErrors, setUsernameErrors] =
    React.useState<IUsernameInputErrors>({
      minLength: true,
      maxLength: true,
      available: true,
      specialChars: true,
    });

  const spacing = 4;

  React.useEffect(() => {
    isValidUsername(usernameDebounced).then(result => {
      setUsernameErrors(result.errors);
    });
  }, [usernameDebounced]);

  async function submitUsernameSelection() {
    const result: UsernameValidatorResponse = await isValidUsername(username);
    console.log(`valid ${result.valid}`);

    if (!result.valid) {
      setUsernameErrors(result.errors);
      console.log('updated errors for username');
      console.log(result.errors);
    }
  }

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
          onSubmit={submitUsernameSelection}
          errors={usernameErrors}
        />
      )}
    </View>
  );
};

export default React.memo(RegisterScreen);
