import axios, {AxiosError} from 'axios';
import {IAccount} from '../models/Account';
import {LoginResponse} from './responses/Account';

// TODO: Replace with api.trainingclubapp.com
const url: string = 'http://144.126.218.29:8080/v1';

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
      const result = await axios.get<IAccount>(`${url}/auth/`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (result.status !== 200) {
        return reject(result.status);
      }

      return resolve(result.data);
    } catch (err) {
      reject(new Error('account not found'));
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
): Promise<LoginResponse> {
  return new Promise<LoginResponse>(async (resolve, reject) => {
    try {
      const result = await axios.post<LoginResponse>(`${url}/auth/`, {
        email: email,
        password: password,
      });

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
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
): Promise<LoginResponse> {
  return new Promise<LoginResponse>(async (resolve, reject) => {
    try {
      const result = await axios.post<LoginResponse>(
        `${url}/account/recipe/standard/`,
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
  interface IResponse {
    message: boolean;
  }

  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const result = await axios.get<IResponse>(
        `${url}/account/availability/${key}/${value}`,
      );

      if (result.status !== 200) {
        return reject(result.statusText);
      }

      return resolve(result.data.message);
    } catch (err) {
      const error = err as AxiosError;

      if (error.response!.status === 404) {
        return resolve(true);
      }

      reject(new Error('Failed to check account availability: ' + err));
    }
  });
}
