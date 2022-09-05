import React from 'react';
import {IAccount} from '../../../../models/Account';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {FormatLargeNumber} from '../../../../utils/StringUtil';

import {
  Avatar,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  Square,
  Heading,
} from 'native-base';

interface IAccountDrawerHeader {
  account: IAccount;

  data?: {
    followerCount?: number;
    followingCount?: number;
  };

  style?: {
    bgColor?: ColorType;
    textColor?: ColorType;
    ghostTextColor?: ColorType;
    avatarColor?: ColorType;
    accentColor?: ColorType;
    borderRadius?: number | string;
    spacing?: number;
  };
}

const AccountDrawerHeader = ({
  account,
  data,
  style,
}: IAccountDrawerHeader): JSX.Element => {
  const defaultSpacing = 4;
  const defaultBorderRadius = 12;
  const defaultBgColor = useColorModeValue('white', 'black');
  const defaultAccentColor = useColorModeValue(
    'apple.gray.100',
    'apple.gray.900',
  );
  const defaultTextColor = useColorModeValue('black', 'white');
  const defaultGhostTextColor = useColorModeValue(
    'apple.gray.700',
    'apple.gray.300',
  );
  const defaultAvatarColor = useColorModeValue(
    'apple.blue.light',
    'apple.blue.dark',
  );

  const getAccountInitials = React.useCallback(() => {
    if (account.profile && account.profile.name) {
      return account.profile.name.charAt(0);
    }

    return account.username.charAt(0);
  }, [account.profile, account.username]);

  return (
    <VStack
      w={'100%'}
      bgColor={style?.bgColor ?? defaultBgColor}
      p={style?.spacing ?? defaultSpacing}
      space={style?.spacing ?? defaultSpacing}
      borderRadius={style?.borderRadius ?? defaultBorderRadius}>
      <Square w={'100%'}>
        <Avatar
          source={{uri: account.profile?.avatar ?? undefined}}
          size={'xl'}
          bg={style?.avatarColor ?? defaultAvatarColor}>
          {getAccountInitials()}
        </Avatar>
      </Square>

      <Heading
        size={'md'}
        textAlign={'center'}
        color={style?.textColor ?? defaultTextColor}>
        @{account.username}
      </Heading>

      <HStack>
        <VStack
          w={'50%'}
          borderRightWidth={1}
          borderColor={style?.accentColor ?? defaultAccentColor}>
          <Text
            fontWeight={'semibold'}
            textAlign={'center'}
            color={style?.textColor ?? defaultTextColor}>
            {data?.followerCount ? FormatLargeNumber(data.followerCount) : 0}
          </Text>

          <Text
            fontSize={'xs'}
            textAlign={'center'}
            color={style?.ghostTextColor ?? defaultGhostTextColor}>
            Followers
          </Text>
        </VStack>

        <VStack w={'50%'}>
          <Text
            fontWeight={'semibold'}
            textAlign={'center'}
            color={style?.textColor ?? defaultTextColor}>
            {data?.followingCount ? FormatLargeNumber(data.followingCount) : 0}
          </Text>

          <Text
            fontSize={'xs'}
            textAlign={'center'}
            color={style?.ghostTextColor ?? defaultGhostTextColor}>
            Following
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default React.memo(AccountDrawerHeader);
