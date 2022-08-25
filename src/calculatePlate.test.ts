/* eslint-disable max-len */
import calculatePlates from './calculatePlates';

describe('Calculate Plates', () => {
  test.each([
    [140, [35, 45, 25, 15, 10], [[35, 4], [45, 0], [25, 0], [15, 0], [10, 0]]],
    [140, [45, 35, 25, 15, 10], [[45, 2], [35, 0], [25, 2], [15, 0], [10, 0]]],
    [135, [45, 35, 10, 25, 10], undefined],
    [320, [45, 35, 25], [[45, 6], [35, 0], [25, 2]]],
  ])('calculatePlates(%s, %j)', (weight, availablePlates, expected) => {
    const result = calculatePlates(weight, availablePlates);
    expect(result).toEqual(expected);
  });
});
