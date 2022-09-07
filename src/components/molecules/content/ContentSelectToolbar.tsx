import React from 'react';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {Box, IconButton, useColorModeValue} from 'native-base';

interface IContentSelectToolbar {
  isMultiselectEnabled: boolean;
  toggleMultiSelect: () => void;
}

const ContentSelectToolbar = ({
  isMultiselectEnabled,
  toggleMultiSelect,
}: IContentSelectToolbar): JSX.Element => {
  const buttonTextColor = useColorModeValue('black', 'white');

  const iconName = isMultiselectEnabled
    ? 'checkbox-blank'
    : 'checkbox-multiple-blank';

  return (
    <Box position={'relative'} w={'100%'}>
      <IconButton
        onPress={() => toggleMultiSelect()}
        size={'sm'}
        mx={1}
        my={1}
        w={6}
        h={6}
        borderRadius={'full'}
        _pressed={{bgColor: 'none'}}
        _icon={{
          as: MaterialCommunityIcons,
          name: iconName,
          color: buttonTextColor,
        }}
      />
    </Box>
  );
};

export default ContentSelectToolbar;
