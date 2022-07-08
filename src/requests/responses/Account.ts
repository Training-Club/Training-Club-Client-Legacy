import {IAccount} from '../../models/Account';

export type LoginResponse = {
  token: string;
  account: IAccount;
};
