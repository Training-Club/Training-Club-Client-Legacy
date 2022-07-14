import {MeasurementSystem} from './Measurement';

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
  measurement?: MeasurementSystem;
}

export interface IExerciseValueTime extends IExerciseValue {
  timeRenderMillis?: boolean;
}

export interface ITrainable {
  exerciseName: string;
  addedAt: Date;
  values: ExerciseValue;
  performed: boolean;
}

export interface IExercise extends ITrainable {
  id: string;
  type: ExerciseType;
  additionalExercises?: AdditionalExercise[];
}

export interface AdditionalExercise extends ITrainable {
  type: AdditionalExerciseType;
}

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

export enum ExerciseType {
  WEIGHTED_REPS = 'weighted_reps',
  WEIGHTED_TIME = 'weighted_time',
  DISTANCE_TIME = 'distance_time',
  REPS = 'reps',
  TIME = 'time',
  DISTANCE = 'distance',
}

export enum AdditionalExerciseType {
  SUPERSET = 'superset',
  DROPSET = 'dropset',
}

export enum TrainingSessionStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum ExerciseEquipment {
  BARBELL = 'barbell',
  DUMBBELL = 'dumbbell',
  MACHINE = 'machine',
  KETTLEBELL = 'kettlebell',
}

export enum MuscleGroup {
  ABS = 'abs',
  BICEPS = 'biceps',
  CALVES = 'calves',
  CHEST = 'chest',
  GLUTES = 'glutes',
  HAMSTRING = 'hamstring',
  LOWER_BACK = 'lowerBack',
  QUADS = 'quads',
  TRAPS = 'traps',
  TRICEPS = 'triceps',
  UPPER_BACK = 'upperBack',
}
