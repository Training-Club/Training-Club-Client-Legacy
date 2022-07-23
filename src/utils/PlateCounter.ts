export interface IPlateCountResponse {
  fortyFivePlates?: number;
  twentyFivePlates?: number;
  tenPlates?: number;
  fivePlates?: number;
  twoPtFivePlates?: number;
}

/**
 * Returns a custom object calculating the plates needed
 * on a barbell to perform a specific exercise
 *
 * @param {number} inputValue Weight value
 */
export function getPlateCount(inputValue: number): IPlateCountResponse {
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
  };
}
