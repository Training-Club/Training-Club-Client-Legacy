import {ITrainingSession} from '../../models/Training';

export type TrainingSessionQueryResponse = {
  result: ITrainingSession[];
};

export type TrainingSessionCreateResponse = {
  message: string;
}
