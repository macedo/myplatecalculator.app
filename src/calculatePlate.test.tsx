import calculatePlates from './calculatePlates';

describe('Calculate Plates', () => {
    test.each([
        [140, [[35, 10], [45, 0], [25, 10], [15, 10], [10, 10]], {35: 4, 25: 0, 15: 0, 10: 0}],
        [140, [[45, 10], [35, 0], [25, 10], [15, 10], [10, 10]], {45: 2, 35: 0, 25: 2, 15: 0, 10: 0}],
        [320, [[45, 10], [35, 10], [25, 10]], { 45: 6, 35: 0, 25: 2}],
    ])('calculatePlates(%s, %j)', (weight, availablePlates, expected) => {
            const result = calculatePlates(weight, availablePlates);
            expect(result).toMatchObject(expected);
        }
    );
});