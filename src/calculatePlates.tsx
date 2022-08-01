const calculatePlates: Function = (weight: number, availablePlates: number[][]) => {
    const [[plate, number], ...rest] = availablePlates;

    let n = Math.floor(weight / plate);
    if (n % 2 !== 0) n -= 1;

    if (rest.length === 0) {
        if (weight === 0) return { [plate]: 0 };
        if ((weight % plate) > 0 || (weight * number) < weight ) return;
        return { [plate]: weight / plate };
    }

    const count = Math.min(number, n);
    for (let i = count; i >= 0; i--) {
        let result = calculatePlates(weight - i * plate, rest);
        if (result) return { [plate]: i, ...result };
    }
};

export default calculatePlates;