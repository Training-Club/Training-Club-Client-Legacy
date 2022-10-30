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
  const nearestValue = inputMeasurement === MeasurementSystem.METRIC ? 2.5 : 5;
  const converted =
    inputMeasurement === MeasurementSystem.METRIC
      ? Math.round(inputValue / 2.2046)
      : Math.ceil(inputValue * 2.2046);

  if (converted % nearestValue === 0) {
    return converted;
  }

  return Math.round(converted / nearestValue) * nearestValue;
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
      return Number((inputValue * 5280).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.KILOMETER) {
      return Number((inputValue * 1.60934).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.METER) {
      return Number((inputValue * 1609.34).toFixed(2));
    }
  }

  if (inputMeasurement === DistanceMeasurement.FEET) {
    if (outputMeasurement === DistanceMeasurement.MILE) {
      return Number((inputValue * 0.00018934).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.KILOMETER) {
      return Number((inputValue * 0.0003048).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.METER) {
      return Number((inputValue * 0.3048).toFixed(2));
    }
  }

  if (inputMeasurement === DistanceMeasurement.KILOMETER) {
    if (outputMeasurement === DistanceMeasurement.MILE) {
      return Number((inputValue * 0.621371).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.FEET) {
      return Number((inputValue * 3280.84).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.METER) {
      return Number((inputValue * 1000.0).toFixed(2));
    }
  }

  if (inputMeasurement === DistanceMeasurement.METER) {
    if (outputMeasurement === DistanceMeasurement.MILE) {
      return Number((inputValue * 0.000621371).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.KILOMETER) {
      return Number((inputValue * 0.001).toFixed(2));
    }

    if (outputMeasurement === DistanceMeasurement.FEET) {
      return Number((inputValue * 3.28084).toFixed(2));
    }
  }

  return inputValue;
}
