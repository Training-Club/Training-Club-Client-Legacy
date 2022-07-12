import React from 'react';
import {Heading, View} from 'native-base';
import {useSessionContext} from '../../../context/session/SessionContext';

const CurrentSessionScreen = (): JSX.Element => {
  const {draft, setDraft} = useSessionContext();

  React.useEffect(() => {
    if (!draft) {
      setDraft({sessionName: 'My Workout', timestamp: new Date()});
    }
  }, [draft, setDraft]);

  return (
    <View>
      {draft && draft.sessionName && <Heading>{draft.sessionName}</Heading>}
    </View>
  );
};

export default CurrentSessionScreen;
