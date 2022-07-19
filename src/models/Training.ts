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
  value?: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };

  timeRenderMillis?: boolean;
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

export type ExerciseInfo = {
  id: string;
  name: string;
  type: ExerciseType;
  verified?: boolean;
  muscleGroups?: MuscleGroup[];
  exerciseEquipment?: ExerciseEquipment;
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

export enum ExerciseType {
  WEIGHTED_REPS = 'WEIGHTED_REPS',
  WEIGHTED_TIME = 'WEIGHTED_TIME',
  DISTANCE_TIME = 'DISTANCE_TIME',
  REPS = 'REPS',
  TIME = 'TIME',
  DISTANCE = 'DISTANCE',
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
