import {DistanceMeasurement, MeasurementSystem} from './Measurement';

export interface ISession {
  sessionName?: string;
  timestamp?: Date;
}

export interface ITrainingSessionDraft extends ISession {}

export interface ITrainingSession extends ISession {
  id: string;
  author: string;
  status: TrainingSessionStatus;
  exercises: IExercise[];
}

export interface IExerciseValue {
  value: number;
}

export interface IExerciseValueWeight extends IExerciseValue {
  measurement?: MeasurementSystem;
  plateCounterEnabled?: boolean;
}

export interface IExerciseValueDistance extends IExerciseValue {
  measurement?: DistanceMeasurement;
}

export interface IExerciseValueTime extends Omit<IExerciseValue, 'value'> {
  value: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };

  timeRenderMillis: boolean;
}

export interface ITrainable {
  exerciseName: string;
  addedAt: Date;
  values: ExerciseValue;
  performed: boolean;
  type: ExerciseType;
}

export interface IExercise extends ITrainable {
  id: string;
  additionalExercises?: IAdditionalExercise[];
}

export interface IAdditionalExercise extends ITrainable {
  variant: AdditionalExerciseType;
}

export interface ICompressedSession {
  id: string;
  sessionName: string;
  author: string;
  status: TrainingSessionStatus;
  timestamp: Date;
  exercises: ICompressedExercise[];
}

export interface ICompressedExercise {
  id: string;
  exerciseName: string;
  addedAt: Date;
  type: ExerciseType;
  values: ICompressedExerciseValues;
  performed: boolean;
  additionalExercises?: ICompressedAdditionalExercise[];
}

export interface ICompressedAdditionalExercise
  extends Omit<ICompressedExercise, 'additionalExercises' | 'id'> {
  variant: AdditionalExerciseType;
}

export interface ICompressedExerciseValueWeight {
  weightValue: number;
  weightMeasurementSystem: MeasurementSystem;
  plateCounterEnabled: boolean;
}

export interface ICompressedExerciseValueDistance {
  distanceValue: number;
  distanceMeasurementSystem: DistanceMeasurement;
}

export interface ICompressedExerciseValueTime {
  timeValue: number;
  timeRenderMillis: boolean;
}

export interface ICompressedExerciseValues {
  reps?: number;
  weight?: ICompressedExerciseValueWeight;
  distance?: ICompressedExerciseValueDistance;
  time?: ICompressedExerciseValueTime;
}

/**
 * Returns true if the provided trainable is an additional exercise
 *
 * @param {any} obj to check against
 */
export function isAdditionalExercise(obj: any): obj is IAdditionalExercise {
  return 'variant' in obj;
}

export type ExerciseInfo = {
  id: string;
  name: string;
  type: ExerciseType;
  verified?: boolean;
  muscleGroups?: MuscleGroup[];
  equipment?: ExerciseEquipment;
};

export type GroupedExercise = {
  name: string;
  timestamp: Date;
  exercises: IExercise[];
};

export type ExerciseValue = {
  reps?: number;
  weight?: IExerciseValueWeight;
  time?: IExerciseValueTime;
  distance?: IExerciseValueDistance;
};

export type PrettyTimeValue = {
  hours?: string;
  minutes: string;
  seconds: string;
  milliseconds?: string;
};

export enum ExerciseType {
  WEIGHTED_REPS = 'WEIGHTED_REPS',
  WEIGHTED_TIME = 'WEIGHTED_TIME',
  DISTANCE_TIME = 'DISTANCE_TIME',
  REPS = 'REPS',
  TIME = 'TIME',
  DISTANCE = 'DISTANCE',
}

export enum AdditionalExerciseType {
  SUPERSET = 'SUPERSET',
  DROPSET = 'DROPSET',
}

export enum TrainingSessionStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  ASSIGNED = 'ASSIGNED',
  COMPLETED = 'COMPLETED',
}

export enum ExerciseEquipment {
  BARBELL = 'BARBELL',
  DUMBBELL = 'DUMBBELL',
  MACHINE = 'MACHINE',
  KETTLEBELL = 'KETTLEBELL',
}

export enum MuscleGroup {
  BACK = 'BACK',
  CALVES = 'CALVES',
  CHEST = 'CHEST',
  FOREARMS = 'FOREARMS',
  GLUTES = 'GLUTES',
  NECK = 'NECK',
  SHOULDERS = 'SHOULDERS',
  THIGHS = 'THIGHS',
  UPPER_ARMS = 'UPPER_ARMS',
}
