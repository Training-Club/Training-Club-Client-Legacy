import React, {useCallback} from 'react';
import {Box, View} from 'native-base';
import {useSessionContext} from '../../../context/session/SessionContext';
import RenameableHeader from '../../molecules/training/RenameableHeader';

const CurrentSessionScreen = (): JSX.Element => {
  const {draft, setDraft} = useSessionContext();

  const sessionName = draft?.sessionName ?? 'My Workout';
  const spacing = 4;

  React.useEffect(() => {
    // Initializes a new training session if no existing draft is running
    if (!draft) {
      setDraft({sessionName: 'My Workout', timestamp: new Date()});
    }
  }, [draft, setDraft]);

  const handleSessionNameChange = useCallback(
    (name: string) => {
      setDraft({...draft, sessionName: name});
    },
    [draft, setDraft],
  );

  return (
    <View px={spacing}>
      <Box w={'100%'} mt={spacing}>
        <RenameableHeader
          text={sessionName}
          setText={handleSessionNameChange}
          options={{maxLength: 24}}
          closeButton={{
            stackName: 'Main',
            screenName: 'Home',
          }}
        />
      </Box>
    </View>
  );
};

export default CurrentSessionScreen;
