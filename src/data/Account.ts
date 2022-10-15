import {deleteItem, readItem, writeItem} from '../utils/storage/StorageUtil';
import {IAccount} from '../models/Account';
import {attemptLoginWithToken} from '../requests/Account';

const TOKEN_COLLECTION_NAME = 'tokens';
const REFRESH_TOKEN_NAME = 'refreshToken';

/**
 * Reads the device for an auth token stored in memory
 *
 * If there is no token on the device this function will return null
 */
export async function getRefreshToken() {
  try {
    return await readItem(TOKEN_COLLECTION_NAME, REFRESH_TOKEN_NAME);
  } catch (err) {
    return null;
  }
}

/**
 * Writes the provided token to device memory under the 'refreshToken' path
 *
 * @param {string} token Token to store on the device
 */
export async function setRefreshToken(token: string) {
  return await writeItem(TOKEN_COLLECTION_NAME, REFRESH_TOKEN_NAME, token);
}

/**
 * Deletes any token stored in the device memory at the '@authToken' path
 */
export async function deleteRefreshToken() {
  return await deleteItem(TOKEN_COLLECTION_NAME, REFRESH_TOKEN_NAME);
}

/**
 * Reads the token stored locally on this device and processes the request
 * to the authentication services and if an account is authorized with the
 * provided token the promise will return an IAccount result.
 */
export async function handleAccountLoad(): Promise<IAccount> {
  return new Promise<IAccount>(async (resolve, reject) => {
    const token: string | null = await getRefreshToken();

    if (!token) {
      return reject(new Error('No token stored on this device'));
    }

    try {
      const account: IAccount = await attemptLoginWithToken(token);
      return resolve(account);
    } catch (err) {
      return reject(err);
    }
  });
}
