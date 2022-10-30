import {
  DistanceMeasurement,
  getConvertedDistance,
} from '../src/models/Measurement';

describe('Distance Conversion ->', () => {
  it('should convert kilometers to other forms', () => {
    const km = 1;
    const toFeet = getConvertedDistance(
      km,
      DistanceMeasurement.KILOMETER,
      DistanceMeasurement.FEET,
    );

    const toMile = getConvertedDistance(
      km,
      DistanceMeasurement.KILOMETER,
      DistanceMeasurement.MILE,
    );

    const toMeter = getConvertedDistance(
      km,
      DistanceMeasurement.KILOMETER,
      DistanceMeasurement.METER,
    );

    expect(toFeet).toEqual(3280.84);
    expect(toMile).toEqual(0.62);
    expect(toMeter).toEqual(1000);
  });

  it('should convert miles to other forms', () => {
    const mi = 1;
    const toFeet = getConvertedDistance(
      mi,
      DistanceMeasurement.MILE,
      DistanceMeasurement.FEET,
    );

    const toKilometer = getConvertedDistance(
      mi,
      DistanceMeasurement.MILE,
      DistanceMeasurement.KILOMETER,
    );

    const toMeter = getConvertedDistance(
      mi,
      DistanceMeasurement.MILE,
      DistanceMeasurement.METER,
    );

    expect(toKilometer).toEqual(1.61);
    expect(toFeet).toEqual(5280);
    expect(toMeter).toEqual(1609.34);
  });

  it('should convert feet to other forms', () => {
    const ft = 1000;
    const toMile = getConvertedDistance(
      ft,
      DistanceMeasurement.FEET,
      DistanceMeasurement.MILE,
    );

    const toKilometer = getConvertedDistance(
      ft,
      DistanceMeasurement.FEET,
      DistanceMeasurement.KILOMETER,
    );

    const toMeter = getConvertedDistance(
      ft,
      DistanceMeasurement.FEET,
      DistanceMeasurement.METER,
    );

    expect(toMile).toEqual(0.19);
    expect(toKilometer).toEqual(0.3);
    expect(toMeter).toEqual(304.8);
  });

  it('should convert meter to other forms', () => {
    const m = 1000;
    const toMile = getConvertedDistance(
      m,
      DistanceMeasurement.METER,
      DistanceMeasurement.MILE,
    );

    const toKilometer = getConvertedDistance(
      m,
      DistanceMeasurement.METER,
      DistanceMeasurement.KILOMETER,
    );

    const toFeet = getConvertedDistance(
      m,
      DistanceMeasurement.METER,
      DistanceMeasurement.FEET,
    );

    expect(toMile).toEqual(0.62);
    expect(toKilometer).toEqual(1);
    expect(toFeet).toEqual(3280.84);
  });
});
