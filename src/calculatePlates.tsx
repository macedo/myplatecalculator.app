export const calculatePlates: Function = (
    weight: number,
    availablePlates: number[]
): number[][] | undefined => {
    const [plate, ...rest] = availablePlates;

    let n = Math.floor(weight / plate);
    if (n % 2 !== 0) n -= 1;

    if (rest.length === 0) {
        if (weight === 0) return [[plate, 0]];
        if ((weight % plate) > 0 ) return;

        return [[plate, n]];
    }

    for (let i = n; i >= 0; i-=2) {
        let result = calculatePlates(weight - i * plate, rest);
        if (result) {
            return [[plate, i], ...result];
        }
    }
};