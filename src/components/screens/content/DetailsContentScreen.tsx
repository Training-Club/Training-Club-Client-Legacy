import React from 'react';
import CloseableHeader from '../../molecules/design/CloseableHeader';
import {Box, View} from 'native-base';

const DetailsContentScreen = (): JSX.Element => {
  return (
    <View>
      <Box px={4}>
        <CloseableHeader
          pageTitle={'Edit Details'}
          closeButton={{stackName: 'Content', screenName: 'ContentEdit'}}
        />
      </Box>
    </View>
  );
};

export default DetailsContentScreen;
