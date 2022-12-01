import axios, {AxiosError} from 'axios';
import {API_URL} from '../Constants';
import {compressExercises} from '../data/Training';
import {ExerciseInfoQueryResponse} from './responses/ExerciseInfo';

import {
  ExerciseInfo,
  IExercise,
  ITrainingSession,
  TrainingSessionStatus,
} from '../models/Training';

import {
  TrainingSessionCreateResponse,
  TrainingSessionQueryResponse,
} from './responses/Training';

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

/**
 * Creates a new completed training session
 *
 * @param sessionName Training Session Name
 * @param authorId Author ID
 * @param exercises Exercises Array
 * @param token Json Web Token
 */
export async function createTrainingSession(
  sessionName: string,
  authorId: string,
  exercises: IExercise[],
  token?: string,
): Promise<TrainingSessionCreateResponse> {
  return new Promise<TrainingSessionCreateResponse>(async (resolve, reject) => {
    if (!token) {
      return reject('no token on this device');
    }

    const compressedExercises = compressExercises(exercises);

    try {
      const trainingSession = await axios.post<TrainingSessionCreateResponse>(
        `${API_URL}/exercise-session/`,
        {
          sessionName: sessionName,
          author: authorId,
          status: TrainingSessionStatus.COMPLETED,
          timestamp: new Date(),
          exercises: compressedExercises,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return resolve(trainingSession.data);
    } catch (err) {
      return reject(err);
    }
  });
}
