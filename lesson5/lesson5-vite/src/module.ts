export const sum = (a: number, b: number) => a + b;

export const map = <T, U>(arr: T[], f: (i: T) => U) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(f(arr[i]));
  }
  return res;
};
