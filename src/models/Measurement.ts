export enum MeasurementSystem {
  METRIC = 'metric',
  IMPERIAL = 'imperial',
}

export enum DistanceMeasurement {
  METER = 'm',
  MILE = 'mi',
  KILOMETER = 'km',
  FEET = 'ft',
}

/**
 * Parses the provided string param and returns a
 * DistanceMeasurement enum matching the provided name
 *
 * @param name String naming for Distance Measurement
 */
export function getDistanceMeasurement(
  name: string,
): DistanceMeasurement | undefined {
  switch (name) {
    case 'MILE':
    case 'mi':
      return DistanceMeasurement.MILE;
    case 'FEET':
    case 'ft':
      return DistanceMeasurement.FEET;
    case 'KILOMETER':
    case 'km':
      return DistanceMeasurement.KILOMETER;
    case 'METER':
    case 'm':
      return DistanceMeasurement.METER;
  }

  return undefined;
}
