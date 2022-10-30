import {getPlateCount} from '../src/utils/PlateCounter';
import {MeasurementSystem} from '../src/models/Measurement';

describe('Plate Counter ->', () => {
  describe('Imperial ->', () => {
    it('should return the correct plate measurement (225) ->', () => {
      const output = getPlateCount(225, MeasurementSystem.IMPERIAL);

      expect(output.fortyFivePlates).toEqual(2);
      expect(output.twentyFivePlates).toEqual(0);
      expect(output.tenPlates).toEqual(0);
      expect(output.fivePlates).toEqual(0);
      expect(output.twoPtFivePlates).toEqual(0);
    });

    it('should return the correct plate measurement (220) ->', () => {
      const output = getPlateCount(220, MeasurementSystem.IMPERIAL);

      expect(output.fortyFivePlates).toEqual(1);
      expect(output.twentyFivePlates).toEqual(1);
      expect(output.tenPlates).toEqual(1);
      expect(output.fivePlates).toEqual(1);
      expect(output.twoPtFivePlates).toEqual(1);
    });
  });

  describe('Metric ->', () => {
    it('should return the correct plate measurement (100) ->', () => {
      const output = getPlateCount(100, MeasurementSystem.METRIC);

      expect(output.twentyPlates).toEqual(2);
      expect(output.tenPlates).toEqual(0);
      expect(output.fivePlates).toEqual(0);
      expect(output.twoPtFivePlates).toEqual(0);
    });
  });

  it('should return the correct plate measurement (150) ->', () => {
    const output = getPlateCount(150, MeasurementSystem.METRIC);

    expect(output.twentyPlates).toEqual(3);
    expect(output.tenPlates).toEqual(0);
    expect(output.fivePlates).toEqual(1);
    expect(output.twoPtFivePlates).toEqual(0);
  });

  it('should return the correct plate measurement (65) ->', () => {
    const output = getPlateCount(65, MeasurementSystem.METRIC);

    expect(output.twentyPlates).toEqual(1);
    expect(output.tenPlates).toEqual(0);
    expect(output.fivePlates).toEqual(0);
    expect(output.twoPtFivePlates).toEqual(1);
  });
});
