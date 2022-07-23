import {getPlateCount} from '../src/utils/PlateCounter';

describe('Plate Counter ->', () => {
  it('should return the correct plate measurement (225) ->', () => {
    const output = getPlateCount(225);

    expect(output.fortyFivePlates).toBe(2);
    expect(output.twentyFivePlates).toBe(0);
    expect(output.tenPlates).toBe(0);
    expect(output.fivePlates).toBe(0);
    expect(output.twoPtFivePlates).toBe(0);
  });

  it('should return the correct plate measurement (220) ->', () => {
    const output = getPlateCount(220);

    expect(output.fortyFivePlates).toBe(1);
    expect(output.twentyFivePlates).toBe(1);
    expect(output.tenPlates).toBe(1);
    expect(output.fivePlates).toBe(1);
    expect(output.twoPtFivePlates).toBe(1);
  });
});
