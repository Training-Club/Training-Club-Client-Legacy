import React from 'react';
import {Box, View} from 'native-base';
import GreetingText from '../../atoms/main/home/GreetingText';
import {useAccountContext} from '../../../context/account/AccountContext';

const FeedScreen = (): JSX.Element => {
  const {account} = useAccountContext();
  // const {colorMode, setColorMode} = useColorMode();

  const name = account?.profile?.name ?? account?.username;
  const spacing = 4;

  return (
    <View>
      {name && (
        <Box w={'100%'} px={spacing}>
          <GreetingText name={name} />
        </Box>
      )}
    </View>
  );
};

export default FeedScreen;
