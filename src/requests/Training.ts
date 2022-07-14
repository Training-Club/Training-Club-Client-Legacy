import {ExerciseInfo} from '../models/Training';
import {getToken} from '../data/Account';
import axios from 'axios';

// TODO: Replace with api.trainingclubapp.com
const url: string = 'http://144.126.218.29:8080/v1';

/**
 * Returns exercise data matching a similar name to the provided query string
 *
 * @param {string} query Name to perform similar lookup with
 */
export async function getExerciseSearchResults(
  query: string,
): Promise<ExerciseInfo[]> {
  return new Promise<ExerciseInfo[]>(async (resolve, reject) => {
    const token: string | null = await getToken();

    if (!token) {
      return reject('no token on this device');
    }

    try {
      const result = await axios.get<ExerciseInfo[]>(
        `${url}/exerciseinfo/query/${query}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      if (!result.data) {
        return reject('no results found');
      }

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
}
