import calculatePlates from './calculatePlates';

describe('Calculate Plates', () => {
    test.each([
        {weight: 140, availablePlates: [[35, 10], [45, 0], [25, 10], [15, 10], [10, 10]], expected: {35: 4, 25: 0, 15: 0, 10: 0}},
        {weight: 140, availablePlates: [[45, 10], [35, 0], [25, 10], [15, 10], [10, 10]], expected: {45: 2, 35: 0, 25: 2, 15: 0, 10: 0}},
        {weight: 320, availablePlates: [[45, 10], [35, 10], [25, 10]], expected: { 45: 6, 35: 0, 25: 2}},
    ])('calculatePlates($weight, $availablePlates)', ({weight, availablePlates, expected}) => {
            const result = calculatePlates(weight, availablePlates);
            expect(result).toMatchObject(expected);
        }
    );
});