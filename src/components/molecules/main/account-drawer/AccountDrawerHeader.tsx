import React from 'react';
import {IAccount} from '../../../../models/Account';
import {Avatar, Heading, Square, useColorModeValue} from 'native-base';

interface IAccountDrawerHeaderProps {
  account: IAccount;
}

const AccountDrawerHeader = ({
  account,
}: IAccountDrawerHeaderProps): JSX.Element => {
  const avatarColor = useColorModeValue('apple.gray.900', 'apple.gray.50');

  /**
   * Returns the first character used for avatar initial
   *
   * Defaults to using the username unless profile name is present
   */
  const accountInitials = (): string => {
    if (account.profile && account.profile.name) {
      return account.profile.name.charAt(0);
    }

    return account.username.charAt(0);
  };

  return (
    <Square w={'100%'}>
      <Avatar size={'xl'} bg={avatarColor}>
        {accountInitials()}
      </Avatar>

      <Heading mt={2}>{account.username}</Heading>
    </Square>
  );
};

export default React.memo(AccountDrawerHeader);
