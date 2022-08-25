const calculatePlates: Function = (
  weight: number,
  availablePlates: number[],
): number[][] | undefined => {
  const [plate, ...rest] = availablePlates;

  let n = Math.floor(weight / plate);
  if (n % 2 !== 0) n -= 1;

  if (rest.length === 0) {
    if (weight === 0) return [[plate, 0]];
    if ((weight % plate) > 0) return undefined;

    return [[plate, n]];
  }

  let i = 0;
  let result;

  for (i = n; i >= 0; i -= 2) {
    result = calculatePlates(weight - i * plate, rest);
    if (result) break;
  }

  if (result === undefined) return result;
  return [[plate, i], ...result];
};

export default calculatePlates;
