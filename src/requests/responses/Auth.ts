import {IAccount} from '../../models/Account';

export type AuthenticateWithTokenResponse = {
  id: string;
  username: string;
  email: string;
  type: string;
};

export type AuthenticateStandardCredentialsResponse = {
  account: IAccount;
  token: string;
};
