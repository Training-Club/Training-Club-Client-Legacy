import React from 'react';
import {Box, Button, View} from 'native-base';
import GreetingText from '../../atoms/main/home/GreetingText';
import {useAccountContext} from '../../../context/account/AccountContext';
import {useAccountDrawerContext} from '../../../context/account/AccountDrawerContext';

const FeedScreen = (): JSX.Element => {
  const {account} = useAccountContext();
  const {setOpen} = useAccountDrawerContext();

  const name = account?.profile?.name ?? account?.username;
  const spacing = 4;

  return (
    <View>
      {name && (
        <Box w={'100%'} px={spacing}>
          <GreetingText name={name} />
          <Button onPressIn={() => setOpen(true)}>Test</Button>
        </Box>
      )}
    </View>
  );
};

export default FeedScreen;
