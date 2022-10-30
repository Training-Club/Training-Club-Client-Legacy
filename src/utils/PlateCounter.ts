import {MeasurementSystem} from '../models/Measurement';

export interface IPlateCountResponse {
  fortyFivePlates?: number; // imperial 45lb
  twentyFivePlates?: number; // imperial 25lb
  twentyPlates?: number; // metric 45lb, 20kg
  tenPlates?: number; // imperial & metric
  fivePlates?: number; // imperial & metric 5lb, 10kg
  twoPtFivePlates?: number; // imperial & metric 2.5lb, 5kg
  measurement: MeasurementSystem;
}

export function getPlateCount(
  inputValue: number,
  inputMeasurement: MeasurementSystem,
): IPlateCountResponse {
  return inputMeasurement === MeasurementSystem.METRIC
    ? getMetricPlateCount(inputValue)
    : getImperialPlateCount(inputValue);
}

export function getMetricPlateCount(inputValue: number): IPlateCountResponse {
  const withoutBarbell = inputValue - 20.0;

  let remainder = withoutBarbell / 2.0;
  let twentyPlates = 0;
  let tenPlates = 0;
  let fivePlates = 0;
  let twoPtFivePlates = 0;

  if (remainder >= 20) {
    twentyPlates = Math.floor(remainder / 20.0);
    remainder -= 20 * twentyPlates;
  }

  if (remainder >= 10) {
    tenPlates = Math.floor(remainder / 10.0);
    remainder -= 10 * tenPlates;
  }

  if (remainder >= 5) {
    fivePlates = Math.floor(remainder / 5.0);
    remainder -= 5 * fivePlates;
  }

  if (remainder >= twoPtFivePlates) {
    twoPtFivePlates = Math.floor(remainder / 2.5);
  }

  return {
    twentyPlates: twentyPlates,
    tenPlates: tenPlates,
    fivePlates: fivePlates,
    twoPtFivePlates: twoPtFivePlates,
    measurement: MeasurementSystem.METRIC,
  };
}

/**
 * Returns a custom object calculating the plates needed
 * on a barbell to perform a specific exercise
 *
 * @param {number} inputValue Weight value
 */
export function getImperialPlateCount(inputValue: number): IPlateCountResponse {
  const withoutBarbell: number = inputValue - 45.0;

  let remainder = withoutBarbell / 2.0;
  let fortyFives = 0;
  let twentyFives = 0;
  let tens = 0;
  let fives = 0;
  let twoPtFives = 0;

  if (remainder >= 45) {
    fortyFives = Math.floor(remainder / 45.0);
    remainder -= 45 * fortyFives;
  }

  if (remainder >= 25) {
    twentyFives = Math.floor(remainder / 25.0);
    remainder -= 25 * twentyFives;
  }

  if (remainder >= 10) {
    tens = Math.floor(remainder / 10.0);
    remainder -= 10 * tens;
  }

  if (remainder >= 5) {
    fives = Math.floor(remainder / 5.0);
    remainder -= 5 * fives;
  }

  if (remainder >= 2.5) {
    twoPtFives = Math.floor(remainder / 2.5);
  }

  return {
    fortyFivePlates: fortyFives,
    twentyFivePlates: twentyFives,
    tenPlates: tens,
    fivePlates: fives,
    twoPtFivePlates: twoPtFives,
    measurement: MeasurementSystem.IMPERIAL,
  };
}
