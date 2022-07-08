import React from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {
  Pressable,
  VStack,
  Text,
  Icon,
  Avatar,
  useColorModeValue,
} from 'native-base';

interface IMainNavigationItemProps {
  selected?: boolean;
  text?: string;
  onPress?: () => void;
  icon?: {
    name: string;
    size: number;
  };
  avatar?: {
    uri?: string;
    initial?: string;
  };
}

const MainNavigationItem = ({
  selected,
  text,
  onPress,
  icon,
  avatar,
}: IMainNavigationItemProps): JSX.Element => {
  const iconColor = useColorModeValue('black', 'white');

  const selectedIconColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  return (
    <Pressable onPress={() => (onPress ? onPress() : undefined)}>
      <VStack space={1} alignItems={'center'}>
        {icon && (
          <Icon
            as={MaterialIcons}
            name={icon.name}
            size={icon.size}
            color={selected ? selectedIconColor : iconColor}
          />
        )}

        {avatar && (
          <Avatar
            size="sm"
            borderWidth={2}
            bg={iconColor}
            borderColor={selected ? selectedIconColor : 'rgba(0.0,0.0,0.0,0.0)'}
            source={{
              uri: avatar.uri,
            }}>
            {avatar.initial}
          </Avatar>
        )}

        {text && (
          <Text
            textAlign={'center'}
            fontSize={'xs'}
            color={selected ? selectedIconColor : iconColor}>
            {text}
          </Text>
        )}
      </VStack>
    </Pressable>
  );
};

export default React.memo(MainNavigationItem);
