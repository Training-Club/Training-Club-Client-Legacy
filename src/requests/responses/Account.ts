import {IAccount, IProfile} from '../../models/Account';

type BasicAccount = {
  id: string;
  username: string;
  profile: IProfile;
};

export type GetAccountResponse = {
  id: string;
  username: string;
};

export type GetProfileResponse = {
  id: string;
  username: string;
  profile: IProfile;
};

export type GetSimilarAccountsByUsernameResponse = {
  result: BasicAccount[];
};

export type GetSimilarAccountsByProfileNameResponse = {
  result: BasicAccount[];
};

export type CreateStandardAccountResponse = {
  account: IAccount;
  token: string;
  refresh_token: string;
};

export type DeleteAccountResponse = {
  deletedId: string;
};
