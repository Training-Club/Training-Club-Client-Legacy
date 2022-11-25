import axios, {AxiosError} from 'axios';
import {API_URL} from '../Constants';
import {ExerciseEquipment, ExerciseType, MuscleGroup} from '../models/Training';

interface ICreateExerciseInfoProps {
  exerciseName: string;
  exerciseType: ExerciseType;
  exerciseMuscleGroups: MuscleGroup[];
  exerciseEquipment?: ExerciseEquipment;
  token?: string;
}

/**
 * Sends a request to create new exercise info with the provided parameters
 *
 * @param {string} exerciseName Name of the exercise
 * @param {ExerciseType} exerciseType Type of the exercise
 * @param {MuscleGroup[]} exerciseMuscleGroups Array of muscle groups
 * @param {ExerciseEquipment} exerciseEquipment Optional equipment
 */
export async function createExerciseInfo({
  exerciseName,
  exerciseType,
  exerciseMuscleGroups,
  exerciseEquipment,
  token,
}: ICreateExerciseInfoProps): Promise<any> {
  return new Promise(async (resolve, reject) => {
    if (!token) {
      return reject('no token found on this device');
    }

    try {
      const result = await axios.post(
        `${API_URL}/exercise-info/`,
        {
          name: exerciseName,
          type: exerciseType,
          muscleGroups: exerciseMuscleGroups,
          exerciseEquipment: exerciseEquipment,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );

      return resolve(result.data);
    } catch (err) {
      return reject(err as AxiosError);
    }
  });
}
