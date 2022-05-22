import axios, {AxiosError} from 'axios';

// TODO: Replace with api.trainingclubapp.com
const url: string = 'http://144.126.218.29:8080/v1';

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
