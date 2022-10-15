import {ExerciseInfo} from '../models/Training';
import {ExerciseInfoQueryResponse} from './responses/ExerciseInfo';
import axios, {AxiosError} from 'axios';

// TODO: Replace with api.trainingclubapp.com
const url: string = 'http://146.190.2.76:80/v1';

/**
 * Returns exercise data matching a similar name to the provided query string
 *
 * @param {string} query Name to perform similar lookup with
 */
export async function getExerciseSearchResults(
  query: string,
  token?: string,
): Promise<ExerciseInfo[]> {
  return new Promise<ExerciseInfo[]>(async (resolve, reject) => {
    if (!token) {
      return reject('no token on this device');
    }

    try {
      const result = await axios.get<ExerciseInfoQueryResponse>(
        `${url}/exercise-info/query${query}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      if (!result.data) {
        return reject(new AxiosError('No results found', '404'));
      }

      resolve(result.data.result);
    } catch (err) {
      reject(err);
    }
  });
}
