/* eslint-disable import/prefer-default-export */
export const roundUp: Function = (x: number, y: number): number => {
  if (x % y === 0) return x;
  if (y < 0) return 0;

  return Math.floor(x / y) * y + y;
};
