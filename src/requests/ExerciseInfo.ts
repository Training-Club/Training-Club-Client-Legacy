import axios, {AxiosError} from 'axios';
import {ExerciseEquipment, ExerciseType, MuscleGroup} from '../models/Training';
import {getToken} from '../data/Account';

// TODO: Replace with api.trainingclubapp.com
// const url: string = 'http://144.126.218.29:8080/v1';
const url: string = 'http://localhost:8080/v1';

interface ICreateExerciseInfoProps {
  exerciseName: string;
  exerciseType: ExerciseType;
  exerciseMuscleGroups: MuscleGroup[];
  exerciseEquipment?: ExerciseEquipment;
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
}: ICreateExerciseInfoProps): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const token: string | null = await getToken();

    if (!token) {
      return reject('no token found on this device');
    }

    console.log(`using token: ${token}`);

    try {
      const result = await axios.post(
        `${url}/exercise-info/`,
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
      const axiosError = err as AxiosError;
      console.log(axiosError.response?.data);

      return reject(err);
    }
  });
}
