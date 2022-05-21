import {PrivacyLevel} from './Privacy';
import {MeasurementSystem} from './Measurement';

export interface IAccount {
  id: string;
  username: string;
  email: string;
  profile?: IProfile;
  preferences?: IPreferences;
  personal?: IPersonalData;
}

export interface IProfile {
  name?: string;
  location?: string;
}

export interface IPreferences {
  notifyNewFollower?: boolean;
  notifyNewLike?: boolean;
  notifyNewMessage?: boolean;
  notifyNewAssignedSession?: boolean;
  notifyNewAssignedMeal?: boolean;
  profilePrivacy?: PrivacyLevel;
  messagePrivacy?: PrivacyLevel;
  commentPrivacy?: PrivacyLevel;
  measurementSystem?: MeasurementSystem;
}

export interface IPersonalData {
  birthday?: Date;
  Sex?: 'm' | 'f';
  Weight?: number;
  Height?: number;
}
