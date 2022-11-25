import axios, {AxiosError} from 'axios';
import {API_URL} from "../Constants";
import {ExerciseInfo, ITrainingSession} from '../models/Training';
import {ExerciseInfoQueryResponse} from './responses/ExerciseInfo';
import {TrainingSessionQueryResponse} from './responses/Training';

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
        `${API_URL}/exercise-info/query${query}`,
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

/**
 * Returns training session data matching the provided query string
 *
 * @param query Query string to perform lookup with
 * @param token Access token (JWT)
 */
export async function getTrainingSessions(
  query: string,
  token?: string,
): Promise<ITrainingSession[]> {
  return new Promise<ITrainingSession[]>(async (resolve, reject) => {
    if (!token) {
      return reject('no token on this device');
    }

    try {
      const result = await axios.get<TrainingSessionQueryResponse>(
        `${API_URL}/exercise-session/search${query}`,
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
