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
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
};
