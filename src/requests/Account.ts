import axios from 'axios';
import {API_URL} from '../Constants';
import {IAccount} from '../models/Account';

import {
  CreateStandardAccountResponse,
  GetProfileResponse,
} from './responses/Account';

import {
  AuthenticateStandardCredentialsResponse,
  RefreshTokenResponse,
} from './responses/Auth';

/**
 * Accepts an auth token as a param and attempts to obtain an account authorized
 * with provided token.
 *
 * If no account is found the promise will reject with 'account not found' error
 *
 * @param token Auth token stored locally on the current device
 */
export async function attemptLoginWithToken(token: string): Promise<IAccount> {
  return new Promise<IAccount>(async (resolve, reject) => {
    try {
      const result = await axios.get<IAccount>(`${API_URL}/auth/`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (result.status !== 200) {
        return reject(result.status);
      }

      return resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Accepts an email and password and attempts to authenticate an account
 * using the standard account creation recipe (email/username/password)
 *
 * If no account is found the promise will reject with 'account not found'
 * Additionally, this request can fail with 401 Unauthorized if the credentials do not match
 *
 * @param {string} email Email of the account
 * @param {string} password Password of the account
 */
export async function attemptStandardLogin(
  email: string,
  password: string,
): Promise<AuthenticateStandardCredentialsResponse> {
  return new Promise<AuthenticateStandardCredentialsResponse>(
    async (resolve, reject) => {
      try {
        const result =
          await axios.post<AuthenticateStandardCredentialsResponse>(
            `${API_URL}/auth/`,
            {
              email: email,
              password: password,
            },
          );

        resolve(result.data);
      } catch (err) {
        reject(err);
      }
    },
  );
}

/**
 * Accepts a username, email and password and attempts to build a
 * request to the services to create a new standard account
 *
 * @param {string} username Username
 * @param {string} email Email Address
 * @param {string} password Password
 */
export async function attemptStandardAccountCreate(
  username: string,
  email: string,
  password: string,
): Promise<CreateStandardAccountResponse> {
  return new Promise<CreateStandardAccountResponse>(async (resolve, reject) => {
    try {
      const result = await axios.post<CreateStandardAccountResponse>(
        `${API_URL}/account/recipe/standard`,
        {
          username: username,
          email: email,
          password: password,
        },
      );

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Performs an availability check query and returns a promise determining if the
 * provided key/value combo is already in use
 *
 * @param {string} key Database key values, for example 'username' or 'email'
 * @param {string} value Database value to match the provided key
 */
export async function checkAccountAvailability(
  key: string,
  value: string,
): Promise<boolean> {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const result = await axios.get(
        `${API_URL}/account/availability/${key}/${value}`,
      );

      if (result.status !== 200) {
        return resolve(false);
      }

      return resolve(true);
    } catch (err) {
      reject(new Error('Failed to check account availability: ' + err));
    }
  });
}

/**
 * Performs an access token refresh on the server
 */
export async function requestRefreshedToken(
  refreshToken: string,
): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const result = await axios.get<RefreshTokenResponse>(
        `${API_URL}/auth/refresh/${refreshToken}`,
      );

      resolve(result.data.access_token);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Queries profile data
 *
 * @param accountId Account ID to query
 * @param token Access Token JWT
 */
export async function getProfile(
  accountId: string,
  token?: string,
): Promise<GetProfileResponse> {
  return new Promise<GetProfileResponse>(async (resolve, reject) => {
    try {
      const result = await axios.get<GetProfileResponse>(
        `${API_URL}/account/profile/id/${accountId}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return resolve(result.data);
    } catch (err) {
      return reject(err);
    }
  });
}
