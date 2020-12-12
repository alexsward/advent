export function reducePairs<R, T>(elements: T[], reducer: (r: R, t1: T, t2: T) => R, start: R): R {
  for (let i: number = 0; i < elements.length - 1; i++) {
    for (let j: number = 0; j < elements.length - 2; j++) {
      start = reducer(start, elements[i], elements[j]);
    }
  }
  return start;
}
