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
 * Accepts a distance measurement enum and returns the string suffix attached to it
 *
 * @param {DistanceMeasurement} measurement Measurement to pull suffix from
 */
export const getDistanceMeasurementSuffix = (
  measurement: DistanceMeasurement,
): string => {
  switch (measurement) {
    case DistanceMeasurement.MILE:
      return 'mi';
    case DistanceMeasurement.FEET:
      return 'ft';
    case DistanceMeasurement.KILOMETER:
      return 'km';
    case DistanceMeasurement.METER:
      return 'm';
  }
};

/**
 * Parses the provided string param and returns a
 * MeasurementSystem enum matching the provided name
 *
 * @param {string} name Name of the measurement system
 */
export function getMeasurement(name: string): MeasurementSystem | undefined {
  if (name === 'imperial') {
    return MeasurementSystem.IMPERIAL;
  } else if (name === 'metric') {
    return MeasurementSystem.METRIC;
  }

  return undefined;
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

/**
 * Takes an input weight, input measurement
 * and converts it to the opposite measurement system
 *
 * @param inputValue Weight to convert
 * @param inputMeasurement Input Measurement System
 */
export function getConvertedWeight(
  inputValue: number,
  inputMeasurement: MeasurementSystem,
): number {
  if (inputMeasurement === MeasurementSystem.METRIC) {
    return Math.round(inputValue * 2.20462);
  }

  return Math.round(inputValue * 0.453592);
}

/**
 * Takes an input number, input measurement, and a desired output measurement
 * then returns the conversion between measurements
 *
 * @param {number} inputValue Value to convert
 * @param {DistanceMeasurement} inputMeasurement Input Measurement
 * @param {DistanceMeasurement} outputMeasurement Desired output measurement
 */
export function getConvertedDistance(
  inputValue: number,
  inputMeasurement: DistanceMeasurement,
  outputMeasurement: DistanceMeasurement,
): number {
  if (inputMeasurement === DistanceMeasurement.MILE) {
    if (outputMeasurement === DistanceMeasurement.FEET) {
      return Math.round(inputValue * 5280);
    }

    if (outputMeasurement === DistanceMeasurement.KILOMETER) {
      return Math.round(inputValue * 1.60934);
    }

    if (outputMeasurement === DistanceMeasurement.METER) {
      return Math.round(inputValue * 1609.34);
    }
  }

  if (inputMeasurement === DistanceMeasurement.FEET) {
    if (outputMeasurement === DistanceMeasurement.MILE) {
      return Math.round(inputValue * 0.00018934);
    }

    if (outputMeasurement === DistanceMeasurement.KILOMETER) {
      return Math.round(inputValue * 0.0003048);
    }

    if (outputMeasurement === DistanceMeasurement.METER) {
      return Math.round(inputValue * 0.3048);
    }
  }

  if (inputMeasurement === DistanceMeasurement.KILOMETER) {
    if (outputMeasurement === DistanceMeasurement.MILE) {
      return Math.round(inputValue * 0.621371);
    }

    if (outputMeasurement === DistanceMeasurement.FEET) {
      return Math.round(inputValue * 3280.84);
    }

    if (outputMeasurement === DistanceMeasurement.METER) {
      return Math.round(inputValue * 3280.84);
    }
  }

  if (inputMeasurement === DistanceMeasurement.METER) {
    if (outputMeasurement === DistanceMeasurement.MILE) {
      return Math.round(inputValue * 0.000621371);
    }

    if (outputMeasurement === DistanceMeasurement.KILOMETER) {
      return Math.round(inputValue * 0.000621371);
    }

    if (outputMeasurement === DistanceMeasurement.FEET) {
      return Math.round(inputValue * 3.28084);
    }
  }

  return inputValue;
}
