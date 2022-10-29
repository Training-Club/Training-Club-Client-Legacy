export interface ILocation {
  id: string;
  author: string;
  name: string;
  description: string;
  type?: LocationType;
  coordinates?: Coordinate;
}

export enum LocationType {
  GYM = 'GYM',
  CITY = 'CITY',
  PLACE = 'PLACE',
}

export type Coordinate = {
  type: string;
  coordinates: number[];
};
